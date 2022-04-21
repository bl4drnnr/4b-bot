import threading
import time
from api.routes import updateData

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
                    # Write in db?
                    # And create one more thread class just to get to DB?
                    print('push record to triggered alarms and remove thread')
                elif not waitingForLong and float(triggerPrice) <= pair['index_price']:
                    print('push record to triggered alarms and remove thread')
        time.sleep(300)


def startNewAlarmThread(chatid, crypto, triggerPrice, currentPrice):
    alarmThread = Thread(IDX, crypto, currentPrice, triggerPrice, chatid)
    increaseIdx()
    alarmThread.start()


def increaseIdx():
    global IDX
    IDX += 1


def lookForTriggeredAlarms():
    return None
