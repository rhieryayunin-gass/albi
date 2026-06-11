def analyze_liquidity(data):

    spread = data.spread

    # ==========================
    # VERY THIN
    # ==========================

    if spread >= 60:
        return "THIN"

    # ==========================
    # LOW LIQUIDITY
    # ==========================

    if spread >= 35:
        return "LOW"

    # ==========================
    # NORMAL
    # ==========================

    if spread >= 20:
        return "NORMAL"

    # ==========================
    # HEALTHY
    # ==========================

    return "HEALTHY"