def analyze_volatility(data):

    atr = data.atr

    # ==========================
    # VERY LOW VOLATILITY
    # ==========================

    if atr < 8:
        return "DEAD"

    # ==========================
    # LOW VOLATILITY
    # ==========================

    if atr < 15:
        return "LOW"

    # ==========================
    # HEALTHY VOLATILITY
    # ==========================

    if atr < 30:
        return "NORMAL"

    # ==========================
    # STRONG TRENDING MARKET
    # ==========================

    if atr < 50:
        return "HIGH"

    # ==========================
    # CHAOTIC MARKET
    # ==========================

    return "EXTREME"