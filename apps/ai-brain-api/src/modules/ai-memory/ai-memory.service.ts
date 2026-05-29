import { Injectable } from '@nestjs/common';

import { getSupabaseClient }
from '../../providers/supabase.provider';

@Injectable()
export class AiMemoryService {
  async saveMemory(data: any) {
    const supabase =
      getSupabaseClient();

    const response =
      await supabase
        .from('ai_memories')
        .insert({
          symbol: data.symbol,

          signal: data.signal,

          strategy:
            data.strategy,

          regime: data.regime,

          confidence:
            data.confidence,

          approved:
            data.approved,

          result:
            data.result || null,

          profit:
            data.profit || 0,
        });

    return response;
  }

  async getMemories() {
    const supabase =
      getSupabaseClient();

    const response =
      await supabase
        .from('ai_memories')
        .select('*')
        .order(
          'created_at',
          {
            ascending: false,
          },
        )
        .limit(100);

    return response.data;
  }

  async getPerformance() {
    const memories =
      await this.getMemories();

    const total =
      memories?.length || 0;

    const wins =
      memories?.filter(
        (m) => m.profit > 0,
      ).length || 0;

    const losses =
      memories?.filter(
        (m) => m.profit < 0,
      ).length || 0;

    const totalProfit =
      memories?.reduce(
        (acc, curr) =>
          acc + curr.profit,
        0,
      ) || 0;

    const winrate =
      total > 0
        ? (wins / total) * 100
        : 0;

    return {
      total,

      wins,

      losses,

      totalProfit,

      winrate:
        Number(
          winrate.toFixed(2),
        ),
    };
  }
}