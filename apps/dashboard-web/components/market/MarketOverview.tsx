"use client";

import { useMarketStore }
from "@/stores/market.store";

import SectionCard
from "../shared/SectionCard";

export default function MarketOverview() {

  const { market } =
  useMarketStore();

  return (
    <SectionCard
      title="Market Overview"
    >
      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-5
        gap-4
        "
      >

        <Metric
          label="Symbol"
          value={
            market?.symbol ??
            "-"
          }
        />

        <Metric
          label="Bid"
          value={
            market?.bid ??
            "-"
          }
        />

        <Metric
          label="Spread"
          value={
            market?.spread ??
            "-"
          }
        />

        <Metric
          label="ATR"
          value={
            market?.atr ??
            "-"
          }
        />

        <Metric
          label="Session"
          value={
            market?.session ??
            "-"
          }
        />

      </div>

      <div
        className="
        mt-6
        p-4
        rounded-xl
        bg-slate-50
        "
      >
        <div
          className="
          text-xs
          text-slate-500
          "
        >
          TREND
        </div>

        <div
          className="
          text-lg
          font-bold
          mt-1
          "
        >
          {market?.trend ??
            "WAITING"}
        </div>
      </div>
    </SectionCard>
  );
}

function Metric({
  label,
  value,
}: any) {

  return (
    <div
      className="
      rounded-xl
      border
      border-slate-200
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