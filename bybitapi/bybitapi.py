import bybit
import time
import sys
from decouple import config
from routes import updateRates

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


def updateRates():
    print('Updating data...')
    updatedData = updateData()
    filteredUpdatedData = []

    for pair in updatedData:
        print(pair)
    updateRates(updatedData)
    time.sleep(300)


updateRates()
