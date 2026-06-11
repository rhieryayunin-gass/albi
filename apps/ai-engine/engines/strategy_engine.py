def select_strategy(
    regime,
    volatility,
    momentum
):

    # ==========================
    # HIGH VOLATILITY
    # ==========================

    if volatility == "EXTREME":
        return "DEFENSIVE"

    # ==========================
    # STRONG BULLISH TREND
    # ==========================

    if (
        regime == "TRENDING_BULLISH"
        and momentum == "BULLISH"
    ):

        if volatility == "HIGH":
            return "BREAKOUT"

        return "CONTINUATION"

    # ==========================
    # STRONG BEARISH TREND
    # ==========================

    if (
        regime == "TRENDING_BEARISH"
        and momentum == "BEARISH"
    ):

        if volatility == "HIGH":
            return "BREAKDOWN"

        return "CONTINUATION"

    # ==========================
    # RANGING MARKET
    # ==========================

    if regime == "RANGING":
        return "SNIPER"

    # ==========================
    # LOW QUALITY MARKET
    # ==========================

    if momentum == "NEUTRAL":
        return "WAIT"

    # ==========================
    # DEFAULT
    # ==========================

    return "WAIT"