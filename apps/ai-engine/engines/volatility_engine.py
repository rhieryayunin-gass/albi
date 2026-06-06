def analyze_volatility(data):

    if data.atr > 60:
        return "EXTREME"

    if data.atr > 35:
        return "HIGH"

    return "NORMAL"