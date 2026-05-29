import { Injectable } from '@nestjs/common';

import { MarketRegime }
from './types/market-regime.type';

@Injectable()
export class MarketRegimeService {
  detect(): MarketRegime {
    const regimes: MarketRegime[] =
      [
        'TRENDING',
        'RANGING',
        'BREAKOUT',
        'REVERSAL',
        'VOLATILE',
      ];

    return regimes[
      Math.floor(
        Math.random() *
          regimes.length,
      )
    ];
  }
}