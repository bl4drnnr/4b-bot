import threading
import time
from api.routes import updateData, getAllAlarms

ALARM_THREADS = []


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
    return None


def startNewAlarmThread(message, userMessage):
    # Setup name
    newAlarmName = "alarm" + str(len(ALARM_THREADS))

    thread1 = Thread(1, newAlarmName, 5, float(userMessage.split()[1]))
    thread2 = Thread(2, "Thread-2", 5, 2)

    thread1.start()
    thread2.start()
    return None
