import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import axios from 'axios';

import { RiskEngineService }
from '../risk-engine/risk-engine.service';

import { AiMemoryService }
from '../ai-memory/ai-memory.service';

import { AnalyzeDto }
from './dto/analyze.dto';


@Injectable()
export class AiEngineService {

  constructor(
    private readonly riskEngine:
    RiskEngineService,

    private readonly aiMemory:
    AiMemoryService,
  ) {}


  // ======================================
  // MAIN AI ANALYSIS
  // ======================================

  async analyzeMarket(
    data: AnalyzeDto,
  ) {

    try {

      // ==================================
      // CALL PYTHON AI ENGINE
      // ==================================

      const response =
        await axios.post(
          process.env
            .PYTHON_AI_ENGINE_URL!,
          data,
        );

      const ai =
        response.data;


      // ==================================
      // RISK VALIDATION
      // ==================================

      const risk =
        this.riskEngine
          .validateTrade({
            confidence:
            ai.confidence,

            exposure:
            this.calculateExposure(
              data.positions,
            ),

            openPositions:
            data.positions
              .length,

            spread:
            data.spread,

            atr:
            data.atr,

            session:
            data.session,

            expectedPnl:
            ai.expected_pnl,

            expectedWinrate:
            ai.expected_winrate,

            expectedDrawdown:
            ai.expected_drawdown,
          });


      // ==================================
      // FINAL RESULT
      // ==================================

      const result = {

        signal:
        ai.signal,

        confidence:
        ai.confidence,

        regime:
        ai.regime,

        strategy:
        ai.strategy,

        approved:
        risk.approved,

        reason:
        risk.reason,

        score:
        risk.score,

        warnings:
        risk.warnings,

        riskLevel:
        risk.riskLevel,

        analysis:
        ai.analysis,

        macro_bias:
        ai.macro_bias,

        expected_pnl:
        ai.expected_pnl,

        expected_winrate:
        ai.expected_winrate,

        expected_drawdown:
        ai.expected_drawdown,

        best_strategy:
        ai.best_strategy,

        ai_engine:
        ai.ai_engine,

        session:
        data.session,

        trend:
        data.trend,

        spread:
        data.spread,

        atr:
        data.atr,

        rsi:
        data.rsi,
      };


      // ==================================
      // SAVE AI MEMORY
      // ==================================

      await this.aiMemory
        .saveMemory({
          symbol:
          data.symbol,

          signal:
          result.signal,

          confidence:
          result.confidence,

          regime:
          result.regime,

          strategy:
          result.strategy,

          approved:
          result.approved,

          macroBias:
          result.macro_bias,

          expectedPnl:
          result.expected_pnl,

          expectedWinrate:
          result.expected_winrate,

          expectedDrawdown:
          result.expected_drawdown,

          bestStrategy:
          result.best_strategy,

          analysis:
          result.analysis,

          riskScore:
          result.score,

          riskLevel:
          result.riskLevel,

          spread:
          result.spread,

          atr:
          result.atr,

          rsi:
          result.rsi,

          trend:
          result.trend,

          session:
          result.session,
        });


      // ==================================
      // RETURN FINAL
      // ==================================

      return result;

    } catch (err) {

      console.log(
        'AI ENGINE ERROR',
        err,
      );

      throw new HttpException(
        {
          success: false,

          message:
          'AI ENGINE FAILED',

          error:
          (err as any)?.message
        },

        HttpStatus
          .INTERNAL_SERVER_ERROR,
      );
    }
  }


  // ======================================
  // EXPOSURE CALCULATION
  // ======================================

  private calculateExposure(
    positions: any[],
  ) {

    if (!positions) {
      return 0;
    }

    return positions.reduce(
      (
        total,
        position,
      ) =>
        total +
        (
          position.volume ||
          0
        ),

      0,
    );
  }
}