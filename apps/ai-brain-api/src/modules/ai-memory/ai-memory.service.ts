import {
  Injectable,
} from '@nestjs/common';

import { SupabaseService }
from '../../common/supabase/supabase.service';


@Injectable()
export class AiMemoryService {

  constructor(
    private readonly supabaseService:
    SupabaseService,
  ) {}


  // ======================================
  // SAVE AI MEMORY
  // ======================================

  async saveMemory(
    data: {
      symbol: string;

      signal: string;

      confidence: number;

      regime: string;

      strategy: string;

      approved: boolean;

      macroBias: string;

      expectedPnl: number;

      expectedWinrate: number;

      expectedDrawdown: number;

      bestStrategy: string;

      analysis: string;

      riskScore: number;

      riskLevel: string;

      spread: number;

      atr: number;

      rsi: number;

      trend: string;

      session: string;
    },
  ) {

    const response =
      await this.supabaseService.client

        .from(
          'ai_memory',
        )

        .insert({
          symbol:
          data.symbol,

          signal:
          data.signal,

          confidence:
          data.confidence,

          regime:
          data.regime,

          strategy:
          data.strategy,

          approved:
          data.approved,

          macro_bias:
          data.macroBias,

          expected_pnl:
          data.expectedPnl,

          expected_winrate:
          data.expectedWinrate,

          expected_drawdown:
          data.expectedDrawdown,

          best_strategy:
          data.bestStrategy,

          analysis:
          data.analysis,

          risk_score:
          data.riskScore,

          risk_level:
          data.riskLevel,

          spread:
          data.spread,

          atr:
          data.atr,

          rsi:
          data.rsi,

          trend:
          data.trend,

          session:
          data.session,
        })

        .select()

        .single();

    return response;
  }


  // ======================================
  // GET PERFORMANCE
  // ======================================

  async getPerformance() {

    const { data } =
      await this.supabaseService.client

        .from(
          'ai_memory',
        )

        .select('*');

    const totalTrades =
      data?.length || 0;

    const wins =
      data?.filter(
        (x) =>
          x.expected_pnl > 0,
      ).length || 0;

    const losses =
      data?.filter(
        (x) =>
          x.expected_pnl <= 0,
      ).length || 0;

    const totalProfit =
      data?.reduce(
        (sum, x) =>
          sum +
          (
            x.expected_pnl ||
            0
          ),
        0,
      ) || 0;

    const maxDrawdown =
      Math.max(
        ...(data?.map(
          (x) =>
            x.expected_drawdown ||
            0,
        ) || [0]),
      );

    const winrate =
      totalTrades > 0
        ? (
            wins /
            totalTrades
          ) * 100
        : 0;

    return {
      totalTrades,

      wins,

      losses,

      totalProfit:
      Number(
        totalProfit.toFixed(
          2,
        ),
      ),

      maxDrawdown:
      Number(
        maxDrawdown.toFixed(
          2,
        ),
      ),

      winrate:
      Number(
        winrate.toFixed(
          2,
        ),
      ),
    };
  }


  // ======================================
  // RECENT MEMORIES
  // ======================================

  async getRecentMemories() {

    const { data } =
      await this.supabaseService.client

        .from(
          'ai_memory',
        )

        .select('*')

        .order(
          'created_at',
          {
            ascending:
            false,
          },
        )

        .limit(50);

    return data;
  }


  // ======================================
  // BEST STRATEGIES
  // ======================================

  async getBestStrategies() {

    const { data } =
      await this.supabaseService.client

        .from(
          'ai_memory',
        )

        .select('*');

    const grouped = {};

    data?.forEach(
      (item) => {

        if (
          !grouped[
            item.strategy
          ]
        ) {
          grouped[
            item.strategy
          ] = {
            trades: 0,

            pnl: 0,
          };
        }

        grouped[
          item.strategy
        ].trades += 1;

        grouped[
          item.strategy
        ].pnl +=
          item.expected_pnl || 0;
      },
    );

    return grouped;
  }


  // ======================================
  // RISK ANALYTICS
  // ======================================

  async getRiskAnalytics() {

    const { data } =
      await this.supabaseService.client

        .from(
          'ai_memory',
        )

        .select('*');

    const avgConfidence =
      (
        data?.reduce(
          (sum, x) =>
            sum +
            (
              x.confidence ||
              0
            ),
          0,
        ) || 0
      ) /
      (
        data?.length || 1
      );

    const avgRiskScore =
      (
        data?.reduce(
          (sum, x) =>
            sum +
            (
              x.risk_score ||
              0
            ),
          0,
        ) || 0
      ) /
      (
        data?.length || 1
      );

    return {
      avgConfidence:
      Number(
        avgConfidence.toFixed(
          2,
        ),
      ),

      avgRiskScore:
      Number(
        avgRiskScore.toFixed(
          2,
        ),
      ),
    };
  }
}