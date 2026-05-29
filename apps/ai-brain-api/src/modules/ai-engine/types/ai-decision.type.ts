import { MarketRegime }
from './market-regime.type';

import { StrategyMode }
from './strategy-mode.type';

export interface AiDecision {
  signal: 'BUY' | 'SELL' | 'NO TRADE';

  confidence: number;

  regime: MarketRegime;

  strategy: StrategyMode;

  approved: boolean;

  reason?: string;
}