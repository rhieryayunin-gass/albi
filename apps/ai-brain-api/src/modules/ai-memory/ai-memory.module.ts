import { Module } from '@nestjs/common';

import { AiMemoryController }
from './ai-memory.controller';

import { AiMemoryService }
from './ai-memory.service';

import { SupabaseService }
from '../../common/supabase/supabase.service';

@Module({
  controllers: [
    AiMemoryController,
  ],

  providers: [AiMemoryService, SupabaseService],

  exports: [AiMemoryService],
})
export class AiMemoryModule {}