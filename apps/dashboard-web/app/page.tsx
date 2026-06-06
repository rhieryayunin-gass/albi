"use client";

import { useEffect, useState } from "react";

import { socket } from "@/websocket/socket";

import { useAIStore } from "@/stores/ai.store";
import { useRiskStore } from "@/stores/risk.store";
import { useMarketStore } from "@/stores/market.store";
import { useExecutionStore } from "@/stores/execution.store";

import MarketOverview from "@/components/market/MarketOverview";
import AIAnalysisPanel from "@/components/ai/AIAnalysisPanel";
import RiskPanel from "@/components/risk/RiskPanel";
import PortfolioPanel from "@/components/portfolio/PortfolioPanel";
import MonteCarloPanel from "@/components/montecarlo/MonteCarloPanel";
import MacroPanel from "@/components/macro/MacroPanel";
import AlertPanel from "@/components/alerts/AlertPanel";
import EmergencyPanel from "@/components/risk/EmergencyPanel";

import PriceChartPanel from "@/components/chart/PriceChartPanel";
import ConfidenceChart from "@/components/ai/ConfidenceChart";
import LiveTradeFeed from "@/components/execution/LiveTradeFeed";

export default function HomePage() {
  const { setAnalysis } = useAIStore();
  const { setRisk } = useRiskStore();
  const { setMarket } = useMarketStore();
  const { setPortfolio } = useExecutionStore();

  const [connected, setConnected] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString("id-ID")
      );
    };

    updateClock();

    const interval = setInterval(
      updateClock,
      1000
    );

    return () =>
      clearInterval(interval);
  }, []);

  useEffect(() => {
    const onConnect = () => {
      setConnected(true);
    };

    const onDisconnect = () => {
      setConnected(false);
    };

    socket.on(
      "connect",
      onConnect
    );

    socket.on(
      "disconnect",
      onDisconnect
    );

    socket.on(
      "market.update",
      (data) => {
        setMarket(data);
      }
    );

    socket.on(
      "ai.analysis",
      (data) => {
        setAnalysis(data);
      }
    );

    socket.on(
      "risk.analysis",
      (data) => {
        setRisk(data);
      }
    );

    socket.on(
      "portfolio.update",
      (data) => {
        setPortfolio(data);
     }
    );

    return () => {
      socket.off(
        "connect",
        onConnect
      );

      socket.off(
        "disconnect",
        onDisconnect
      );

      socket.off(
        "market.update"
      );

      socket.off(
        "ai.analysis"
      );

      socket.off(
        "risk.analysis"
      );

      socket.off(
        "portfolio.update"
      );
    };
  }, [
    setAnalysis,
    setMarket,
    setRisk,
    setPortfolio,
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}

      <header
        className="
        sticky
        top-0
        z-50
        bg-white
        border-b
        border-slate-200
        "
      >
        <div
          className="
          max-w-[1800px]
          mx-auto
          px-6
          py-4
          flex
          justify-between
          items-center
          "
        >
          <div>
            <h1
              className="
              text-3xl
              font-bold
              text-slate-900
              "
            >
              ALBI
            </h1>

            <p
              className="
              text-sm
              text-slate-500
              "
            >
              Autonomous Learning Broker Intelligence
            </p>
          </div>

          <div
            className="
            flex
            items-center
            gap-3
            "
          >
            <StatusBadge
              label="WS"
              online={connected}
            />

            <StatusBadge
              label="AI"
              online={true}
            />

            <StatusBadge
              label="RISK"
              online={true}
            />

            <div
              className="
              bg-white
              border
              border-slate-200
              rounded-xl
              px-4
              py-2
              "
            >
              <div
                className="
                text-xs
                text-slate-500
                "
              >
                LIVE
              </div>

              <div
                className="
                text-sm
                font-semibold
                "
              >
                {time}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* DASHBOARD */}

      <main
        className="
        max-w-[1800px]
        mx-auto
        p-6
        "
      >
        <div
          className="
          grid
          grid-cols-12
          gap-5
          "
        >
          {/* MARKET */}

          <div className="col-span-12">
            <MarketOverview />
          </div>

          {/* CHART */}

          <div
            className="
            col-span-12
            lg:col-span-8
            "
          >
            <PriceChartPanel />
          </div>

          {/* CONFIDENCE */}

          <div
            className="
            col-span-12
            lg:col-span-4
            "
          >
            <ConfidenceChart />
          </div>

          {/* AI */}

          <div
            className="
            col-span-12
            lg:col-span-4
            "
          >
            <AIAnalysisPanel />
          </div>

          {/* RISK */}

          <div
            className="
            col-span-12
            lg:col-span-4
            "
          >
            <RiskPanel />
          </div>

          {/* PORTFOLIO */}

          <div
            className="
            col-span-12
            lg:col-span-4
            "
          >
            <PortfolioPanel />
          </div>

          {/* MONTE CARLO */}

          <div
            className="
            col-span-12
            lg:col-span-4
            "
          >
            <MonteCarloPanel />
          </div>

          {/* MACRO */}

          <div
            className="
            col-span-12
            lg:col-span-4
            "
          >
            <MacroPanel />
          </div>

          {/* ALERT */}

          <div
            className="
            col-span-12
            lg:col-span-4
            "
          >
            <AlertPanel />
          </div>

          {/* EMERGENCY */}

          <div className="col-span-12">
            <EmergencyPanel />
          </div>

          {/* LIVE TRADE FEED */}

          <div className="col-span-12">
            <LiveTradeFeed />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({
  label,
  online,
}: {
  label: string;
  online: boolean;
}) {
  return (
    <div
      className={`
      px-4
      py-2
      rounded-xl
      border
      text-sm
      font-medium
      ${
        online
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-red-50 border-red-200 text-red-700"
      }
      `}
    >
      {online ? "🟢" : "🔴"} {label}
    </div>
  );
}