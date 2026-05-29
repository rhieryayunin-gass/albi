import { Module } from '@nestjs/common';

import { RiskEngineService } from './risk-engine.service';

import { RiskEngineController }
from './risk-engine.controller';

import { ExposureService }
from './exposure.service';

@Module({
  controllers: [RiskEngineController],
  providers: [RiskEngineService, ExposureService],
  exports: [RiskEngineService, ExposureService],
})
export class RiskEngineModule {}