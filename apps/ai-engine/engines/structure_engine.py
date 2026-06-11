def detect_structure(data):

    # STRONG BULLISH STRUCTURE

    if (
        data.ema20 >
        data.ema50 >
        data.ema200
    ):
        return "HH_HL"

    # STRONG BEARISH STRUCTURE

    if (
        data.ema20 <
        data.ema50 <
        data.ema200
    ):
        return "LH_LL"

    # EARLY BULLISH TRANSITION

    if (
        data.ema20 >
        data.ema50
        and data.ema50 <
        data.ema200
    ):
        return "BULLISH"

    # EARLY BEARISH TRANSITION

    if (
        data.ema20 <
        data.ema50
        and data.ema50 >
        data.ema200
    ):
        return "BEARISH"

    return "NEUTRAL"