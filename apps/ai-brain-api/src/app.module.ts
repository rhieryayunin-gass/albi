import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from './modules/health/health.module';

import { WebsocketModule } from './modules/websocket/websocket.module';

import { AuthModule } from './modules/auth/auth.module';

import { AiEngineModule } from './modules/ai-engine/ai-engine.module';

import { RiskEngineModule } from './modules/risk-engine/risk-engine.module';

import { Mt5Module } from './modules/mt5/mt5.module';

import { EmergencyModule } from './modules/emergency/emergency.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    HealthModule,
    WebsocketModule,
    AuthModule,
    AiEngineModule,
    RiskEngineModule,
    Mt5Module,
    EmergencyModule,
  ],
})
export class AppModule {}