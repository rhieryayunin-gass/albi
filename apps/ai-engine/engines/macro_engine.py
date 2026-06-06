import requests

def analyze_macro():

    try:

        response = requests.get(
            "https://api.gold-api.com/price/XAU"
        )

        data = response.json()

        price = data["price"]

        if price > 3300:
            return "BULLISH_GOLD"

        return "BEARISH_GOLD"

    except:
        return "UNKNOWN"