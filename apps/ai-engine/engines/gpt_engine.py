from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv(
        "OPENAI_API_KEY"
    )
)


def generate_reasoning(
    data,
    signal,
    confidence,
    regime=None,
    structure=None,
    momentum=None,
    liquidity=None,
    volatility=None,
    macro_bias=None,
    strategy=None,
    execution_quality=None,
    tp_feasible=None
):

    prompt = f"""
You are ALBI Institutional Trading AI.

Analyze current XAUUSD conditions.

=== MARKET ===

Signal:
{signal}

Confidence:
{confidence}

Regime:
{regime}

Structure:
{structure}

Momentum:
{momentum}

Liquidity:
{liquidity}

Volatility:
{volatility}

Macro Bias:
{macro_bias}

Strategy:
{strategy}

Execution Quality:
{execution_quality}

TP Feasible:
{tp_feasible}

=== MULTI TIMEFRAME ===

RSI M5:
{data.rsi_m5}

RSI M15:
{data.rsi_m15}

RSI H1:
{data.rsi_h1}

RSI H4:
{data.rsi_h4}

ATR M15:
{data.atr_m15}

ATR H1:
{data.atr_h1}

ATR H4:
{data.atr_h4}

EMA20 M15:
{data.ema20_m15}

EMA50 M15:
{data.ema50_m15}

EMA200 H1:
{data.ema200_h1}

=== TASK ===

Provide:

1. Market Summary
2. Why signal was chosen
3. Main risks
4. Probability TP 1500 is reached
5. Final conclusion

Maximum 250 words.
Be concise.
"""

    try:

        response = client.chat.completions.create(
            model="gpt-5-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_completion_tokens=400
        )

        return (
            response
            .choices[0]
            .message.content
        )

    except Exception as e:

        return (
            f"Reasoning unavailable: {str(e)}"
        )