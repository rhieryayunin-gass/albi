'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { socket } from '../lib/socket';

import AuthGuard from '../components/AuthGuard';

import { logout } from '../lib/auth';

export default function HomePage() {
  const [marketData, setMarketData] =
    useState<any>(null);

  const [
    emergencyState,
    setEmergencyState,
  ] = useState<any>(null);

  async function loadEmergencyState() {
    try {
      const response = await fetch(
        'https://api.albiagent.com/emergency/state',
      );

      const data =
        await response.json();

      setEmergencyState(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function freezeTrading() {
    await fetch(
      'https://api.albiagent.com/emergency/freeze',
      {
        method: 'POST',
      },
    );

    loadEmergencyState();
  }

  async function resumeTrading() {
    await fetch(
      'https://api.albiagent.com/emergency/resume',
      {
        method: 'POST',
      },
    );

    loadEmergencyState();
  }

  useEffect(() => {
    loadEmergencyState();

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
    <AuthGuard>
      <main className="min-h-screen bg-[#0b0b0b] text-white overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-white/5 blur-3xl rounded-full" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-white/5 blur-3xl rounded-full" />

        {/* Top Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/30">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <h1 className="text-2xl font-semibold tracking-tight">
                ALBI
              </h1>

              <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
                <button className="hover:text-white transition">
                  Dashboard
                </button>

                <a
                  href="/trades"
                  className="hover:text-white transition"
                >
                  Trades
                </a>

                <button className="hover:text-white transition">
                  Risk Engine
                </button>

                <button className="hover:text-white transition">
                  AI Brain
                </button>

                <button className="hover:text-white transition">
                  Settings
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                logout();

                window.location.href =
                  '/login';
              }}
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Content */}
        <section className="relative z-10 max-w-7xl mx-auto px-8 py-12">
          <div>
            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="text-6xl font-semibold tracking-tight"
            >
              ALBI AI
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
                duration: 0.6,
              }}
              className="text-zinc-500 mt-4 text-lg"
            >
              Adaptive autonomous XAUUSD intelligence.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-zinc-500 text-sm">
                Symbol
              </div>

              <div className="text-4xl font-semibold mt-4 tracking-tight">
                {marketData?.symbol || '-'}
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-zinc-500 text-sm">
                Equity
              </div>

              <div className="text-4xl font-semibold mt-4 tracking-tight">
                $
                {marketData?.equity || 0}
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-zinc-500 text-sm">
                Balance
              </div>

              <div className="text-4xl font-semibold mt-4 tracking-tight">
                $
                {marketData?.balance || 0}
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-zinc-500 text-sm">
                Spread
              </div>

              <div className="text-4xl font-semibold mt-4 tracking-tight">
                {marketData?.spread || 0}
              </div>
            </motion.div>
          </div>

          {/* AI Status Panel */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
            className="mt-10 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-zinc-500 text-sm">
                  AI STATUS
                </div>

                <div className="text-3xl font-semibold mt-3">
                  Adaptive Sniper Aggressive
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

                <div className="text-zinc-400">
                  LIVE
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                <div className="text-zinc-500 text-sm">
                  Confidence
                </div>

                <div className="text-3xl font-semibold mt-2">
                  92%
                </div>
              </div>

              <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                <div className="text-zinc-500 text-sm">
                  Risk Mode
                </div>

                <div className="text-3xl font-semibold mt-2">
                  Adaptive
                </div>
              </div>

              <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                <div className="text-zinc-500 text-sm">
                  Max Exposure
                </div>

                <div className="text-3xl font-semibold mt-2">
                  0.5 Lot
                </div>
              </div>
            </div>
          </motion.div>

          {/* Emergency Engine */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.7,
            }}
            className="mt-10 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <div className="text-zinc-500 text-sm">
                  EMERGENCY ENGINE
                </div>

                <div className="text-4xl font-semibold mt-3">
                  {emergencyState?.frozen
                    ? 'FROZEN'
                    : 'ACTIVE'}
                </div>

                <div className="text-zinc-500 mt-3">
                  {emergencyState?.reason ||
                    'SYSTEM NORMAL'}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={freezeTrading}
                  className="bg-red-500 hover:bg-red-400 transition text-white px-6 py-3 rounded-2xl font-medium"
                >
                  Freeze
                </button>

                <button
                  onClick={resumeTrading}
                  className="bg-green-500 hover:bg-green-400 transition text-white px-6 py-3 rounded-2xl font-medium"
                >
                  Resume
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </AuthGuard>
  );
}