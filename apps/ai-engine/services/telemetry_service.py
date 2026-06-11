from websocket.socket_manager import sio
from utils.logger import *

def broadcast_analysis(data):

    try:

        sio.emit(
            "ai.analysis",
            data
        )

        log_info(
            "AI ANALYSIS BROADCASTED"
        )

    except Exception as e:

        print(
            "BROADCAST ERROR:",
            str(e)
        )