import json

MEMORY_FILE = "memory/learning.json"

def save_memory(data):

    with open(
        MEMORY_FILE,
        "w"
    ) as f:

        json.dump(
            data,
            f
        )