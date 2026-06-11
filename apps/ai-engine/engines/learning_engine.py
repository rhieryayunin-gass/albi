def learning_adjustment(
    confidence
):

    confidence = max(
        0,
        min(
            confidence,
            100
        )
    )

    return round(
        confidence,
        2
    )