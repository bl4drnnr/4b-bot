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


def updatingRates():
    updatedData = updateData()

    filteredUpdatedData = []

    for pair in updatedData:
        filteredUpdatedData.append({
            'pair': pair['symbol'],
            'currentPrice': pair['index_price'] 
        })

    updateRates(filteredUpdatedData)
    print('Data has been successfully updated...')
    time.sleep(300)
    return updatingRates()


updatingRates()
