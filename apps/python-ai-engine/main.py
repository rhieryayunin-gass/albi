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


@app.get("/health")
def health():
    return {
        "success": True,
        "service": "python-ai-engine",
    }


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

    confidence = random.randint(80, 99)

    signal = (
        "BUY"
        if random.random() > 0.5
        else "SELL"
    )

    return {
        "signal": signal,

        "confidence": confidence,

        "regime": regime,

        "strategy": strategy,

        "approved": confidence >= 85,

        "reason": None,

        "ai_engine": "python",
    }