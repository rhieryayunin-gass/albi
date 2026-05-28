import { Injectable } from '@nestjs/common';

import { SupabaseService }
from '../../common/supabase/supabase.service';

@Injectable()
export class TradesRepository {
  constructor(
    private readonly supabaseService: SupabaseService,
  ) {}

  async createTrade(data: any) {
    return this.supabaseService.client
      .from('trades')
      .insert(data);
  }

  async getTrades() {
    return this.supabaseService.client
      .from('trades')
      .select('*')
      .order('opened_at', {
        ascending: false,
      });
  }
}