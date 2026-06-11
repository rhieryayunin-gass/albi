def execution_quality(data):

    spread = data.spread

    # ==========================
    # UNTRADEABLE
    # ==========================

    if spread >= 60:
        return "BAD"

    # ==========================
    # VERY RISKY
    # ==========================

    if spread >= 40:
        return "RISKY"

    # ==========================
    # ACCEPTABLE
    # ==========================

    if spread >= 25:
        return "FAIR"

    # ==========================
    # GOOD
    # ==========================

    return "GOOD"