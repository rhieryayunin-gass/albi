from openai import OpenAI
import os

client = OpenAI(
    api_key=
    os.getenv(
        "OPENAI_API_KEY"
    )
)

def generate_reasoning(
    data,
    signal,
    confidence
):

    prompt = f"""
    Analyze XAUUSD.

    Signal:
    {signal}

    Confidence:
    {confidence}

    Trend:
    {data.trend}

    Session:
    {data.session}
    """

    try:

        response = client.chat.completions.create(
            model="gpt-5-mini",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return (
            response
            .choices[0]
            .message.content
        )

    except:

        return (
            "Reasoning unavailable"
        )