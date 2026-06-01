'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  motion,
} from 'framer-motion';

import {
  AdvancedRealTimeChart,
} from 'react-ts-tradingview-widgets';

import AuthGuard
from '../components/AuthGuard';

import { socket }
from '../lib/socket';

import {
  AiState,
  MarketDataState,
  RiskState,
  PerformanceState,
  EmergencyState,
  TradeExecutionState,
} from '../types/ai';

import {
  Shield,
  Brain,
  Activity,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Zap,
  Globe2,
  Timer,
  Radio,
  Target,
} from 'lucide-react';


export default function HomePage() {

  const [
    market,
    setMarket,
  ] =
    useState<
      MarketDataState | null
    >(null);

  const [
    ai,
    setAi,
  ] =
    useState<
      AiState | null
    >(null);

  const [
    risk,
    setRisk,
  ] =
    useState<
      RiskState | null
    >(null);

  const [
    performance,
    setPerformance,
  ] =
    useState<
      PerformanceState | null
    >(null);

  const [
    emergency,
    setEmergency,
  ] =
    useState<
      EmergencyState | null
    >(null);

  const [
    trade,
    setTrade,
  ] =
    useState<
      TradeExecutionState | null
    >(null);


  // =====================================
  // SOCKET
  // =====================================

  useEffect(() => {

    socket.on(
      'market-data',
      (data) => {
        setMarket(data);
      },
    );

    socket.on(
      'ai-analysis',
      (data) => {
        setAi(data);
      },
    );

    socket.on(
      'risk-analysis',
      (data) => {
        setRisk(data);
      },
    );

    socket.on(
      'performance-update',
      (data) => {
        setPerformance(data);
      },
    );

    socket.on(
      'trade-execution',
      (data) => {
        setTrade(data);
      },
    );

    socket.on(
      'emergency-state',
      (data) => {
        setEmergency(data);
      },
    );

    return () => {
      socket.removeAllListeners();
    };

  }, []);


  return (
    <AuthGuard>

      <main className="min-h-screen bg-black text-white overflow-hidden">

        {/* BACKGROUND */}
        <div className="fixed inset-0">

          <div className="absolute top-[-300px] left-[-300px] w-[700px] h-[700px] rounded-full bg-yellow-500/10 blur-3xl" />

          <div className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-3xl" />

        </div>


        {/* NAVBAR */}
        <nav className="relative z-20 border-b border-white/10 backdrop-blur-3xl">

          <div className="max-w-[1800px] mx-auto h-24 flex items-center justify-between px-10">

            <div>

              <div className="text-4xl font-black tracking-tight">
                ALBI
              </div>

              <div className="text-zinc-500 text-sm mt-1">
                Autonomous Institutional Gold Intelligence
              </div>

            </div>

            <div className="flex items-center gap-4">

              <StatusPill
                label={
                  emergency?.frozen
                    ? 'FROZEN'
                    : 'LIVE'
                }
                active={
                  !emergency?.frozen
                }
              />

              <StatusPill
                label={
                  ai?.approved
                    ? 'AI APPROVED'
                    : 'AI BLOCKED'
                }
                active={
                  ai?.approved
                }
              />

            </div>

          </div>

        </nav>


        {/* CONTENT */}
        <section className="relative z-10 max-w-[1800px] mx-auto p-10">

          {/* HERO GRID */}
          <div className="grid grid-cols-5 gap-6">

            <MetricCard
              title="Balance"
              value={`$${market?.balance?.toFixed(2) || '0'}`}
              icon={<DollarSign size={22} />}
            />

            <MetricCard
              title="Equity"
              value={`$${market?.equity?.toFixed(2) || '0'}`}
              icon={<TrendingUp size={22} />}
            />

            <MetricCard
              title="Confidence"
              value={`${ai?.confidence || 0}%`}
              icon={<Brain size={22} />}
            />

            <MetricCard
              title="Risk Score"
              value={`${risk?.score || 0}`}
              icon={<Shield size={22} />}
            />

            <MetricCard
              title="Winrate"
              value={`${performance?.winrate || 0}%`}
              icon={<Target size={22} />}
            />

          </div>


          {/* CHART + AI */}
          <div className="grid grid-cols-3 gap-6 mt-6">

            {/* CHART */}
            <GlassCard className="col-span-2 p-0 overflow-hidden">

              <div className="p-6 border-b border-white/10 flex items-center justify-between">

                <div>

                  <div className="text-zinc-500 text-sm">
                    LIVE MARKET
                  </div>

                  <div className="text-3xl font-bold mt-1">
                    {market?.symbol || 'XAUUSD'}
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <MiniBadge
                    label={
                      market?.session || '-'
                    }
                  />

                  <MiniBadge
                    label={
                      market?.trend || '-'
                    }
                  />

                </div>

              </div>

              <div className="h-[700px]">

                <AdvancedRealTimeChart
                  theme="dark"
                  autosize
                  symbol="OANDA:XAUUSD"
                />

              </div>

            </GlassCard>


            {/* AI PANEL */}
            <GlassCard className="p-7">

              <div className="flex items-center gap-3">

                <Brain />

                <div>

                  <div className="text-zinc-500 text-sm">
                    AI ORCHESTRATION
                  </div>

                  <div className="text-2xl font-bold mt-1">
                    {ai?.signal || 'NO SIGNAL'}
                  </div>

                </div>

              </div>

              <div className="space-y-5 mt-8">

                <Info
                  label="Regime"
                  value={ai?.regime}
                />

                <Info
                  label="Strategy"
                  value={ai?.strategy}
                />

                <Info
                  label="Macro Bias"
                  value={ai?.macro_bias}
                />

                <Info
                  label="Best Strategy"
                  value={ai?.best_strategy}
                />

                <Info
                  label="Expected PnL"
                  value={`$${ai?.expected_pnl || 0}`}
                />

                <Info
                  label="Expected Winrate"
                  value={`${ai?.expected_winrate || 0}%`}
                />

                <Info
                  label="Expected DD"
                  value={`${ai?.expected_drawdown || 0}`}
                />

                <Info
                  label="Risk Level"
                  value={risk?.riskLevel}
                />

              </div>

              <div className="mt-8">

                <div className="text-zinc-500 text-sm mb-3">
                  GPT INSTITUTIONAL REASONING
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-sm leading-7 text-zinc-300">
                  {ai?.analysis || 'Waiting AI analysis...'}
                </div>

              </div>

            </GlassCard>

          </div>


          {/* ANALYTICS */}
          <div className="grid grid-cols-4 gap-6 mt-6">

            <GlassCard className="p-6">

              <SectionTitle
                title="MARKET"
                icon={<Activity size={18} />}
              />

              <div className="space-y-4 mt-6">

                <Info
                  label="Spread"
                  value={market?.spread}
                />

                <Info
                  label="ATR"
                  value={market?.atr}
                />

                <Info
                  label="RSI"
                  value={market?.rsi}
                />

                <Info
                  label="EMA20"
                  value={market?.ema20}
                />

                <Info
                  label="EMA50"
                  value={market?.ema50}
                />

                <Info
                  label="EMA200"
                  value={market?.ema200}
                />

              </div>

            </GlassCard>


            <GlassCard className="p-6">

              <SectionTitle
                title="RISK ENGINE"
                icon={<Shield size={18} />}
              />

              <div className="space-y-4 mt-6">

                <Info
                  label="Approval"
                  value={
                    risk?.approved
                      ? 'APPROVED'
                      : 'REJECTED'
                  }
                />

                <Info
                  label="Reason"
                  value={risk?.reason}
                />

                <Info
                  label="Warnings"
                  value={
                    risk?.warnings?.join(', ')
                  }
                />

              </div>

            </GlassCard>


            <GlassCard className="p-6">

              <SectionTitle
                title="PERFORMANCE"
                icon={<BarChart3 size={18} />}
              />

              <div className="space-y-4 mt-6">

                <Info
                  label="Trades"
                  value={
                    performance?.totalTrades
                  }
                />

                <Info
                  label="Wins"
                  value={
                    performance?.wins
                  }
                />

                <Info
                  label="Losses"
                  value={
                    performance?.losses
                  }
                />

                <Info
                  label="Profit"
                  value={`$${performance?.totalProfit || 0}`}
                />

                <Info
                  label="Max DD"
                  value={`${performance?.maxDrawdown || 0}`}
                />

              </div>

            </GlassCard>


            <GlassCard className="p-6">

              <SectionTitle
                title="EXECUTION"
                icon={<Zap size={18} />}
              />

              <div className="space-y-4 mt-6">

                <Info
                  label="Last Ticket"
                  value={trade?.ticket}
                />

                <Info
                  label="Type"
                  value={trade?.type}
                />

                <Info
                  label="Lot"
                  value={trade?.lot}
                />

                <Info
                  label="Entry"
                  value={trade?.entryPrice}
                />

                <Info
                  label="SL"
                  value={trade?.stopLoss}
                />

                <Info
                  label="TP"
                  value={trade?.takeProfit}
                />

              </div>

            </GlassCard>

          </div>

        </section>

      </main>

    </AuthGuard>
  );
}


// =========================================
// COMPONENTS
// =========================================

function GlassCard({
  children,
  className,
}: any) {

  return (
    <motion.div

      whileHover={{
        y: -4,
      }}

      className={`
      bg-white/[0.03]
      border
      border-white/10
      rounded-[32px]
      backdrop-blur-3xl
      shadow-2xl
      ${className}
      `}
    >
      {children}
    </motion.div>
  );
}


function MetricCard({
  title,
  value,
  icon,
}: any) {

  return (
    <GlassCard className="p-6">

      <div className="flex items-center justify-between">

        <div className="text-zinc-500 text-sm">
          {title}
        </div>

        <div className="text-zinc-400">
          {icon}
        </div>

      </div>

      <div className="text-4xl font-black mt-5 tracking-tight">
        {value}
      </div>

    </GlassCard>
  );
}


function Info({
  label,
  value,
}: any) {

  return (
    <div>

      <div className="text-zinc-500 text-xs uppercase tracking-wider">
        {label}
      </div>

      <div className="text-lg font-semibold mt-1 break-words">
        {value || '-'}
      </div>

    </div>
  );
}


function SectionTitle({
  title,
  icon,
}: any) {

  return (
    <div className="flex items-center gap-2">

      {icon}

      <div className="font-bold tracking-wide">
        {title}
      </div>

    </div>
  );
}


function StatusPill({
  label,
  active,
}: any) {

  return (
    <div
      className={`
      px-5 py-3 rounded-full text-sm font-semibold
      ${
        active
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-red-500/20 text-red-400 border border-red-500/30'
      }
      `}
    >
      {label}
    </div>
  );
}


function MiniBadge({
  label,
}: any) {

  return (
    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
      {label}
    </div>
  );
}