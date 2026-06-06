import { create } from "zustand";

interface AIState {

  analysis: any;

  setAnalysis:
  (data: any) => void;
}

export const useAIStore =
create<AIState>((set) => ({

  analysis: null,

  setAnalysis:
  (data) =>
    set({
      analysis: data
    })
}));