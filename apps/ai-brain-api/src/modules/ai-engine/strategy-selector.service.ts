import { Injectable } from '@nestjs/common';

import { MarketRegime }
from './types/market-regime.type';

import { StrategyMode }
from './types/strategy-mode.type';

@Injectable()
export class StrategySelectorService {
  select(
    regime: MarketRegime,
  ): StrategyMode {
    switch (regime) {
      case 'TRENDING':
        return 'AGGRESSIVE';

      case 'BREAKOUT':
        return 'SNIPER';

      case 'REVERSAL':
        return 'OPPORTUNIST';

      case 'VOLATILE':
        return 'DEFENSIVE';

      default:
        return 'SNIPER';
    }
  }
}