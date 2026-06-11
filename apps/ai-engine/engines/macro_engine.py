import requests


def analyze_macro():

    try:

        response = requests.get(
            "https://api.gold-api.com/price/XAU",
            timeout=5
        )

        if response.status_code != 200:
            return "NEUTRAL"

        data = response.json()

        price = float(
            data.get(
                "price",
                0
            )
        )

        open_price = float(
            data.get(
                "open_price",
                price
            )
        )

        change_pct = 0

        if open_price > 0:

            change_pct = (
                (
                    price
                    - open_price
                )
                / open_price
            ) * 100

        # ==========================
        # STRONG BULLISH
        # ==========================

        if change_pct >= 1.0:
            return "STRONG_BULLISH_GOLD"

        # ==========================
        # BULLISH
        # ==========================

        if change_pct >= 0.3:
            return "BULLISH_GOLD"

        # ==========================
        # STRONG BEARISH
        # ==========================

        if change_pct <= -1.0:
            return "STRONG_BEARISH_GOLD"

        # ==========================
        # BEARISH
        # ==========================

        if change_pct <= -0.3:
            return "BEARISH_GOLD"

        # ==========================
        # SIDEWAYS
        # ==========================

        return "NEUTRAL"

    except Exception:

        return "NEUTRAL"