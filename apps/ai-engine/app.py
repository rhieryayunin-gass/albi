from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException

from models.market_model import MarketData

from engines.regime_engine import detect_regime
from engines.structure_engine import detect_structure
from engines.liquidity_engine import analyze_liquidity
from engines.volatility_engine import analyze_volatility
from engines.momentum_engine import analyze_momentum
from engines.macro_engine import analyze_macro
from engines.strategy_engine import select_strategy
from engines.montecarlo_engine import run_montecarlo
from engines.confidence_engine import calculate_confidence
from engines.execution_engine import execution_quality
from engines.anomaly_engine import detect_anomaly
from engines.learning_engine import learning_adjustment
from engines.memory_engine import save_memory
from engines.gpt_engine import generate_reasoning

from services.telemetry_service import broadcast_analysis

app = FastAPI(
    title="ALBI AI Engine",
    version="1.0.0"
)


@app.get("/")
async def root():
    return {
        "status": "ALBI AI ENGINE ONLINE"
    }


@app.post("/analyze")
async def analyze(data: MarketData):

    try:

        # ==========================
        # MARKET ANALYSIS
        # ==========================

        regime = detect_regime(data)

        structure = detect_structure(data)

        liquidity = analyze_liquidity(data)

        volatility = analyze_volatility(data)

        momentum = analyze_momentum(data)

        print("========== ALBI DEBUG ==========")
        print("REGIME:", regime)
        print("STRUCTURE:", structure)
        print("MOMENTUM:", momentum)
        print("LIQUIDITY:", liquidity)
        print("VOLATILITY:", volatility)
        print("ATR:", data.atr)
        print("RSI:", data.rsi)
        print("EMA20:", data.ema20)
        print("EMA50:", data.ema50)
        print("EMA200:", data.ema200)
        print("================================")

        macro_bias = analyze_macro()

        strategy = select_strategy(
            regime,
            volatility,
            momentum
        )

        # ==========================
        # MONTE CARLO
        # ==========================

        montecarlo = run_montecarlo()

        # ==========================
        # CONFIDENCE ENGINE
        # ==========================

        confidence = calculate_confidence(
            regime,
            momentum,
            liquidity,
            volatility,
            montecarlo,
            macro_bias
        )

        confidence = learning_adjustment(
            confidence
        )

        # ==========================
        # SAFETY CHECKS
        # ==========================

        anomaly = detect_anomaly(
            volatility,
            liquidity
        )

        execution_quality_state = execution_quality(
            data
        )

        # ==========================
        # TP FEASIBILITY ENGINE
        # ==========================

        tp_feasible = False

        if data.atr >= 15:
            tp_feasible = True

        # ==========================
        # SIGNAL ENGINE V2
        # ==========================

        signal = "NO_TRADE"

        if (
            regime == "TRENDING_BULLISH"
            and structure in ["HH_HL", "BULLISH"]
            and momentum == "BULLISH"
            and liquidity in ["HEALTHY", "NORMAL"]
            and volatility in ["NORMAL", "HIGH"]
            and confidence >= 85
        ):
            signal = "BUY"

        elif (
            regime == "TRENDING_BEARISH"
            and structure in ["LH_LL", "BEARISH"]
            and momentum == "BEARISH"
            and liquidity in ["HEALTHY", "NORMAL"]
            and volatility != "EXTREME"
            and confidence >= 85
        ):
            signal = "SELL"

        # ==========================
        # APPROVAL ENGINE
        # ==========================

        approved = (
            signal != "NO_TRADE"
            and confidence >= 90
            and tp_feasible
            and not anomaly
            and execution_quality_state == "GOOD"
        )

        uncertainty = round(
            100 - confidence,
            2
        )

        # ==========================
        # REASONING ENGINE
        # ==========================

        reasoning = generate_reasoning(
            data,
            signal,
            confidence
        )

        # ==========================
        # RESPONSE
        # ==========================

        response = {
            "approved": approved,
            "signal": signal,
            "confidence": confidence,
            "uncertainty": uncertainty,
            "strategy": strategy,
            "regime": regime,
            "market_structure": structure,
            "liquidity_state": liquidity,
            "macro_bias": macro_bias,
            "execution_quality": execution_quality_state,
            "tp_feasible": tp_feasible,
            "tail_risk": "LOW",
            "risk_of_ruin": montecarlo.get(
                "risk_of_ruin",
                0
            ),
            "expected_drawdown": montecarlo.get(
                "expected_drawdown",
                0
            ),
            "expected_winrate": montecarlo.get(
                "expected_winrate",
                0
            ),
            "reasoning": reasoning,
            "warnings": []
        }

        # ==========================
        # MEMORY
        # ==========================

        save_memory(response)

        # ==========================
        # WEBSOCKET
        # ==========================

        try:
            broadcast_analysis(response)
        except Exception as e:
            print(
                "WEBSOCKET ERROR:",
                str(e)
            )

        return response

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"AI Engine Error: {str(e)}"
        )