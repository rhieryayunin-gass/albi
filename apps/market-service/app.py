import asyncio
import socketio
import random

sio = socketio.AsyncClient()

async def stream_market():

    while True:

        payload = {

            "symbol": "XAUUSD",

            "bid":
            round(
                random.uniform(
                    3300,
                    3400
                ),
                2
            ),

            "ask":
            round(
                random.uniform(
                    3300,
                    3400
                ),
                2
            ),

            "spread":
            round(
                random.uniform(
                    10,
                    40
                ),
                2
            ),

            "atr":
            round(
                random.uniform(
                    20,
                    70
                ),
                2
            ),

            "trend":
            "TRENDING_BULLISH",

            "session":
            "LONDON"
        }

        await sio.emit(
            "market.update",
            payload
        )

        await asyncio.sleep(
            0.5
        )

async def main():

    await sio.connect(
        "http://localhost:4000"
    )

    await stream_market()

asyncio.run(main())