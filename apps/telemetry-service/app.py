import socketio

sio = socketio.Client()

@sio.on(
    "ai.analysis"
)
def ai_log(data):

    print(
        "[AI]",
        data
    )

@sio.on(
    "risk.analysis"
)
def risk_log(data):

    print(
        "[RISK]",
        data
    )

@sio.on(
    "execution.opened"
)
def execution_log(data):

    print(
        "[EXECUTION]",
        data
    )

sio.connect(
    "http://localhost:4000"
)

sio.wait()