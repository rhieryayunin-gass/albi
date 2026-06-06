"use client";

import { useAIStore }
from "@/stores/ai.store";

import SectionCard
from "../shared/SectionCard";

export default function MacroPanel() {

  const { analysis } =
  useAIStore();

  if(!analysis)
    return null;

  return (
    <SectionCard
      title="MACRO"
    >

      <div>
        MACRO BIAS:
        {analysis.macro_bias}
      </div>

    </SectionCard>
  );
}