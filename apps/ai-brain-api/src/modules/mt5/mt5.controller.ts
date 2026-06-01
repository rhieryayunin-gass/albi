import {
  Injectable,
} from '@nestjs/common';

import { WebsocketGateway }
from '../websocket/websocket.gateway';

import { TradesRepository }
from '../trades/trades.repository';

import { AnalyzeDto }
from '../ai-engine/dto/analyze.dto';


@Injectable()
export class Mt5Service {

  constructor(
    private readonly websocket:
    WebsocketGateway,

    private readonly tradesRepository:
    TradesRepository,
  ) {}


  // ======================================
  // MARKET DATA
  // ======================================

  async processMarketData(
    data: AnalyzeDto,
  ) {

    // EMIT REALTIME MARKET
    this.websocket
      .emitMarketData(
        data,
      );

    return {
      success: true,
    };
  }


  // ======================================
  // SAVE EXECUTED TRADE
  // ======================================

  async saveExecutedTrade(
    data: any,
  ) {

    try {

      await this.tradesRepository
        .createTrade({
          symbol:
          data.symbol,

          type:
          data.type,

          lot:
          data.lot,

          entry_price:
          data.entryPrice,

          stop_loss:
          data.stopLoss,

          take_profit:
          data.takeProfit,

          ticket:
          data.ticket,

          status:
          'OPEN',

          opened_at:
          new Date(),
        });

    } catch (err) {

      console.log(
        'SAVE TRADE ERROR',
        err,
      );
    }

    // EMIT REALTIME
    this.websocket
      .emitTradeExecution(
        data,
      );

    return {
      success: true,
    };
  }
}