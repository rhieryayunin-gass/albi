import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { MarketDataDto } from './dto/market-data.dto';

import { Mt5Service } from './mt5.service';

import { WebsocketGateway } from '../websocket/websocket.gateway';

@Controller('mt5')
export class Mt5Controller {
  constructor(
    private readonly mt5Service: Mt5Service,

    private readonly websocketGateway: WebsocketGateway,
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
}