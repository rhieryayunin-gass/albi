'use client';

import {
  useEffect,
  useState,
} from 'react';

import { motion } from 'framer-motion';

import {
  AdvancedRealTimeChart,
} from 'react-ts-tradingview-widgets';

import AuthGuard from '../components/AuthGuard';

import { socket } from '../lib/socket';

import {
  AiState,
  ExposureState,
} from '../types/ai';

export default function HomePage() {
  const [marketData, setMarketData] =
    useState<any>(null);

  const [exposure, setExposure] =
    useState<ExposureState | null>(
      null,
    );

  const [aiState, setAiState] =
    useState<AiState | null>(
      null,
    );

  const [performance, setPerformance] =
    useState<any>(null);

  const [emergencyState, setEmergencyState] =
    useState<any>(null);

  useEffect(() => {
    loadPerformance();

    loadEmergencyState();

    socket.on(
      'market-data',
      (data) => {
        setMarketData(data);
      },
    );

    socket.on(
      'exposure-update',
      (data) => {
        setExposure(data);
      },
    );

    return () => {
      socket.off('market-data');

      socket.off(
        'exposure-update',
      );
    };
  }, []);

  async function analyzeAi() {
    if (!marketData) return;

    const response = await fetch(
      'https://api.albiagent.com/ai-engine/analyze',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify(
          marketData,
        ),
      },
    );

    const data =
      await response.json();

    setAiState(data);
  }

  async function loadPerformance() {
    const response = await fetch(
      'https://api.albiagent.com/ai-memory/performance',
    );

    const data =
      await response.json();

    setPerformance(data);
  }

  async function loadEmergencyState() {
    const response = await fetch(
      'https://api.albiagent.com/emergency/state',
    );

    const data =
      await response.json();

    setEmergencyState(data);
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

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

          <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Navbar */}
        <nav className="relative z-20 border-b border-white/10 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">
            <div className="flex items-center gap-10">
              <div className="text-2xl font-semibold">
                ALBI
              </div>

              <div className="flex gap-8 text-zinc-400">
                <a href="/">
                  Dashboard
                </a>

                <a href="/trades">
                  Trades
                </a>

                <a href="/ai-memory">
                  AI Memory
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`px-4 py-2 rounded-full text-sm ${
                  emergencyState?.frozen
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-green-500/20 text-green-400'
                }`}
              >
                {emergencyState?.frozen
                  ? 'FROZEN'
                  : 'LIVE'}
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <section className="relative z-10 max-w-7xl mx-auto px-8 py-10">
          {/* Top Grid */}
          <div className="grid grid-cols-4 gap-6">
            <DashboardCard
              title="Balance"
              value={`$${marketData?.balance || 0}`}
            />

            <DashboardCard
              title="Equity"
              value={`$${marketData?.equity || 0}`}
            />

            <DashboardCard
              title="Exposure"
              value={`${exposure?.totalExposure || 0} lot`}
            />

            <DashboardCard
              title="Floating PnL"
              value={`$${exposure?.floatingPnl || 0}`}
            />
          </div>

          {/* Chart + AI */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Chart */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-zinc-500 text-sm">
                    LIVE MARKET
                  </div>

                  <div className="text-2xl font-semibold mt-1">
                    XAUUSD
                  </div>
                </div>

                <button
                  onClick={analyzeAi}
                  className="bg-white text-black px-5 py-3 rounded-2xl font-medium"
                >
                  Analyze AI
                </button>
              </div>

              <div className="h-[600px]">
                <AdvancedRealTimeChart
                  theme="dark"
                  symbol="OANDA:XAUUSD"
                  autosize
                />
              </div>
            </motion.div>

            {/* AI Panel */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl"
            >
              <div className="text-zinc-500 text-sm">
                AI ORCHESTRATION
              </div>

              <div className="mt-6 space-y-6">
                <InfoItem
                  label="Signal"
                  value={
                    aiState?.signal ||
                    '-'
                  }
                />

                <InfoItem
                  label="Confidence"
                  value={`${aiState?.confidence || 0}%`}
                />

                <InfoItem
                  label="Regime"
                  value={
                    aiState?.regime ||
                    '-'
                  }
                />

                <InfoItem
                  label="Strategy"
                  value={
                    aiState?.strategy ||
                    '-'
                  }
                />

                <InfoItem
                  label="AI Engine"
                  value={
                    aiState?.ai_engine ||
                    '-'
                  }
                />

                <InfoItem
                  label="Status"
                  value={
                    aiState?.approved
                      ? 'APPROVED'
                      : 'BLOCKED'
                  }
                />
              </div>

              {/* Controls */}
              <div className="mt-10 space-y-4">
                <button
                  onClick={
                    freezeTrading
                  }
                  className="w-full bg-red-500 text-white py-4 rounded-2xl font-medium"
                >
                  Emergency Freeze
                </button>

                <button
                  onClick={
                    resumeTrading
                  }
                  className="w-full bg-green-500 text-white py-4 rounded-2xl font-medium"
                >
                  Resume Trading
                </button>
              </div>
            </motion.div>
          </div>

          {/* Analytics */}
          <div className="grid grid-cols-4 gap-6 mt-6">
            <DashboardCard
              title="Winrate"
              value={`${performance?.winrate || 0}%`}
            />

            <DashboardCard
              title="Wins"
              value={`${performance?.wins || 0}`}
            />

            <DashboardCard
              title="Losses"
              value={`${performance?.losses || 0}`}
            />

            <DashboardCard
              title="Total Profit"
              value={`$${performance?.totalProfit || 0}`}
            />
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

function DashboardCard({
  title,
  value,
}: any) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl"
    >
      <div className="text-zinc-500 text-sm">
        {title}
      </div>

      <div className="text-4xl font-semibold mt-4">
        {value}
      </div>
    </motion.div>
  );
}

function InfoItem({
  label,
  value,
}: any) {
  return (
    <div>
      <div className="text-zinc-500 text-sm">
        {label}
      </div>

      <div className="text-xl font-semibold mt-2">
        {value}
      </div>
    </div>
  );
}