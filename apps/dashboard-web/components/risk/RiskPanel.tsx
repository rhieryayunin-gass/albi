"use client";

import { useRiskStore }
from "@/stores/risk.store";

import SectionCard
from "../shared/SectionCard";

export default function RiskPanel() {

  const { risk } =
  useRiskStore();

  return (
    <SectionCard
      title="Risk Engine"
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
            RISK SCORE
          </div>

          <div
            className="
            text-4xl
            font-bold
            "
          >
            {
              risk?.score ??
              0
            }
          </div>

        </div>

        <div>

          <div
            className="
            text-xs
            text-slate-500
            "
          >
            STATUS
          </div>

          <div
            className={`
            text-lg
            font-bold

            ${
              risk?.approved
                ? "text-green-600"
                : "text-red-600"
            }
            `}
          >
            {
              risk?.approved
              ? "APPROVED"
              : "REJECTED"
            }
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
          label="Risk Level"
          value={
            risk?.risk_level
          }
        />

        <Row
          label="Tail Risk"
          value={
            risk?.tail_risk
          }
        />

        <Row
          label="Risk Of Ruin"
          value={
            risk?.risk_of_ruin
          }
        />

        <Row
          label="Portfolio Pressure"
          value={
            risk?.portfolio_pressure
          }
        />

        <Row
          label="Mode"
          value={
            risk?.recommended_mode
          }
        />

      </div>

      <div
        className="
        mt-6
        rounded-xl
        bg-red-50
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
          WARNING
        </div>

        <div
          className="
          text-sm
          "
        >
          {
            risk?.warnings?.length
            ? risk.warnings.join(
                ", "
              )
            : "No active warning"
          }
        </div>
      </div>

    </SectionCard>
  );
}

interface RowProps {
  label: string;
  value?: string | number | null;
}

function Row({
  label,
  value,
}: RowProps): React.JSX.Element {
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