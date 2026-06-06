from pydantic import BaseModel

class AiResponse(BaseModel):
    approved: bool

    signal: str

    confidence: float

    uncertainty: float

    strategy: str

    regime: str

    reasoning: str

    expected_winrate: float

    expected_drawdown: float

    risk_of_ruin: float

    warnings: list