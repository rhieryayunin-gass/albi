import { Module } from '@nestjs/common';

import { Mt5Controller } from './mt5.controller';
import { Mt5Service } from './mt5.service';

import { WebsocketModule } from '../websocket/websocket.module';

import { TradesRepository }
from '../trades/trades.repository';

import { SupabaseService }
from '../../common/supabase/supabase.service';

@Module({
  imports: [WebsocketModule],

  controllers: [Mt5Controller],

  providers: [
  Mt5Service,
  TradesRepository,
  SupabaseService,
],
})
export class Mt5Module {}