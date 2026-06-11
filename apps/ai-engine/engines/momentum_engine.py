def analyze_momentum(data):

    bullish_score = 0
    bearish_score = 0

    # ==========================
    # H4
    # ==========================

    if data.rsi_h4 >= 60:
        bullish_score += 3

    elif data.rsi_h4 <= 40:
        bearish_score += 3

    # ==========================
    # H1
    # ==========================

    if data.rsi_h1 >= 60:
        bullish_score += 2

    elif data.rsi_h1 <= 40:
        bearish_score += 2

    # ==========================
    # M15
    # ==========================

    if data.rsi_m15 >= 55:
        bullish_score += 1

    elif data.rsi_m15 <= 45:
        bearish_score += 1

    # ==========================
    # M5
    # ==========================

    if data.rsi_m5 >= 55:
        bullish_score += 1

    elif data.rsi_m5 <= 45:
        bearish_score += 1

    # ==========================
    # FINAL
    # ==========================

    if bullish_score >= 5:
        return "BULLISH"

    if bearish_score >= 5:
        return "BEARISH"

    return "NEUTRAL"