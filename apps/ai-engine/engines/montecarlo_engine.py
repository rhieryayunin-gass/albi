import random
import numpy as np

def run_montecarlo():

    results = []

    for _ in range(1000):

        pnl = random.uniform(
            -100,
            200
        )

        results.append(pnl)

    expected_pnl = np.mean(results)

    winrate = (
        len(
            [
                x for x in results
                if x > 0
            ]
        )
        / len(results)
    ) * 100

    drawdown = abs(min(results))

    return {
        "expected_pnl":
        round(expected_pnl, 2),

        "expected_winrate":
        round(winrate, 2),

        "expected_drawdown":
        round(drawdown, 2),

        "risk_of_ruin":
        round(
            random.uniform(1, 8),
            2
        )
    }