import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { AiMemoryService }
from './ai-memory.service';

@Controller('ai-memory')
export class AiMemoryController {
  constructor(
    private readonly aiMemoryService: AiMemoryService,
  ) {}

  @Post()
  save(
    @Body() body: any,
  ) {
    return this.aiMemoryService.saveMemory(
      body,
    );
  }

  @Get()
  getMemories() {
    return this.aiMemoryService.getMemories();
  }

  @Get('performance')
  getPerformance() {
    return this.aiMemoryService.getPerformance();
  }
}