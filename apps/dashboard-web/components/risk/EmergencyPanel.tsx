"use client";

import { useRiskStore }
from "@/stores/risk.store";

import SectionCard
from "../shared/SectionCard";

export default function EmergencyPanel() {

  const { risk } =
  useRiskStore();

  if(!risk)
    return null;

  return (
    <SectionCard
      title="EMERGENCY"
    >

      <div>
        EMERGENCY:
        {
          String(
            risk.emergency_state
          )
        }
      </div>

    </SectionCard>
  );
}