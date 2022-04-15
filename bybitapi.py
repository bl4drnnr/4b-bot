import bybit
import sys
from decouple import config

API_KEY = config("API_KEY")
API_SECRET = config("API_SECRET")

try:
    client = bybit.bybit(test=False, api_key=API_KEY, api_secret=API_SECRET)
    info = client.Market.Market_symbolInfo().result()
    res = info[0]['result']
    print("Logged in successfully!")
except Exception as e:
    print(f'Something went wrong while logging => {e}')
    sys.exit()


def getPairApi(pair):
    foundPair = None
    for item in res:
        if item['symbol'] == pair:
            foundPair = item
    return foundPair


def setAlarmApi():
    return 'test'
