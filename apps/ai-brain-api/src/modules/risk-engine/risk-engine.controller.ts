import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { RiskEngineService }
from './risk-engine.service';

import { RiskCheckDto }
from './dto/risk-check.dto';

@Controller('risk-engine')
export class RiskEngineController {
  constructor(
    private readonly riskEngineService: RiskEngineService,
  ) {}

  @Post('validate')
  validate(
    @Body() dto: RiskCheckDto,
  ) {
    return this.riskEngineService.validateTrade(
      dto,
    );
  }
}