"use client";

import { useAIStore }
from "@/stores/ai.store";

import SectionCard
from "../shared/SectionCard";

export default function AIAnalysisPanel() {

  const { analysis } =
  useAIStore();

  return (
    <SectionCard
      title="AI Analysis"
    >

      <div
        className="
        flex
        justify-between
        items-center
        "
      >
        <div>

          <div
            className="
            text-xs
            text-slate-500
            "
          >
            SIGNAL
          </div>

          <div
            className="
            text-4xl
            font-bold
            "
          >
            {
              analysis?.signal ??
              "WAIT"
            }
          </div>

        </div>

        <div
          className="
          text-right
          "
        >

          <div
            className="
            text-xs
            text-slate-500
            "
          >
            CONFIDENCE
          </div>

          <div
            className="
            text-4xl
            font-bold
            text-blue-600
            "
          >
            {
              analysis?.confidence ??
              0
            }%
          </div>

        </div>
      </div>

      <div
        className="
        mt-6
        space-y-3
        "
      >

        <Row
          label="Strategy"
          value={
            analysis?.strategy
          }
        />

        <Row
          label="Regime"
          value={
            analysis?.regime
          }
        />

        <Row
          label="Liquidity"
          value={
            analysis?.liquidity_state
          }
        />

        <Row
          label="Execution"
          value={
            analysis?.execution_quality
          }
        />

        <Row
          label="Macro"
          value={
            analysis?.macro_bias
          }
        />

      </div>

      <div
        className="
        mt-6
        rounded-xl
        bg-blue-50
        p-4
        "
      >

        <div
          className="
          text-xs
          text-slate-500
          mb-2
          "
        >
          AI THINKING
        </div>

        <div
          className="
          text-sm
          "
        >
          {
            analysis?.reasoning ??
            "Waiting analysis..."
          }
        </div>

      </div>

    </SectionCard>
  );
}

function Row({
  label,
  value,
}: any) {

  return (
    <div
      className="
      flex
      justify-between
      "
    >
      <span
        className="
        text-slate-500
        "
      >
        {label}
      </span>

      <span
        className="
        font-medium
        "
      >
        {value ?? "-"}
      </span>
    </div>
  );
}