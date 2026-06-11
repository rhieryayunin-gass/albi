def analyze_volatility(data):

    atr_m15 = data.atr_m15
    atr_h1 = data.atr_h1
    atr_h4 = data.atr_h4

    # ==========================
    # WEIGHTED VOLATILITY SCORE
    # M15 = EXECUTION
    # H1  = REGIME
    # H4  = TREND CONTEXT
    # ==========================

    atr_score = (
        (atr_m15 * 0.50)
        + (atr_h1 * 0.30)
        + (atr_h4 * 0.20)
    )

    # ==========================
    # DEAD MARKET
    # ==========================

    if atr_score < 10:
        return "DEAD"

    # ==========================
    # LOW VOLATILITY
    # ==========================

    if atr_score < 20:
        return "LOW"

    # ==========================
    # HEALTHY VOLATILITY
    # ==========================

    if atr_score < 35:
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