def detect_anomaly(
    volatility,
    liquidity
):

    anomaly_score = 0

    # ==========================
    # VOLATILITY
    # ==========================

    if volatility == "EXTREME":
        anomaly_score += 2

    elif volatility == "HIGH":
        anomaly_score += 1

    # ==========================
    # LIQUIDITY
    # ==========================

    if liquidity == "THIN":
        anomaly_score += 2

    elif liquidity == "LOW":
        anomaly_score += 1

    # ==========================
    # FINAL DECISION
    # ==========================

    return anomaly_score >= 2