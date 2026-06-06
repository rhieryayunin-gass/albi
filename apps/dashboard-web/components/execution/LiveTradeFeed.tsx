"use client";

import {
  useEffect,
  useState,
} from "react";

import { socket }
from "@/websocket/socket";

import SectionCard
from "../shared/SectionCard";

export default function LiveTradeFeed() {

  const [
    trades,
    setTrades,
  ] = useState<any[]>([]);

  useEffect(() => {

    socket.on(
      "execution.opened",
      (data) => {

        setTrades(
          (prev) => [
            data,
            ...prev,
          ]
        );
      }
    );

    return () => {
      socket.off(
        "execution.opened"
      );
    };

  }, []);

  return (
    <SectionCard
      title="Live Trade Feed"
    >
      <div
        className="
        space-y-3
        "
      >

        {trades.length === 0 &&
          (
            <div>
              Waiting trade...
            </div>
          )}

        {trades.map(
          (
            trade,
            index
          ) => (
            <div
              key={index}
              className="
              border
              border-slate-200
              rounded-xl
              p-3
              "
            >
              <div
                className="
                font-semibold
                "
              >
                {
                  trade.signal
                }
              </div>

              <div
                className="
                text-sm
                text-slate-500
                "
              >
                {
                  trade.strategy
                }
              </div>
            </div>
          )
        )}

      </div>
    </SectionCard>
  );
}