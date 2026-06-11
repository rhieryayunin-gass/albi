import numpy as np


def run_montecarlo():

    simulations = []

    win_probability = 0.65

    reward = 1500

    risk = -3000

    total_trades = 100

    simulation_runs = 1000

    for _ in range(simulation_runs):

        equity = 0

        peak = 0

        max_drawdown = 0

        wins = 0

        losses = 0

        for _ in range(total_trades):

            outcome = np.random.random()

            if outcome <= win_probability:

                equity += reward

                wins += 1

            else:

                equity += risk

                losses += 1

            peak = max(
                peak,
                equity
            )

            drawdown = peak - equity

            max_drawdown = max(
                max_drawdown,
                drawdown
            )

        simulations.append(
            {
                "equity": equity,
                "wins": wins,
                "losses": losses,
                "drawdown": max_drawdown,
            }
        )

    equities = [
        s["equity"]
        for s in simulations
    ]

    drawdowns = [
        s["drawdown"]
        for s in simulations
    ]

    avg_equity = float(
        np.mean(equities)
    )

    avg_drawdown = float(
        np.mean(drawdowns)
    )

    profitable_runs = len(
        [
            x
            for x in equities
            if x > 0
        ]
    )

    expected_winrate = (
        profitable_runs
        / simulation_runs
    ) * 100

    ruined_runs = len(
        [
            x
            for x in equities
            if x < -50000
        ]
    )

    risk_of_ruin = (
        ruined_runs
        / simulation_runs
    ) * 100

    return {
        "expected_pnl":
        round(
            avg_equity,
            2
        ),

        "expected_winrate":
        round(
            expected_winrate,
            2
        ),

        "expected_drawdown":
        round(
            avg_drawdown,
            2
        ),

        "risk_of_ruin":
        round(
            risk_of_ruin,
            2
        )
    }