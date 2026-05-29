import { Injectable } from '@nestjs/common';

import { RiskEngineService }
from '../risk-engine/risk-engine.service';

@Injectable()
export class AiEngineService {
  constructor(
    private readonly riskEngineService: RiskEngineService,
  ) {}

  analyzeMarket(data: any) {
    const signal =
      Math.random() > 0.5
        ? 'BUY'
        : 'SELL';

    const confidence =
      Math.floor(
        80 + Math.random() * 20,
      );

    const riskResult =
      this.riskEngineService.validateTrade(
        {
          symbol: data.symbol,

          type: signal,

          lot: 0.01,

          confidence,

          openPositions: 0,

          totalExposure: 0,
        },
      );

    if (!riskResult.approved) {
      return {
        signal: 'NO TRADE',

        reason:
          riskResult.reason,

        confidence,
      };
    }

    return {
      signal,

      confidence,

      approved: true,
    };
  }
}