import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server }
from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {

  @WebSocketServer()
  server!: Server;


  // ======================================
  // MARKET DATA
  // ======================================

  emitMarketData(
    data: any,
  ) {
    this.server.emit(
      'market-data',
      {
        symbol:
        data.symbol,

        bid:
        data.bid,

        ask:
        data.ask,

        spread:
        data.spread,

        balance:
        data.balance,

        equity:
        data.equity,

        atr:
        data.atr,

        rsi:
        data.rsi,

        ema20:
        data.ema20,

        ema50:
        data.ema50,

        ema200:
        data.ema200,

        trend:
        data.trend,

        session:
        data.session,

        positions:
        data.positions,

        timestamp:
        new Date(),
      },
    );
  }


  // ======================================
  // AI ANALYSIS
  // ======================================

  emitAiAnalysis(
    data: any,
  ) {
    this.server.emit(
      'ai-analysis',
      {
        signal:
        data.signal,

        confidence:
        data.confidence,

        regime:
        data.regime,

        strategy:
        data.strategy,

        approved:
        data.approved,

        reason:
        data.reason,

        analysis:
        data.analysis,

        macro_bias:
        data.macro_bias,

        expected_pnl:
        data.expected_pnl,

        expected_winrate:
        data.expected_winrate,

        expected_drawdown:
        data.expected_drawdown,

        best_strategy:
        data.best_strategy,

        ai_engine:
        data.ai_engine,

        session:
        data.session,

        trend:
        data.trend,

        atr:
        data.atr,

        rsi:
        data.rsi,

        spread:
        data.spread,

        timestamp:
        new Date(),
      },
    );
  }


  // ======================================
  // RISK ENGINE
  // ======================================

  emitRiskAnalysis(
    data: any,
  ) {
    this.server.emit(
      'risk-analysis',
      {
        approved:
        data.approved,

        score:
        data.score,

        riskLevel:
        data.riskLevel,

        warnings:
        data.warnings,

        reason:
        data.reason,

        timestamp:
        new Date(),
      },
    );
  }


  // ======================================
  // TRADE EXECUTION
  // ======================================

  emitTradeExecution(
    data: any,
  ) {
    this.server.emit(
      'trade-execution',
      {
        ticket:
        data.ticket,

        symbol:
        data.symbol,

        type:
        data.type,

        lot:
        data.lot,

        entryPrice:
        data.entryPrice,

        stopLoss:
        data.stopLoss,

        takeProfit:
        data.takeProfit,

        timestamp:
        new Date(),
      },
    );
  }


  // ======================================
  // PERFORMANCE
  // ======================================

  emitPerformance(
    data: any,
  ) {
    this.server.emit(
      'performance-update',
      {
        totalTrades:
        data.totalTrades,

        wins:
        data.wins,

        losses:
        data.losses,

        totalProfit:
        data.totalProfit,

        maxDrawdown:
        data.maxDrawdown,

        winrate:
        data.winrate,

        timestamp:
        new Date(),
      },
    );
  }


  // ======================================
  // EMERGENCY
  // ======================================

  emitEmergencyState(
    data: any,
  ) {
    this.server.emit(
      'emergency-state',
      {
        frozen:
        data.frozen,

        reason:
        data.reason,

        timestamp:
        new Date(),
      },
    );
  }
}