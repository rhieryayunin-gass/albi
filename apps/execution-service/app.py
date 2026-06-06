import socketio

sio = socketio.Client()

@sio.on(
    "risk.analysis"
)
def handle_risk(data):

    if not data["approved"]:
        return

    execution = {

        "status":
        "READY",

        "latency":
        42,

        "slippage":
        0.3,

        "execution_quality":
        "GOOD"
    }

    sio.emit(
        "execution.opened",
        execution
    )

sio.connect(
    "http://localhost:4000"
)

sio.wait()