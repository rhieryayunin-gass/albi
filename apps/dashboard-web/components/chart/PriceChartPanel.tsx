"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

import SectionCard
from "../shared/SectionCard";

import { useMarketStore }
from "@/stores/market.store";

export default function PriceChartPanel() {

  const { market } =
  useMarketStore();

  const data = [
    {
      time: "Now",
      price:
        market?.bid || 0,
    },
  ];

  return (
    <SectionCard
      title="Price Chart"
    >
      <div
        className="
        h-[300px]
        "
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
          >
            <XAxis
              dataKey="time"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="price"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}