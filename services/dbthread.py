import threading
import time


class DataBaseThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)

    def run(self):
        checkForTriggeredAlarmsInDb()


def checkForTriggeredAlarmsInDb():
    return None
