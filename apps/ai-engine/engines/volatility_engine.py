def analyze_volatility(data):

    atr_m15 = data.atr_m15
    atr_h1 = data.atr_h1
    atr_h4 = data.atr_h4

    atr_score = (
        atr_m15
        + atr_h1
        + atr_h4
    ) / 3

    # ==========================
    # VERY LOW VOLATILITY
    # ==========================

    if atr_score < 8:
        return "DEAD"

    # ==========================
    # LOW VOLATILITY
    # ==========================

    if atr_score < 15:
        return "LOW"

    # ==========================
    # HEALTHY VOLATILITY
    # ==========================

    if atr_score < 30:
        return "NORMAL"

    # ==========================
    # STRONG TRENDING MARKET
    # ==========================

    if atr_score < 50:
        return "HIGH"

    # ==========================
    # CHAOTIC MARKET
    # ==========================

    return "EXTREME"