import threading
import time
from api.routes import updateData, getAllAlarms

IDX = 0


class Thread(threading.Thread):
    def __init__(self, threadID, crypto, currentPrice, triggerPrice):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.crypto = crypto
        self.currentPrice = currentPrice
        self.triggerPrice = triggerPrice

    def run(self):
        checkPairPrice(self.crypto, self.currentPrice, self.triggerPrice)


def checkPairPrice(crypto, currentPrice, triggerPrice):
    while True:
        data = updateData()
        for pair in data:
            if pair['symbol'] == crypto:
                alarmTrigger = False
                # if ...check price -> alarmTrigger = True
                if alarmTrigger:
                    # exit thread
                    print('Notify user')
        time.sleep(300)


def startNewAlarmThread(message, crypto, triggerPrice, currentPrice):
    alarmThread = Thread(IDX, crypto, currentPrice, triggerPrice)
    increaseIdx()
    alarmThread.start()


def increaseIdx():
    global IDX
    IDX += 1
