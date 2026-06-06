"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

import SectionCard
from "../shared/SectionCard";

import { useAIStore }
from "@/stores/ai.store";

export default function ConfidenceChart() {

  const { analysis } =
  useAIStore();

  const data = [
    {
      confidence:
      analysis?.confidence || 0,
    },
  ];

  return (
    <SectionCard
      title="Confidence History"
    >
      <div
        className="
        h-[250px]
        "
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={data}
          >
            <Tooltip />

            <Area
              dataKey="confidence"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}