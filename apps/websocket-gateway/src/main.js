"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
