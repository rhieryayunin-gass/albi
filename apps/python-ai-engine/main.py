from fastapi import FastAPI

from pydantic import BaseModel

import random


app = FastAPI()


class MarketData(BaseModel):
    symbol: str

    bid: float

    ask: float

    spread: float

    balance: float

    equity: float


# =========================
# AI MEMORY
# =========================

ai_memory = {
    "wins": 0,
    "losses": 0,
    "totalProfit": 0,
    "totalTrades": 0,
}


# =========================
# HEALTH
# =========================

@app.get("/health")
def health():
    return {
        "success": True,
        "service": "python-ai-engine",
    }


# =========================
# PERFORMANCE
# =========================

@app.get("/performance")
def performance():
    total = (
        ai_memory["wins"]
        + ai_memory["losses"]
    )

    winrate = 0

    if total > 0:
        winrate = round(
            (
                ai_memory["wins"]
                / total
            )
            * 100,
            2,
        )

    return {
        "winrate": winrate,
        "wins": ai_memory["wins"],
        "losses": ai_memory["losses"],
        "totalProfit": round(
            ai_memory["totalProfit"],
            2,
        ),
    }


# =========================
# AI ANALYZE
# =========================

@app.post("/analyze")
def analyze(data: MarketData):
    regimes = [
        "TRENDING",
        "RANGING",
        "BREAKOUT",
        "REVERSAL",
        "VOLATILE",
    ]

    strategies = [
        "SNIPER",
        "AGGRESSIVE",
        "OPPORTUNIST",
        "DEFENSIVE",
    ]

    regime = random.choice(regimes)

    strategy = random.choice(strategies)

    confidence = random.randint(86, 99)

    signal = (
        "BUY"
        if random.random() > 0.5
        else "SELL"
    )

    approved = True

    # fake pnl simulation
    simulated_pnl = round(
        random.uniform(-10, 20),
        2,
    )

    ai_memory["totalTrades"] += 1

    ai_memory["totalProfit"] += (
        simulated_pnl
    )

    if simulated_pnl >= 0:
        ai_memory["wins"] += 1
    else:
        ai_memory["losses"] += 1

    return {
        "signal": signal,

        "confidence": confidence,

        "regime": regime,

        "strategy": strategy,

        "approved": approved,

        "reason": None,

        "ai_engine": "python",

        "simulated_pnl": simulated_pnl,
    }