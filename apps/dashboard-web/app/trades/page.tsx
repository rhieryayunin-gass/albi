'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import AuthGuard from '../../components/AuthGuard';

import { socket } from '../../lib/socket';

interface Trade {
  id: string;

  symbol: string;

  type: string;

  lot: number;

  entry_price: number;

  stop_loss: number;

  take_profit: number;

  status: string;

  profit: number;

  opened_at: string;
}

export default function TradesPage() {
  const [trades, setTrades] =
    useState<Trade[]>([]);

  async function loadTrades() {
    try {
      const response = await fetch(
        'https://api.albiagent.com/trades',
      );

      const result =
        await response.json();

      setTrades(result.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTrades();

    socket.on(
      'new-trade',
      () => {
        loadTrades();
      },
    );

    return () => {
      socket.off('new-trade');
    };
  }, []);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#050505] text-white">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-white/5 blur-3xl rounded-full" />

          <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-white/5 blur-3xl rounded-full" />
        </div>

        {/* Navbar */}
        <nav className="relative z-20 border-b border-white/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">
            <div className="flex items-center gap-10">
              <a
                href="/"
                className="text-2xl font-semibold"
              >
                ALBI
              </a>

              <div className="flex items-center gap-8 text-zinc-400">
                <a
                  href="/"
                  className="hover:text-white"
                >
                  Dashboard
                </a>

                <a
                  href="/trades"
                  className="text-white"
                >
                  Trades
                </a>
              </div>
            </div>

            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
              LIVE
            </div>
          </div>
        </nav>

        {/* Content */}
        <section className="relative z-10 max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-semibold tracking-tight">
                Live Trades
              </h1>

              <p className="text-zinc-500 mt-4 text-lg">
                Realtime AI execution monitoring.
              </p>
            </div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="bg-white/5 border border-white/10 rounded-3xl px-8 py-6 backdrop-blur-2xl"
            >
              <div className="text-zinc-500 text-sm">
                Total Trades
              </div>

              <div className="text-4xl font-semibold mt-2">
                {trades.length}
              </div>
            </motion.div>
          </div>

          {/* Table */}
          <div className="mt-10 bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left text-zinc-500 text-sm">
                    <th className="p-6">
                      Symbol
                    </th>

                    <th className="p-6">
                      Type
                    </th>

                    <th className="p-6">
                      Lot
                    </th>

                    <th className="p-6">
                      Entry
                    </th>

                    <th className="p-6">
                      SL
                    </th>

                    <th className="p-6">
                      TP
                    </th>

                    <th className="p-6">
                      Status
                    </th>

                    <th className="p-6">
                      Profit
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {trades.map((trade) => (
                    <motion.tr
                      key={trade.id}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition"
                    >
                      <td className="p-6 font-medium">
                        {trade.symbol}
                      </td>

                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            trade.type ===
                            'BUY'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {trade.type}
                        </span>
                      </td>

                      <td className="p-6">
                        {trade.lot}
                      </td>

                      <td className="p-6">
                        {trade.entry_price}
                      </td>

                      <td className="p-6">
                        {trade.stop_loss}
                      </td>

                      <td className="p-6">
                        {trade.take_profit}
                      </td>

                      <td className="p-6">
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          {trade.status}
                        </span>
                      </td>

                      <td className="p-6 font-medium">
                        ${trade.profit || 0}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {trades.length === 0 && (
                <div className="p-20 text-center text-zinc-500">
                  No trades yet.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}