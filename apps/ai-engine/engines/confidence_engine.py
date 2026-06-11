def calculate_confidence(
    regime,
    momentum,
    liquidity,
    volatility,
    montecarlo,
    macro_bias
):

    score = 0

    # ==========================
    # REGIME
    # ==========================

    if regime in [
        "TRENDING_BULLISH",
        "TRENDING_BEARISH"
    ]:
        score += 30

    elif regime.startswith(
        "TRANSITION"
    ):
        score += 10

    # ==========================
    # MOMENTUM
    # ==========================

    if momentum in [
        "BULLISH",
        "BEARISH"
    ]:
        score += 25

    elif momentum == "NEUTRAL":
        score += 5

    # ==========================
    # LIQUIDITY
    # ==========================

    if liquidity == "HEALTHY":
        score += 15

    elif liquidity == "NORMAL":
        score += 10

    elif liquidity == "LOW":
        score -= 15

    elif liquidity == "THIN":
        score -= 30

    # ==========================
    # VOLATILITY
    # ==========================

    if volatility == "NORMAL":
        score += 15

    elif volatility == "HIGH":
        score += 10

    elif volatility == "EXTREME":
        score -= 25

    # ==========================
    # MACRO
    # ==========================

    if macro_bias in [
        "STRONG_BULLISH_GOLD",
        "STRONG_BEARISH_GOLD"
    ]:
        score += 10

    elif macro_bias != "NEUTRAL":
        score += 5

    # ==========================
    # MONTE CARLO
    # ==========================

    expected_winrate = montecarlo.get(
        "expected_winrate",
        0
    )

    risk_of_ruin = montecarlo.get(
        "risk_of_ruin",
        100
    )

    expected_drawdown = montecarlo.get(
        "expected_drawdown",
        100
    )

    if expected_winrate >= 70:
        score += 20

    elif expected_winrate >= 60:
        score += 10

    elif expected_winrate < 50:
        score -= 20

    if risk_of_ruin < 5:
        score += 10

    elif risk_of_ruin > 10:
        score -= 30

    if expected_drawdown > 25:
        score -= 20

    elif expected_drawdown > 15:
        score -= 10

    # ==========================
    # FINAL
    # ==========================

    score = max(
        0,
        min(score, 100)
    )

    return round(score, 2)