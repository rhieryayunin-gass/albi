import { Module } from '@nestjs/common';

import { TradesController } from './trades.controller';

import { TradesRepository } from './trades.repository';

import { TradesService } from './trades.service';

import { SupabaseService }
from '../../common/supabase/supabase.service';

@Module({
  controllers: [TradesController],

  providers: [
    TradesRepository,
    TradesService,
    SupabaseService,
  ],

  exports: [TradesService],
})
export class TradesModule {}