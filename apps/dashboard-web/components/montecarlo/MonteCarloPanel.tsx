"use client";

import { useAIStore }
from "@/stores/ai.store";

import SectionCard
from "../shared/SectionCard";

export default function MonteCarloPanel() {

  const { analysis } =
  useAIStore();

  if(!analysis)
    return null;

  return (
    <SectionCard
      title="MONTE CARLO"
    >

      <div>
        EXPECTED WINRATE:
        {analysis.expected_winrate}
      </div>

      <div>
        EXPECTED DD:
        {analysis.expected_drawdown}
      </div>

      <div>
        RISK OF RUIN:
        {analysis.risk_of_ruin}
      </div>

    </SectionCard>
  );
}