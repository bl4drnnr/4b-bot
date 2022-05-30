import requests

from decouple import config
from blockcypher import getWalletAmount

URL = config("DEV_API") if config("NODE_ENV") == "development" else config("PROD_API")
BASIC_USERNAME = config('BASIC_USERNAME')
BASIC_PASSWORD = config('BASIC_PASSWORD')


def getAllBalances():
    r = requests.get(url=URL + "/balances/list/all", auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def updateWallets():
    allBalances = getAllBalances()
    print("allBalances", allBalances)
    return


updateWallets()
