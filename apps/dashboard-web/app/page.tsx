'use client';

import { useEffect, useState } from 'react';

import { socket } from '../lib/socket';

export default function HomePage() {
  const [marketData, setMarketData] =
    useState<any>(null);

  useEffect(() => {
    socket.on(
      'market-data',
      (data) => {
        console.log(data);

        setMarketData(data);
      },
    );

    return () => {
      socket.off('market-data');
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex">
        <aside className="w-64 border-r border-zinc-800 min-h-screen p-6">
          <h1 className="text-2xl font-bold">
            ALBI
          </h1>

          <div className="mt-10 space-y-4 text-zinc-400">
            <div>Dashboard</div>
            <div>Trades</div>
            <div>Risk Engine</div>
            <div>AI Brain</div>
            <div>Settings</div>
          </div>
        </aside>

        <section className="flex-1 p-8">
          <h2 className="text-4xl font-bold">
            ALBI AI Dashboard
          </h2>

          <div className="grid grid-cols-4 gap-4 mt-10">
            <div className="bg-zinc-900 rounded-xl p-6">
              <div className="text-zinc-400 text-sm">
                Symbol
              </div>

              <div className="text-3xl font-bold mt-2">
                {marketData?.symbol || '-'}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <div className="text-zinc-400 text-sm">
                Equity
              </div>

              <div className="text-3xl font-bold mt-2">
                $
                {marketData?.equity || 0}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <div className="text-zinc-400 text-sm">
                Balance
              </div>

              <div className="text-3xl font-bold mt-2">
                $
                {marketData?.balance || 0}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <div className="text-zinc-400 text-sm">
                Spread
              </div>

              <div className="text-3xl font-bold mt-2">
                {marketData?.spread || 0}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}