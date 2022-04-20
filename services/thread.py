import threading
import time
# TODO Fix temporary solution by copying envs
from api.routes import getPairApi, getAllAlarms

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
    while counter:
        print("%s: %s" % (threadName, time.ctime(time.time())))
        counter -= 1
        time.sleep(delay)


thread1 = Thread(1, "Thread-1", 5, 1)
thread2 = Thread(2, "Thread-2", 5, 2)

thread1.start()
thread2.start()
