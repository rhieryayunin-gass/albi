import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AiEngineService }
from './ai-engine.service';

@Controller('ai-engine')
export class AiEngineController {
  constructor(
    private readonly aiEngineService: AiEngineService,
  ) {}

  @Post('analyze')
  async analyze(
    @Body() body: any,
  ) {
    return await this.aiEngineService.analyzeMarket(
      body,
    );
  }
}