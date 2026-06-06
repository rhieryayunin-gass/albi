from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI

from models.market_model import *
from models.ai_response_model import *

from engines.regime_engine import *
from engines.structure_engine import *
from engines.liquidity_engine import *
from engines.volatility_engine import *
from engines.momentum_engine import *
from engines.macro_engine import *
from engines.strategy_engine import *
from engines.montecarlo_engine import *
from engines.confidence_engine import *
from engines.execution_engine import *
from engines.anomaly_engine import *
from engines.learning_engine import *
from engines.memory_engine import *
from engines.portfolio_engine import *
from engines.gpt_engine import *

from services.telemetry_service import *

app = FastAPI()

@app.get("/")
async def root():

    return {
        "status": "ALBI AI ENGINE ONLINE"
    }

@app.post("/analyze")
async def analyze(
    data: MarketData
):

    regime = detect_regime(data)

    structure = detect_structure(data)

    liquidity = analyze_liquidity(data)

    volatility = analyze_volatility(data)

    momentum = analyze_momentum(data)

    macro_bias = analyze_macro()

    strategy = select_strategy(
        regime,
        volatility,
        momentum
    )

    montecarlo = run_montecarlo()

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

    anomaly = detect_anomaly(
        volatility,
        liquidity
    )

    execution_quality_state = execution_quality(data)

    if (
        regime == "TRENDING_BULLISH"
        and momentum == "BULLISH"
    ):
        signal = "BUY"

    elif (
        regime == "TRENDING_BEARISH"
        and momentum == "BEARISH"
    ):
        signal = "SELL"

    else:
        signal = "NO_TRADE"

    approved = (
        confidence >= 80
        and not anomaly
        and execution_quality_state
        != "BAD"
    )

    uncertainty = round(
        100 - confidence,
        2
    )

    reasoning = generate_reasoning(
        data,
        signal,
        confidence
    )

    response = {
        "approved":
        approved,

        "signal":
        signal,

        "confidence":
        confidence,

        "uncertainty":
        uncertainty,

        "strategy":
        strategy,

        "regime":
        regime,

        "market_structure":
        structure,

        "liquidity_state":
        liquidity,

        "macro_bias":
        macro_bias,

        "execution_quality":
        execution_quality_state,

        "tail_risk":
        "LOW",

        "risk_of_ruin":
        montecarlo[
            "risk_of_ruin"
        ],

        "expected_drawdown":
        montecarlo[
            "expected_drawdown"
        ],

        "expected_winrate":
        montecarlo[
            "expected_winrate"
        ],

        "reasoning":
        reasoning,

        "warnings": []
    }

    save_memory(response)

    broadcast_analysis(
        response
    )

    return response