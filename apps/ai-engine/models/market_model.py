from pydantic import BaseModel


class MarketData(BaseModel):

    # =====================================
    # CORE
    # =====================================

    symbol: str

    bid: float
    ask: float

    spread: float

    trend: str
    session: str

    # =====================================
    # LEGACY
    # =====================================

    atr: float
    rsi: float

    ema20: float
    ema50: float
    ema200: float

    # =====================================
    # MULTI TIMEFRAME ATR
    # =====================================

    atr_m15: float

    atr_h1: float

    atr_h4: float

    # =====================================
    # MULTI TIMEFRAME RSI
    # =====================================

    rsi_m5: float

    rsi_m15: float

    rsi_h1: float

    rsi_h4: float

    # =====================================
    # MULTI TIMEFRAME EMA
    # =====================================

    ema20_m15: float

    ema50_m15: float

    ema200_h1: float