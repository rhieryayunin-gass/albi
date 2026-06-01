'use client';

import {
  useEffect,
  useState,
} from 'react';

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
  Brain,
  Shield,
  Newspaper,
  Activity,
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  AlertTriangle,
  Sparkles,
  Clock3,
  Cpu,
  CandlestickChart,
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


  // ====================================
  // SOCKETS
  // ====================================

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


  const growth =
    market?.dailyGrowth || 0;

  const positive =
    growth >= 0;


  return (
    <AuthGuard>

      <main className="min-h-screen bg-[#f6f8fc] text-[#111827]">

        {/* BACKGROUND */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-[-250px] left-[-250px] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl" />

          <div className="absolute bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-yellow-200/30 rounded-full blur-3xl" />

        </div>


        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-3xl border-b border-zinc-200">

          <div className="max-w-[1800px] mx-auto px-5 lg:px-10 h-20 flex items-center justify-between">

            <div>

              <div className="text-3xl lg:text-4xl font-black tracking-tight">
                ALBI
              </div>

              <div className="text-zinc-500 text-xs lg:text-sm mt-1">
                Adaptive Learning & Behavioral Intelligence
              </div>

            </div>


            <div className="flex items-center gap-3">

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
        <section className="relative z-10 max-w-[1800px] mx-auto px-4 lg:px-10 py-6 lg:py-10">

          {/* HERO */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* PRICE */}
            <Card className="xl:col-span-2">

              <div className="flex items-start justify-between">

                <div>

                  <div className="text-zinc-500 text-sm">
                    LIVE XAUUSD
                  </div>

                  <div className="text-5xl lg:text-7xl font-black mt-4 tracking-tight">

                    {market?.bid
                      ?.toFixed(2) || '0.00'}

                  </div>

                  <div className="mt-5 flex items-center gap-3">

                    <div
                      className={`
                      flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold
                      ${
                        positive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }
                      `}
                    >

                      {
                        positive
                          ? <TrendingUp size={18} />
                          : <TrendingDown size={18} />
                      }

                      {growth}%

                    </div>

                    <MiniInfo
                      label="Spread"
                      value={market?.spread}
                    />

                    <MiniInfo
                      label="Session"
                      value={market?.session}
                    />

                    <MiniInfo
                      label="Trend"
                      value={market?.trend}
                    />

                  </div>

                </div>


                <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-3xl bg-yellow-100">

                  <CandlestickChart
                    size={42}
                    className="text-yellow-600"
                  />

                </div>

              </div>

              <UpdateTime
                text="Dashboard update every 5 seconds"
              />

            </Card>


            {/* QUICK STATS */}
            <div className="grid grid-cols-2 gap-4">

              <SmallCard
                title="Balance"
                value={`$${market?.balance || 0}`}
                icon={<DollarSign size={18} />}
              />

              <SmallCard
                title="Equity"
                value={`$${market?.equity || 0}`}
                icon={<Activity size={18} />}
              />

              <SmallCard
                title="Confidence"
                value={`${ai?.confidence || 0}%`}
                icon={<Brain size={18} />}
              />

              <SmallCard
                title="Risk Score"
                value={`${risk?.score || 0}`}
                icon={<Shield size={18} />}
              />

            </div>

          </div>


          {/* MAIN GRID */}
          <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6 mt-6">


            {/* AI ANALYSIS */}
            <Card className="2xl:col-span-4">

              <SectionHeader
                title="AI ANALYSIS"
                subtitle="Updated every 10 minutes"
                icon={<Brain size={20} />}
              />

              <div className="grid grid-cols-2 gap-5 mt-8">

                <Info
                  label="Signal"
                  value={ai?.signal}
                />

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
                  label="Expected PnL"
                  value={`$${ai?.expected_pnl || 0}`}
                />

                <Info
                  label="Winrate"
                  value={`${ai?.expected_winrate || 0}%`}
                />

              </div>

              <div className="mt-8">

                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
                  Institutional Reasoning
                </div>

                <div className="bg-[#f8fafc] border border-zinc-200 rounded-3xl p-5 leading-7 text-sm text-zinc-700">
                  {ai?.analysis || 'Waiting AI analysis...'}
                </div>

              </div>

              <UpdateTime
                text={
                  ai?.updatedAt ||
                  'Last AI analysis waiting...'
                }
              />

            </Card>


            {/* MONTE CARLO */}
            <Card className="2xl:col-span-4">

              <SectionHeader
                title="MONTE CARLO"
                subtitle="Recalculated every 30 minutes"
                icon={<Cpu size={20} />}
              />

              <div className="space-y-6 mt-8">

                <MonteCarloCard
                  label="Expected Drawdown"
                  value={`${ai?.expected_drawdown || 0}%`}
                />

                <MonteCarloCard
                  label="Best Strategy"
                  value={ai?.best_strategy}
                />

                <MonteCarloCard
                  label="Risk Level"
                  value={risk?.riskLevel}
                />

                <MonteCarloCard
                  label="Warnings"
                  value={
                    risk?.warnings?.join(', ') ||
                    '-'
                  }
                />

                <MonteCarloCard
                  label="Approval"
                  value={
                    risk?.approved
                      ? 'APPROVED'
                      : 'REJECTED'
                  }
                />

              </div>

              <UpdateTime
                text={
                  risk?.updatedAt ||
                  'Monte Carlo updated 30 minutes interval'
                }
              />

            </Card>


            {/* FUNDAMENTAL */}
            <Card className="2xl:col-span-4">

              <SectionHeader
                title="FUNDAMENTAL ANALYSIS"
                subtitle="Updated every 1 hour"
                icon={<Newspaper size={20} />}
              />

              <div className="space-y-4 mt-8">

                <NewsItem
                  title="FED rate cut expectations continue supporting gold strength."
                  time="01 Jun 2026 • 22:00"
                  latest
                />

                <NewsItem
                  title="Institutional inflow detected during London session."
                  time="01 Jun 2026 • 21:00"
                />

                <NewsItem
                  title="US Dollar weakness increases bullish probability for XAUUSD."
                  time="01 Jun 2026 • 20:00"
                />

                <NewsItem
                  title="Geopolitical uncertainty maintains safe haven demand."
                  time="01 Jun 2026 • 19:00"
                />

              </div>

              <UpdateTime
                text="Fundamental engine refresh every 1 hour"
              />

            </Card>

          </div>


          {/* LOWER GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">


            {/* MARKET */}
            <Card>

              <SectionHeader
                title="MARKET ENGINE"
                subtitle="Realtime market telemetry"
                icon={<Activity size={20} />}
              />

              <div className="space-y-5 mt-8">

                <Info label="ATR" value={market?.atr} />
                <Info label="RSI" value={market?.rsi} />
                <Info label="EMA20" value={market?.ema20} />
                <Info label="EMA50" value={market?.ema50} />
                <Info label="EMA200" value={market?.ema200} />

              </div>

            </Card>


            {/* PERFORMANCE */}
            <Card>

              <SectionHeader
                title="PERFORMANCE"
                subtitle="Realtime portfolio metrics"
                icon={<Target size={20} />}
              />

              <div className="space-y-5 mt-8">

                <Info label="Trades" value={performance?.totalTrades} />
                <Info label="Wins" value={performance?.wins} />
                <Info label="Losses" value={performance?.losses} />
                <Info label="Profit" value={`$${performance?.totalProfit || 0}`} />
                <Info label="Max DD" value={`${performance?.maxDrawdown || 0}%`} />

              </div>

            </Card>


            {/* EXECUTION */}
            <Card>

              <SectionHeader
                title="EXECUTION"
                subtitle="Latest MT5 execution"
                icon={<Sparkles size={20} />}
              />

              <div className="space-y-5 mt-8">

                <Info label="Ticket" value={trade?.ticket} />
                <Info label="Type" value={trade?.type} />
                <Info label="Lot" value={trade?.lot} />
                <Info label="Entry" value={trade?.entryPrice} />
                <Info label="SL" value={trade?.stopLoss} />
                <Info label="TP" value={trade?.takeProfit} />

              </div>

            </Card>

          </div>

        </section>

      </main>

    </AuthGuard>
  );
}


// ====================================
// COMPONENTS
// ====================================

function Card({
  children,
  className,
}: any) {

  return (
    <div
      className={`
      bg-white
      border border-zinc-200
      rounded-[32px]
      shadow-[0_10px_40px_rgba(0,0,0,0.04)]
      p-6 lg:p-8
      ${className}
      `}
    >
      {children}
    </div>
  );
}


function SmallCard({
  title,
  value,
  icon,
}: any) {

  return (
    <Card>

      <div className="flex items-center justify-between">

        <div className="text-zinc-500 text-sm">
          {title}
        </div>

        <div className="text-zinc-400">
          {icon}
        </div>

      </div>

      <div className="text-2xl lg:text-3xl font-black mt-5">
        {value}
      </div>

    </Card>
  );
}


function SectionHeader({
  title,
  subtitle,
  icon,
}: any) {

  return (
    <div className="flex items-start justify-between">

      <div>

        <div className="flex items-center gap-2 font-bold text-lg">

          {icon}

          {title}

        </div>

        <div className="text-zinc-500 text-sm mt-2">
          {subtitle}
        </div>

      </div>

    </div>
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

      <div className="text-lg font-semibold mt-2">
        {value || '-'}
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
      flex items-center gap-2
      px-4 py-2 rounded-2xl text-sm font-semibold
      ${
        active
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }
      `}
    >

      <div
        className={`
        w-2.5 h-2.5 rounded-full animate-pulse
        ${
          active
            ? 'bg-green-500'
            : 'bg-red-500'
        }
        `}
      />

      {label}

    </div>
  );
}


function MiniInfo({
  label,
  value,
}: any) {

  return (
    <div className="px-4 py-2 rounded-2xl bg-white border border-zinc-200">

      <div className="text-zinc-400 text-xs">
        {label}
      </div>

      <div className="font-semibold text-sm mt-1">
        {value}
      </div>

    </div>
  );
}


function MonteCarloCard({
  label,
  value,
}: any) {

  return (
    <div className="bg-[#f8fafc] border border-zinc-200 rounded-3xl p-5">

      <div className="text-zinc-500 text-xs uppercase tracking-wider">
        {label}
      </div>

      <div className="font-bold text-xl mt-3">
        {value || '-'}
      </div>

    </div>
  );
}


function NewsItem({
  title,
  time,
  latest,
}: any) {

  return (
    <div
      className={`
      rounded-3xl border p-5
      ${
        latest
          ? 'bg-blue-50 border-blue-200'
          : 'bg-[#f8fafc] border-zinc-200'
      }
      `}
    >

      <div className="flex items-start justify-between gap-4">

        <div className="font-medium leading-7">
          {title}
        </div>

        {
          latest &&
          (
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold whitespace-nowrap">
              LATEST
            </div>
          )
        }

      </div>

      <div className="flex items-center gap-2 text-zinc-500 text-xs mt-4">

        <Clock3 size={13} />

        {time}

      </div>

    </div>
  );
}


function UpdateTime({
  text,
}: any) {

  return (
    <div className="mt-6 text-xs text-zinc-400">
      {text}
    </div>
  );
}
