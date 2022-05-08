import bybit
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


def updatingRates():
    updatedData = updateData()

    filteredUpdatedData = []

    for pair in updatedData:
        filteredUpdatedData.append({
            'symbol': pair['symbol'],
            'mark_price': pair['mark_price'],
            'index_price': pair['index_price'],
            'bid_price': pair['bid_price'],
            'ask_price': pair['ask_price'],
            'high_price_24h': pair['high_price_24h'],
            'low_price_24h': pair['low_price_24h']
        })

    return {'updatedPairs': filteredUpdatedData}
