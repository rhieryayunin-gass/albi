import {
  Controller,
  Get,
} from '@nestjs/common';

import { AiMemoryService }
from './ai-memory.service';


@Controller('ai-memory')
export class AiMemoryController {

  constructor(
    private readonly aiMemoryService:
    AiMemoryService,
  ) {}


  // ======================================
  // PERFORMANCE
  // ======================================

  @Get('performance')
  async performance() {
    return this.aiMemoryService
      .getPerformance();
  }


  // ======================================
  // RECENT MEMORIES
  // ======================================

  @Get('recent')
  async recent() {
    return this.aiMemoryService
      .getRecentMemories();
  }


  // ======================================
  // STRATEGIES
  // ======================================

  @Get('strategies')
  async strategies() {
    return this.aiMemoryService
      .getBestStrategies();
  }


  // ======================================
  // RISK ANALYTICS
  // ======================================

  @Get('risk')
  async risk() {
    return this.aiMemoryService
      .getRiskAnalytics();
  }
}