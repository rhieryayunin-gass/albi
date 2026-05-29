'use client';

import {
  useEffect,
  useState,
} from 'react';

export default function AiMemoryPage() {
  const [performance, setPerformance] =
    useState<any>(null);

  useEffect(() => {
    loadPerformance();
  }, []);

  async function loadPerformance() {
    const response = await fetch(
      'https://api.albiagent.com/ai-memory/performance',
    );

    const data =
      await response.json();

    setPerformance(data);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold">
        AI Memory
      </h1>

      <div className="grid grid-cols-4 gap-6 mt-10">
        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="text-zinc-400">
            Total Trades
          </div>

          <div className="text-4xl font-bold mt-3">
            {performance?.total || 0}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="text-zinc-400">
            Wins
          </div>

          <div className="text-4xl font-bold mt-3">
            {performance?.wins || 0}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="text-zinc-400">
            Winrate
          </div>

          <div className="text-4xl font-bold mt-3">
            {performance?.winrate || 0}%
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="text-zinc-400">
            Total Profit
          </div>

          <div className="text-4xl font-bold mt-3">
            $
            {performance?.totalProfit || 0}
          </div>
        </div>
      </div>
    </main>
  );
}