def analyze_momentum(data):

    if data.rsi > 70:
        return "OVERBOUGHT"

    if data.rsi < 30:
        return "OVERSOLD"

    if data.rsi > 55:
        return "BULLISH"

    if data.rsi < 45:
        return "BEARISH"

    return "NEUTRAL"