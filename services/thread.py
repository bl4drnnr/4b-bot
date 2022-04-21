import threading
import time
from api.routes import updateData, getAllAlarms

ALARM_THREADS = []
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
    # Logic of working
    # while len(ALARM_THREADS) != 0:
    #   data = updateData()
    #   for pair in data:
    #       for alarm in ALARM_THREADS:
    #           alarmTrigger = False
    #           if pair['symbol'] == alarm['pair]:
    #               # Check on trigger
    #           if alarmTigger:
    #               # Notify user and remove alarm from list
    #   time.sleep(300)
    # while counter:
    #     print("%s: %s" % (threadName, time.ctime(time.time())))
    #     counter -= 1
    #     time.sleep(delay)
    while True:
        print("crypto: " + str(crypto))
        print("currentPrice: " + str(currentPrice))
        print("triggerPrice: " + str(triggerPrice))
        time.sleep(5)
    # return None


def startNewAlarmThread(message, crypto, triggerPrice, currentPrice):
    thread1 = Thread(IDX, crypto, currentPrice, triggerPrice)
    increaseIdx()
    thread1.start()


def increaseIdx():
    global IDX
    IDX += 1
