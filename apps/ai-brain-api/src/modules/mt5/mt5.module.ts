import { Module } from '@nestjs/common';

import { Mt5Controller } from './mt5.controller';
import { Mt5Service } from './mt5.service';

import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [WebsocketModule],

  controllers: [Mt5Controller],

  providers: [Mt5Service],
})
export class Mt5Module {}