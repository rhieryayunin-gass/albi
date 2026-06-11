import socketio

sio = socketio.Client()

try:
    sio.connect(
        "http://localhost:4001"
    )

    print(
        "CONNECTED TO WS GATEWAY"
    )

except Exception as e:

    print(
        "WS CONNECTION ERROR:",
        str(e)
    )