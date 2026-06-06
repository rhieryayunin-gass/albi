def analyze_liquidity(data):

    if data.spread > 50:
        return "THIN"

    if data.spread < 20:
        return "HEALTHY"

    return "NORMAL"