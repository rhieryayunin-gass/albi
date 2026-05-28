import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AiEngineService } from './ai-engine.service';

@Controller('ai-engine')
export class AiEngineController {
  constructor(
    private readonly aiEngineService: AiEngineService,
  ) {}

  @Post('analyze')
  analyze(@Body() body: any) {
    return this.aiEngineService.analyzeMarket(
      body,
    );
  }
}