def execution_quality(data):

    if data.spread > 60:
        return "BAD"

    if data.spread > 35:
        return "RISKY"

    return "GOOD"