import bybit
import time
import sys
from services.database import postAlarm, getAlarm
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


def getAlarmApi():
    while True:
        userAlarms = getAlarm()
        time.sleep(300)
