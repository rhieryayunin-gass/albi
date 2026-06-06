import { create } from "zustand";

interface ExecutionState {
  portfolio: {
    exposure: number;
    openPositions: number;
    floatingPnl: number;
    winrate: number;
  } | null;

  setPortfolio: (
    data: any
  ) => void;
}

export const useExecutionStore =
create<ExecutionState>((set) => ({
  portfolio: null,

  setPortfolio: (data) =>
    set({
      portfolio: data,
    }),
}));