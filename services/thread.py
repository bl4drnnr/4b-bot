import threading
import time
from api.routes import updateData, getAllAlarms

ALARM_THREADS = []


class Thread(threading.Thread):
    def __init__(self, threadID, crypto, enterPrice, triggerPrice):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.crypto = crypto
        self.enterPrice = enterPrice
        self.triggerPrice = triggerPrice

    def run(self):
        checkPairPrice(self.crypto, self.enterPrice, self.triggerPrice)


def checkPairPrice(threadName, counter, delay):
    # TODO how to trigger alarm check
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
    while counter:
        print("%s: %s" % (threadName, time.ctime(time.time())))
        counter -= 1
        time.sleep(delay)


def startNewAlarmThread():
    thread1 = Thread(1, "Thread-1", 5, 1)
    thread2 = Thread(2, "Thread-2", 5, 2)

    thread1.start()
    thread2.start()
    return None
