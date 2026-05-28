import {
  Controller,
  Get,
} from '@nestjs/common';

import { TradesRepository }
from './trades.repository';

@Controller('trades')
export class TradesController {
  constructor(
    private readonly tradesRepository: TradesRepository,
  ) {}

  @Get()
  async getTrades() {
    return this.tradesRepository.getTrades();
  }
}