from fastapi import FastAPI

from pydantic import BaseModel

from dotenv import load_dotenv

from openai import OpenAI

from typing import List

import statistics

import requests

import random

import os


# =========================================
# LOAD ENV
# =========================================

load_dotenv()


# =========================================
# OPENAI CLIENT
# =========================================

client = OpenAI(
    api_key=os.getenv(
        "OPENAI_API_KEY"
    )
)


# =========================================
# FASTAPI
# =========================================

app = FastAPI()


# =========================================
# DATA MODELS
# =========================================

class Candle(BaseModel):
    open: float

    high: float

    low: float

    close: float

    volume: int


class Position(BaseModel):
    ticket: int

    type: str

    profit: float

    volume: float

    entry: float


class MarketData(BaseModel):
    symbol: str

    bid: float

    ask: float

    spread: float

    balance: float

    equity: float

    atr: float

    rsi: float

    ema20: float

    ema50: float

    ema200: float

    trend: str

    session: str

    m5: List[Candle]

    m15: List[Candle]

    h1: List[Candle]

    h4: List[Candle]

    positions: List[Position]


# =========================================
# REAL AI MEMORY
# =========================================

ai_memory = {
    "wins": 0,

    "losses": 0,

    "totalProfit": 0,

    "totalTrades": 0,

    "maxDrawdown": 0,

    "equityCurve": [],
}


# =========================================
# HEALTH
# =========================================

@app.get("/health")
def health():
    return {
        "success": True,

        "service":
        "ALBI AI ENGINE",
    }


# =========================================
# PERFORMANCE
# =========================================

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
            ) * 100,
            2,
        )

    return {
        "winrate": winrate,

        "wins":
        ai_memory["wins"],

        "losses":
        ai_memory["losses"],

        "totalProfit":
        round(
            ai_memory[
                "totalProfit"
            ],
            2,
        ),

        "totalTrades":
        ai_memory[
            "totalTrades"
        ],

        "maxDrawdown":
        round(
            ai_memory[
                "maxDrawdown"
            ],
            2,
        ),
    }


# =========================================
# VOLATILITY
# =========================================

def calculate_volatility(
    candles
):
    closes = [
        c.close
        for c in candles
    ]

    if len(closes) < 2:
        return 0

    return round(
        statistics.stdev(
            closes
        ),
        2,
    )


# =========================================
# MARKET REGIME
# =========================================

def detect_market_regime(
    data: MarketData
):
    if (
        data.ema20 >
        data.ema50 >
        data.ema200
    ):
        return "TRENDING_BULLISH"

    if (
        data.ema20 <
        data.ema50 <
        data.ema200
    ):
        return "TRENDING_BEARISH"

    if data.atr > 25:
        return "VOLATILE"

    return "RANGING"


# =========================================
# FUNDAMENTAL ANALYSIS
# =========================================

def get_macro_sentiment():
    try:
        response = requests.get(
            "https://api.gold-api.com/price/XAU"
        )

        data = response.json()

        price = data.get(
            "price",
            0,
        )

        if price > 3300:
            return {
                "macro_bias":
                "BULLISH_GOLD",

                "macro_score":
                15,
            }

        return {
            "macro_bias":
            "BEARISH_GOLD",

            "macro_score":
            -10,
        }

    except:
        return {
            "macro_bias":
            "UNKNOWN",

            "macro_score":
            0,
        }


# =========================================
# STRATEGY REPLAY ENGINE
# =========================================

def replay_strategy(
    candles,
    strategy_type,
):
    pnl = 0

    wins = 0

    losses = 0

    trades = 0

    equity = 0

    peak_equity = 0

    max_dd = 0

    for i in range(
        20,
        len(candles) - 1
    ):
        current = candles[i]

        next_candle = candles[i + 1]

        closes = [
            c.close
            for c
            in candles[
                i - 20:i
            ]
        ]

        ema_fast = sum(
                closes[-5:]
            ) / 5

        ema_slow = sum(
                closes
            ) / len(closes)

        signal = "NO_TRADE"

        # =================================
        # SNIPER
        # =================================

        if (
            strategy_type ==
            "SNIPER"
        ):
            if (
                ema_fast >
                ema_slow
                and current.close >
                current.open
            ):
                signal = "BUY"

            elif (
                ema_fast <
                ema_slow
                and current.close <
                current.open
            ):
                signal = "SELL"

        # =================================
        # AGGRESSIVE
        # =================================

        elif (
            strategy_type ==
            "AGGRESSIVE"
        ):
            if (
                current.close >
                ema_fast
            ):
                signal = "BUY"

            else:
                signal = "SELL"

        trade_pnl = 0

        if signal == "BUY":
            trade_pnl = (
                next_candle.close
                - current.close
            )

        if signal == "SELL":
            trade_pnl = (
                current.close
                - next_candle.close
            )

        if signal != "NO_TRADE":
            trades += 1

            pnl += trade_pnl

            equity += trade_pnl

            if trade_pnl >= 0:
                wins += 1
            else:
                losses += 1

            if (
                equity >
                peak_equity
            ):
                peak_equity = equity

            dd = (
                peak_equity
                - equity
            )

            if dd > max_dd:
                max_dd = dd

    winrate = 0

    if trades > 0:
        winrate = round(
            (
                wins
                / trades
            ) * 100,
            2,
        )

    return {
        "strategy":
        strategy_type,

        "trades":
        trades,

        "wins":
        wins,

        "losses":
        losses,

        "winrate":
        winrate,

        "pnl":
        round(pnl, 2),

        "max_drawdown":
        round(max_dd, 2),
    }


# =========================================
# MONTE CARLO ENGINE
# =========================================

def monte_carlo_simulation(
    data: MarketData
):
    simulations = []

    strategy_pool = [
        "SNIPER",

        "AGGRESSIVE",
    ]

    for _ in range(50):
        strategy = random.choice(
                strategy_pool
            )

        replay = replay_strategy(
                data.m15,
                strategy,
            )

        simulations.append(
            replay
        )

    avg_pnl = round(
        sum(
            [
                s["pnl"]
                for s
                in simulations
            ]
        )
        / len(simulations),
        2,
    )

    avg_winrate = round(
        sum(
            [
                s["winrate"]
                for s
                in simulations
            ]
        )
        / len(simulations),
        2,
    )

    avg_dd = round(
        sum(
            [
                s[
                    "max_drawdown"
                ]
                for s
                in simulations
            ]
        )
        / len(simulations),
        2,
    )

    risk_score = 0

    if avg_winrate >= 65:
        risk_score += 25

    elif avg_winrate >= 55:
        risk_score += 15

    else:
        risk_score -= 20

    if avg_dd > 50:
        risk_score -= 20

    if avg_pnl > 0:
        risk_score += 10

    best_strategy = max(
            simulations,
            key=lambda x:
            x["pnl"]
        )

    return {
        "expected_pnl":
        avg_pnl,

        "expected_winrate":
        avg_winrate,

        "expected_drawdown":
        avg_dd,

        "risk_score":
        risk_score,

        "best_strategy":
        best_strategy[
            "strategy"
        ],
    }


# =========================================
# CONFIDENCE ENGINE
# =========================================

def calculate_confidence(
    data: MarketData,
    regime: str,
):
    score = 0

    # =====================================
    # TREND ALIGNMENT
    # =====================================

    if (
        regime ==
        "TRENDING_BULLISH"
    ):
        score += 25

    if (
        regime ==
        "TRENDING_BEARISH"
    ):
        score += 25

    # =====================================
    # RSI
    # =====================================

    if (
        45 <= data.rsi <= 65
    ):
        score += 15

    if data.rsi < 30:
        score += 5

    if data.rsi > 70:
        score -= 10

    # =====================================
    # SPREAD
    # =====================================

    if data.spread <= 25:
        score += 15

    if data.spread > 40:
        score -= 20

    # =====================================
    # SESSION
    # =====================================

    if (
        data.session ==
        "LONDON"
    ):
        score += 15

    if (
        data.session ==
        "NEW_YORK"
    ):
        score += 20

    # =====================================
    # VOLATILITY
    # =====================================

    volatility = (
        calculate_volatility(
            data.m15
        )
    )

    if volatility > 8:
        score += 10

    # =====================================
    # OPEN POSITIONS
    # =====================================

    if len(data.positions) > 0:
        score -= 15

    # =====================================
    # FUNDAMENTAL
    # =====================================

    macro = (
        get_macro_sentiment()
    )

    score += (
        macro["macro_score"]
    )

    # =====================================
    # MONTE CARLO
    # =====================================

    montecarlo = (
        monte_carlo_simulation(
            data
        )
    )

    score += (
        montecarlo[
            "risk_score"
        ]
    )

    return {
        "confidence":
        max(
            0,
            min(score, 100),
        ),

        "macro":
        macro,

        "montecarlo":
        montecarlo,
    }


# =========================================
# SIGNAL ENGINE
# =========================================

def determine_signal(
    data: MarketData,
    regime: str,
):
    if (
        regime ==
        "TRENDING_BULLISH"
        and data.rsi > 50
    ):
        return "BUY"

    if (
        regime ==
        "TRENDING_BEARISH"
        and data.rsi < 50
    ):
        return "SELL"

    return "NO_TRADE"


# =========================================
# STRATEGY ENGINE
# =========================================

def determine_strategy(
    confidence
):
    if confidence >= 90:
        return "SNIPER"

    if confidence >= 80:
        return "AGGRESSIVE"

    if confidence >= 70:
        return "OPPORTUNIST"

    return "DEFENSIVE"


# =========================================
# APPROVAL ENGINE
# =========================================

def determine_approval(
    confidence
):
    return confidence >= 80


# =========================================
# GPT ANALYSIS
# =========================================

def generate_gpt_analysis(
    data: MarketData,
    regime: str,
    signal: str,
    confidence: int,
):
    try:
        prompt = f"""
        You are ALBI, institutional gold trading AI spezialized in XAUUSD.

        Analyze XAUUSD market.

        Regime:
        {regime}

        Signal:
        {signal}

        Confidence:
        {confidence}

        Session:
        {data.session}

        RSI:
        {data.rsi}

        ATR:
        {data.atr}

        Spread:
        {data.spread}

        Give concise institutional reasoning.
        """

        response = (
            client.chat.completions.create(
                model="gpt-5-mini",

                messages=[
                    {
                        "role": "system",

                        "content":
                        "You are institutional gold trading AI.",
                    },
                    {
                        "role": "user",

                        "content":
                        prompt,
                    },
                ],

                temperature=0.2,

                max_completion_tokens=500,
            )
        )

        return (
            response
            .choices[0]
            .message
            .content
        )

    except Exception as e:
        return str(e)


# =========================================
# MEMORY ENGINE
# =========================================

def update_ai_memory(
    data: MarketData
):
    floating_pnl = sum(
        [
            p.profit
            for p
            in data.positions
        ]
    )

    ai_memory["totalTrades"] += 1

    ai_memory["totalProfit"] += (
        floating_pnl
    )

    ai_memory[
        "equityCurve"
    ].append(
        ai_memory[
            "totalProfit"
        ]
    )

    peak = max(
        ai_memory[
            "equityCurve"
        ]
    )

    dd = (
        peak
        - ai_memory[
            "totalProfit"
        ]
    )

    if (
        dd >
        ai_memory[
            "maxDrawdown"
        ]
    ):
        ai_memory[
            "maxDrawdown"
        ] = dd

    if floating_pnl >= 0:
        ai_memory["wins"] += 1
    else:
        ai_memory["losses"] += 1


# =========================================
# MAIN ANALYZE
# =========================================

@app.post("/analyze")
def analyze(
    data: MarketData
):
    regime = (
        detect_market_regime(
            data
        )
    )

    confidence_data = (
        calculate_confidence(
            data,
            regime,
        )
    )

    confidence = (
        confidence_data[
            "confidence"
        ]
    )

    signal = (
        determine_signal(
            data,
            regime,
        )
    )

    strategy = (
        determine_strategy(
            confidence
        )
    )

    approved = (
        determine_approval(
            confidence
        )
    )

    analysis = (
        generate_gpt_analysis(
            data,
            regime,
            signal,
            confidence,
        )
    )

    update_ai_memory(data)

    return {
        "signal":
        signal,

        "confidence":
        confidence,

        "regime":
        regime,

        "strategy":
        strategy,

        "approved":
        approved,

        "reason":
        (
            None
            if approved
            else "LOW_CONFIDENCE"
        ),

        "analysis":
        analysis,

        "macro_bias":
        confidence_data[
            "macro"
        ][
            "macro_bias"
        ],

        "expected_pnl":
        confidence_data[
            "montecarlo"
        ][
            "expected_pnl"
        ],

        "expected_winrate":
        confidence_data[
            "montecarlo"
        ][
            "expected_winrate"
        ],

        "expected_drawdown":
        confidence_data[
            "montecarlo"
        ][
            "expected_drawdown"
        ],

        "best_strategy":
        confidence_data[
            "montecarlo"
        ][
            "best_strategy"
        ],

        "ai_engine":
        "ALBI_GPT_INSTITUTIONAL",

        "session":
        data.session,

        "trend":
        data.trend,

        "atr":
        data.atr,

        "rsi":
        data.rsi,

        "spread":
        data.spread,
    }


