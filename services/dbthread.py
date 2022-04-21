import threading
import time

from services.database import getAllTriggeredAlarms

IDX = 0


class DataBaseThread(threading.Thread):
    def __init__(self, threadID, chatid):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.chatid = chatid

    def run(self):
        checkForTriggeredAlarmsInDb(self.chatid)


def checkForTriggeredAlarmsInDb(chatid):
    return None


def startForCheckingForTriggeredAlarm():
    dbThread = DataBaseThread(0, 'chatid')
    increaseIdx()
    dbThread.start()


def increaseIdx():
    global IDX
    IDX += 1
