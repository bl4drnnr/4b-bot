import bybit
import time
import sys
from services.database import postAlarm, getAlarms, postPosition, getUserPositions, getUserById, createUser
from decouple import config

API_KEY = config("API_KEY")
API_SECRET = config("API_SECRET")

try:
    client = bybit.bybit(test=False, api_key=API_KEY, api_secret=API_SECRET)
except Exception as e:
    print(f'Something went wrong while logging => {e}')
    sys.exit()


def updateData():
    info = client.Market.Market_symbolInfo().result()
    return info[0]['result']


def getPairApi(pair):
    foundPair = None
    data = updateData()
    for item in data:
        if item['symbol'] == pair:
            foundPair = item
    return foundPair


def setAlarmApi(crypto, price, userid):
    return postAlarm(crypto, price, userid)


def getAllAlarms(userid):
    return getAlarms(userid)


def commitPositions(crypto, dateFrom, dateTo, interval, tp, sl):
    return postPosition(crypto, dateFrom, dateTo, interval, tp, sl)


def getPositions(userid):
    return getUserPositions(userid)


def getUser(userid):
    return getUserById(userid)


def postUser(userid, name):
    return createUser(userid, name)


def startAlarmsChecker(message):
    userAlarms = getAllAlarms(message.chat.id)
    while len(userAlarms) > 0:
        time.sleep(300)
