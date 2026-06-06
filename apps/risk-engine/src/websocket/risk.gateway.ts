import {
  WebSocketGateway,
  WebSocketServer
}
from "@nestjs/websockets";

import { Server }
from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})

export class RiskGateway {

  @WebSocketServer()
  server!: Server;

  broadcastRisk(
    payload: any
  ) {

    this.server.emit(
      "risk.analysis",
      payload
    );
  }
}