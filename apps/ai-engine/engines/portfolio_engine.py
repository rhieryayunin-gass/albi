def portfolio_pressure(
    open_positions=0,
    total_lot=0.0
):

    # ==========================
    # HIGH PRESSURE
    # ==========================

    if (
        open_positions >= 3
        or total_lot >= 0.50
    ):
        return "HIGH"

    # ==========================
    # MEDIUM PRESSURE
    # ==========================

    if (
        open_positions >= 2
        or total_lot >= 0.30
    ):
        return "MEDIUM"

    # ==========================
    # LOW PRESSURE
    # ==========================

    return "LOW"