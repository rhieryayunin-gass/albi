def select_strategy(
    regime,
    volatility,
    momentum
):

    if (
        regime == "TRENDING_BULLISH"
        and momentum == "BULLISH"
    ):
        return "BREAKOUT"

    if (
        regime == "TRENDING_BEARISH"
        and momentum == "BEARISH"
    ):
        return "CONTINUATION"

    if volatility == "EXTREME":
        return "DEFENSIVE"

    return "SNIPER"