def calculate_confidence(
    regime,
    structure,
    momentum,
    liquidity,
    volatility,
    montecarlo,
    macro_bias
):

    score = 0

    # ==========================
    # REGIME (25)
    # ==========================

    if regime in [
        "TRENDING_BULLISH",
        "TRENDING_BEARISH"
    ]:
        score += 25

    elif regime.startswith(
        "TRANSITION"
    ):
        score += 10

    # ==========================
    # STRUCTURE (20)
    # ==========================

    if structure in [
        "HH_HL",
        "LH_LL"
    ]:
        score += 20

    # ==========================
    # MOMENTUM (20)
    # ==========================

    if momentum in [
        "BULLISH",
        "BEARISH"
    ]:
        score += 20

    elif momentum == "NEUTRAL":
        score += 10

    # ==========================
    # LIQUIDITY (10)
    # ==========================

    if liquidity == "HEALTHY":
        score += 10

    elif liquidity == "NORMAL":
        score += 5

    elif liquidity == "LOW":
        score -= 10

    elif liquidity == "THIN":
        score -= 20

    # ==========================
    # VOLATILITY (10)
    # ==========================

    if volatility == "NORMAL":
        score += 10

    elif volatility == "HIGH":
        score += 8

    elif volatility == "LOW":
        score += 3

    elif volatility == "EXTREME":
        score -= 15

    # ==========================
    # MACRO (5)
    # ==========================

    if macro_bias in [
        "STRONG_BULLISH_GOLD",
        "STRONG_BEARISH_GOLD"
    ]:
        score += 5

    elif macro_bias != "NEUTRAL":
        score += 3

    # ==========================
    # MONTE CARLO (10)
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
        score += 10

    elif expected_winrate >= 60:
        score += 5

    elif expected_winrate < 45:
        score -= 10

    if risk_of_ruin > 15:
        score -= 10

    elif risk_of_ruin < 5:
        score += 5

    if expected_drawdown > 30:
        score -= 10

    elif expected_drawdown > 20:
        score -= 5

    # ==========================
    # FINAL
    # ==========================

    score = max(
        0,
        min(score, 100)
    )

    return round(score, 2)