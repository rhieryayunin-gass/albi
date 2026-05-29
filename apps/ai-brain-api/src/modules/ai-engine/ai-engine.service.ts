import { Injectable } from '@nestjs/common';

import { HttpService }
from '@nestjs/axios';

import { firstValueFrom }
from 'rxjs';

import { RiskEngineService }
from '../risk-engine/risk-engine.service';

import { ExposureService }
from '../risk-engine/exposure.service';

import { EmergencyService }
from '../emergency/emergency.service';

import { AiMemoryService }
from '../ai-memory/ai-memory.service';

@Injectable()
export class AiEngineService {
  constructor(
    private readonly httpService: HttpService,

    private readonly riskEngineService: RiskEngineService,

    private readonly exposureService: ExposureService,

    private readonly emergencyService: EmergencyService,

    private readonly aiMemoryService: AiMemoryService,
  ) {}

  async analyzeMarket(data: any) {
    // EMERGENCY CHECK

    if (
      this.emergencyService
        .getState()
        .frozen
    ) {
      return {
        signal: 'NO TRADE',

        emergency: true,

        reason:
          this.emergencyService
            .getState()
            .reason,
      };
    }

    // FLOATING DD CHECK

    const floatingPnl =
      this.exposureService
        .getState()
        .floatingPnl;

    if (floatingPnl <= -100) {
      this.emergencyService.freeze(
        'MAX_FLOATING_DD',
      );

      return {
        signal: 'NO TRADE',

        emergency: true,

        reason:
          'MAX_FLOATING_DD',
      };
    }

    // PYTHON AI REQUEST

    const response =
      await firstValueFrom(
        this.httpService.post(
          `${process.env.PYTHON_AI_ENGINE_URL}/analyze`,
          data,
        ),
      );

    const ai =
      response.data;

    // RISK VALIDATION

    const riskResult =
      this.riskEngineService.validateTrade(
        {
          symbol: data.symbol,

          type: ai.signal,

          lot: 0.01,

          confidence:
            ai.confidence,

          openPositions:
            this.exposureService
              .getState()
              .openPositions,

          totalExposure:
            this.exposureService
              .getState()
              .totalExposure,
        },
      );

    if (!riskResult.approved) {
      await this.aiMemoryService.saveMemory(
        {
          symbol: data.symbol,

          signal: 'NO TRADE',

          strategy:
            ai.strategy,

          regime:
            ai.regime,

          confidence:
            ai.confidence,

          approved: false,

          result:
            riskResult.reason,

          profit: 0,
        },
      );

      return {
        signal: 'NO TRADE',

        confidence:
          ai.confidence,

        regime:
          ai.regime,

        strategy:
          ai.strategy,

        approved: false,

        reason:
          riskResult.reason,
      };
    }

    // SAVE MEMORY

    await this.aiMemoryService.saveMemory(
      {
        symbol: data.symbol,

        signal: ai.signal,

        strategy:
          ai.strategy,

        regime:
          ai.regime,

        confidence:
          ai.confidence,

        approved: true,

        result: 'PENDING',

        profit: 0,
      },
    );

    return {
      signal: ai.signal,

      confidence:
        ai.confidence,

      regime:
        ai.regime,

      strategy:
        ai.strategy,

      approved: true,

      ai_engine:
        ai.ai_engine,
    };
  }
}