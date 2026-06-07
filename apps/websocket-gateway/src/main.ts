import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.onAny((event, payload) => {
    io.emit(event, payload);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(4001, () => {
  console.log("Websocket Gateway running on port 4001");
});