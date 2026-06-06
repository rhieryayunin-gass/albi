"use client";

import { io } from "socket.io-client";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL!;

export const socket = io(WS_URL, {
  transports: ["websocket"],
});

if (process.env.NODE_ENV === "development") {
  socket.on("connect", () => {
    console.log(
      "✅ SOCKET CONNECTED",
      socket.id
    );
  });

  socket.on("disconnect", () => {
    console.log(
      "❌ SOCKET DISCONNECTED"
    );
  });

  socket.on("connect_error", (err) => {
    console.error(
      "❌ SOCKET ERROR",
      err
    );
  });
}