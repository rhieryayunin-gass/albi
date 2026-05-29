export interface AiState {
  signal: string;

  confidence: number;

  regime: string;

  strategy: string;

  approved: boolean;

  ai_engine: string;
}

export interface ExposureState {
  openPositions: number;

  totalExposure: number;

  floatingPnl: number;

  activeSymbols: string[];
}