export interface Candle {
  open: number;

  high: number;

  low: number;

  close: number;

  volume: number;
}


export interface Position {
  ticket: number;

  type: string;

  profit: number;

  volume: number;

  entry: number;
}


// ========================================
// MARKET DATA
// ========================================

export interface MarketDataState {

  symbol: string;

  bid: number;

  ask: number;

  spread: number;

  balance: number;

  equity: number;

  atr: number;

  rsi: number;

  ema20: number;

  ema50: number;

  ema200: number;

  trend: string;

  session: string;

  dailyGrowth: number;
}


// ========================================
// AI ANALYSIS
// ========================================

export interface AiState {

  signal: string;

  confidence: number;

  regime: string;

  strategy: string;

  approved: boolean;

  reason: string;

  analysis: string;

  macro_bias: string;

  expected_pnl: number;

  expected_winrate: number;

  expected_drawdown: number;

  best_strategy: string;

  updatedAt: string;
}


// ========================================
// RISK ENGINE
// ========================================

export interface RiskState {

  approved: boolean;

  reason: string;

  score: number;

  warnings: string[];

  riskLevel: string;

  updatedAt: string;
}


// ========================================
// PERFORMANCE
// ========================================

export interface PerformanceState {

  totalTrades: number;

  wins: number;

  losses: number;

  totalProfit: number;

  maxDrawdown: number;

  winrate: number;

  timestamp: string;
}


// ========================================
// EMERGENCY
// ========================================

export interface EmergencyState {

  frozen: boolean;

  reason: string | null;

  timestamp: string;
}


// ========================================
// TRADE EXECUTION
// ========================================

export interface TradeExecutionState {

  ticket: number;

  symbol: string;

  type: string;

  lot: number;

  entryPrice: number;

  stopLoss: number;

  takeProfit: number;

  timestamp: string;
}