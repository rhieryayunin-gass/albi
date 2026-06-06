def calculate_confidence(
    regime,
    momentum,
    liquidity,
    volatility,
    montecarlo,
    macro_bias
):

    score = 50

    if regime == "TRENDING_BULLISH":
        score += 15

    if regime == "TRENDING_BEARISH":
        score += 15

    if momentum == "BULLISH":
        score += 10

    if momentum == "BEARISH":
        score += 10

    if liquidity == "HEALTHY":
        score += 10

    if volatility == "NORMAL":
        score += 10

    if macro_bias == "BULLISH_GOLD":
        score += 10

    if (
        montecarlo[
            "expected_winrate"
        ] > 60
    ):
        score += 15

    if (
        montecarlo[
            "risk_of_ruin"
        ] > 7
    ):
        score -= 20

    score = max(
        0,
        min(score, 100)
    )

    return score