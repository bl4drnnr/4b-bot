import threading
import time
from api.bybitapi import updateData
# Error because of setAlarm in router
# from api.routes import setTriggeredAlarms
from services.database import postTriggeredAlarms

IDX = 0


class Thread(threading.Thread):
    def __init__(self, threadID, crypto, currentPrice, triggerPrice, chatid):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.crypto = crypto
        self.currentPrice = currentPrice
        self.triggerPrice = triggerPrice
        self.chatid = chatid

    def run(self):
        checkPairPrice(self.crypto, self.currentPrice, self.triggerPrice, self.chatid)


def checkPairPrice(crypto, currentPrice, triggerPrice, chatid):
    while True:
        data = updateData()
        for pair in data:
            if pair['symbol'] == crypto:
                waitingForLong = float(triggerPrice) > float(currentPrice)
                if waitingForLong and float(triggerPrice) >= pair['index_price']:
                    postTriggeredAlarms(crypto, currentPrice, triggerPrice, chatid)
                elif not waitingForLong and float(triggerPrice) <= pair['index_price']:
                    postTriggeredAlarms(crypto, currentPrice, triggerPrice, chatid)
        time.sleep(300)


def startNewAlarmThread(chatid, crypto, triggerPrice, currentPrice):
    alarmThread = Thread(IDX, crypto, currentPrice, triggerPrice, chatid)
    increaseIdx()
    alarmThread.start()


def increaseIdx():
    global IDX
    IDX += 1
