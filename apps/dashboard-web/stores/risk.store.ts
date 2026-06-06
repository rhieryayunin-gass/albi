import { create } from "zustand";

interface RiskState {

  risk: any;

  setRisk:
  (data: any) => void;
}

export const useRiskStore =
create<RiskState>((set) => ({

  risk: null,

  setRisk:
  (data) =>
    set({
      risk: data
    })
}));