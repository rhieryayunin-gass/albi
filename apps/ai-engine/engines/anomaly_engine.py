def detect_anomaly(
    volatility,
    liquidity
):

    if (
        volatility == "EXTREME"
        and liquidity == "THIN"
    ):
        return True

    return False