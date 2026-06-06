from pydantic import BaseModel

class MarketData(BaseModel):
    symbol: str

    bid: float
    ask: float

    spread: float

    atr: float
    rsi: float

    ema20: float
    ema50: float
    ema200: float

    trend: str
    session: str