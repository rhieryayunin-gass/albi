def detect_structure(data):

    if (
        data.ema20 >
        data.ema50
    ):
        return "HH_HL"

    if (
        data.ema20 <
        data.ema50
    ):
        return "LH_LL"

    return "NEUTRAL"