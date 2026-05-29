import { Module } from '@nestjs/common';

import { HttpModule }
from '@nestjs/axios';

import { AiEngineController }
from './ai-engine.controller';

import { AiEngineService }
from './ai-engine.service';

import { RiskEngineModule }
from '../risk-engine/risk-engine.module';

import { EmergencyModule }
from '../emergency/emergency.module';

import { AiMemoryModule }
from '../ai-memory/ai-memory.module';

@Module({
  imports: [
    HttpModule,

    RiskEngineModule,

    EmergencyModule,

    AiMemoryModule,
  ],

  controllers: [
    AiEngineController,
  ],

  providers: [AiEngineService],

  exports: [AiEngineService],
})
export class AiEngineModule {}