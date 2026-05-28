export type TradeSide = 'BUY' | 'SELL';

export type TradeStatus =
  | 'open'
  | 'closed'
  | 'cancelled';

export interface Trade {
  id: string;

  symbol: string;

  side: TradeSide;

  lot: number;

  confidence: number;

  stop_loss: number;
  take_profit: number;

  status: TradeStatus;
}