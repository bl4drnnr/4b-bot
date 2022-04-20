import threading
import time
from api.routes import getPairApi, getAllAlarms

exitFlag = 0


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
        if exitFlag:
            threadName.exit()
        time.sleep(delay)
        print("%s: %s" % (threadName, time.ctime(time.time())))
        counter -= 1


thread1 = Thread(1, "Thread-1", 1)
thread2 = Thread(2, "Thread-2", 2)

# Start new Threads
thread1.start()
thread2.start()

print("Exiting Main Thread")
