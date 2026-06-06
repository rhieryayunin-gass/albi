import { Module }
from "@nestjs/common";

import { RiskEngineController }
from "./risk-engine.controller";

import { RiskEngineService }
from "./risk-engine.service";

import { RiskGateway }
from "./websocket/risk.gateway";

@Module({
  controllers: [
    RiskEngineController
  ],

  providers: [
    RiskEngineService,
    RiskGateway
  ]
})

export class AppModule {}