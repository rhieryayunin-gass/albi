import {
  Body,
  Controller,
  Get,
  Post
}
from "@nestjs/common";

import { RiskEngineService }
from "./risk-engine.service";

import { RiskDto }
from "./dto/risk.dto";

import { RiskGateway }
from "./websocket/risk.gateway";

@Controller()

export class RiskEngineController {

  constructor(
    private readonly riskService:
    RiskEngineService,

    private readonly gateway:
    RiskGateway
  ) {}

  @Get()

  health() {

    return {
      status:
      "RISK ENGINE ONLINE"
    };
  }

  @Post("/analyze")

  analyze(
    @Body()
    data: RiskDto
  ) {

    const result =
    this.riskService.analyze(
      data
    );

    this.gateway.broadcastRisk(
      result
    );

    return result;
  }
}