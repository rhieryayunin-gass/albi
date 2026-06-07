"use client";

import SectionCard
from "../shared/SectionCard";

import {
  useExecutionStore,
}
from "@/stores/execution.store";

export default function PortfolioPanel() {

  const { portfolio } =
  useExecutionStore();

  return (
    <SectionCard
      title="Portfolio"
    >

      <div
        className="
        grid
        grid-cols-2
        gap-4
        "
      >

        <Metric
          label="Exposure"
          value={
            portfolio?.exposure ??
            "-"
          }
        />

        <Metric
          label="Positions"
          value={
            portfolio?.openPositions ??
            "-"
          }
        />

        <Metric
          label="Floating PnL"
          value={
            portfolio
              ?.floatingPnl ??
            "-"
          }
        />

        <Metric
          label="Winrate"
          value={
            portfolio
              ?.winrate != null
              ? `${portfolio.winrate}%`
              : "-"
          }
        />

      </div>

    </SectionCard>
  );
}

interface MetricProps {
  label: string;
  value: string | number;
}

function Metric({
  label,
  value,
}: MetricProps): React.JSX.Element {
  return (
    <div
      className="
      border
      border-slate-200
      rounded-xl
      p-4
      "
    >
      <div
        className="
        text-xs
        text-slate-500
        "
      >
        {label}
      </div>

      <div
        className="
        text-xl
        font-bold
        mt-1
        "
      >
        {value}
      </div>
    </div>
  );
}