import { Injectable } from '@nestjs/common';

import { getSupabaseClient }
from '../../providers/supabase.provider';

@Injectable()
export class TradesRepository {
  async createTrade(data: any) {
    const supabase =
      getSupabaseClient();

    return supabase
      .from('trades')
      .insert(data);
  }

  async getTrades() {
    const supabase =
      getSupabaseClient();

    return supabase
      .from('trades')
      .select('*')
      .order('opened_at', {
        ascending: false,
      });
  }
}