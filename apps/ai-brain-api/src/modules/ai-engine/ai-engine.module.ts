import { Module } from '@nestjs/common';

import { AiEngineService } from './ai-engine.service';

import { AiEngineController } from './ai-engine.controller';

import { RiskEngineModule }
from '../risk-engine/risk-engine.module';

@Module({
  imports: [RiskEngineModule],
  
  controllers: [AiEngineController],

  providers: [AiEngineService],

  exports: [AiEngineService],
})
export class AiEngineModule {}