import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Mt5Service }
from './mt5.service';

import { Mt5Guard }
from './mt5.guard';

import { AnalyzeDto }
from '../ai-engine/dto/analyze.dto';


@Controller('mt5')
export class Mt5Controller {

  constructor(
    private readonly mt5Service:
    Mt5Service,
  ) {}


  @Get('heartbeat')
  heartbeat() {

    return {
      success: true,

      service:
      'ALBI MT5 BRIDGE',

      status: 'LIVE',

      timestamp:
      new Date(),
    };
  }


  @UseGuards(Mt5Guard)
  @Post('market-data')
  async marketData(
    @Body()
    body: AnalyzeDto,
  ) {

    await this.mt5Service
      .processMarketData(
        body,
      );

    return {
      success: true,

      message:
      'MARKET DATA RECEIVED',
    };
  }


  @UseGuards(Mt5Guard)
  @Post('executed-trade')
  async executedTrade(
    @Body()
    body: any,
  ) {

    await this.mt5Service
      .saveExecutedTrade(
        body,
      );

    return {
      success: true,

      message:
      'TRADE SAVED',
    };
  }
}