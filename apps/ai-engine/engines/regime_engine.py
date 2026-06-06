def detect_regime(data):

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

    if data.atr > 40:
        return "VOLATILE"

    return "RANGING"