import { create } from "zustand";

interface MarketState {

  market: any;

  setMarket:
  (data: any) => void;
}

export const useMarketStore =
create<MarketState>((set) => ({

  market: null,

  setMarket:
  (data) =>
    set({
      market: data
    })
}));