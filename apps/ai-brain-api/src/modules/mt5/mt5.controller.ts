import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { MarketDataDto } from './dto/market-data.dto';

import { Mt5Service } from './mt5.service';

import { WebsocketGateway } from '../websocket/websocket.gateway';

import { ExecutedTradeDto }
from './dto/executed-trade.dto';

import { TradesRepository }
from '../trades/trades.repository';

@Controller('mt5')
export class Mt5Controller {
  constructor(
  private readonly mt5Service: Mt5Service,

  private readonly websocketGateway: WebsocketGateway,

  private readonly tradesRepository: TradesRepository,
) {}

  @Get('heartbeat')
  heartbeat() {
    return this.mt5Service.heartbeat();
  }

  @Post('market-data')
  receiveMarketData(
    @Body() dto: MarketDataDto,
  ) {
    console.log(dto);

    this.websocketGateway.emit(
      'market-data',
      dto,
    );

    return {
      success: true,
    };
  }

  @Post('executed-trade')
async executedTrade(
  @Body() dto: ExecutedTradeDto,
) {
  await this.tradesRepository.createTrade({
    symbol: dto.symbol,

    type: dto.type,

    lot: dto.lot,

    entry_price: dto.entryPrice,

    stop_loss: dto.stopLoss,

    take_profit: dto.takeProfit,

    ticket: dto.ticket,

    status: 'OPEN',

    opened_at: new Date(),
  });

  this.websocketGateway.emit(
    'new-trade',
    dto,
  );

  return {
    success: true,
  };
}
}