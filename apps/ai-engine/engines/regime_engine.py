def detect_regime(data):

    ema20 = data.ema20_m15
    ema50 = data.ema50_m15
    ema200 = data.ema200_h1

    # ==========================
    # STRONG TREND
    # ==========================

    if ema20 > ema50 > ema200:
        return "TRENDING_BULLISH"

    if ema20 < ema50 < ema200:
        return "TRENDING_BEARISH"

    # ==========================
    # TRANSITION
    # ==========================

    if ema20 > ema50:
        return "TRANSITION_BULLISH"

    if ema20 < ema50:
        return "TRANSITION_BEARISH"

    return "RANGING"