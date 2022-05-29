import blockcypher
import requests

from decouple import config

URL = config("DEV_API") if config("NODE_ENV") == "development" else config("PROD_API")
BASIC_USERNAME = config('BASIC_USERNAME')
BASIC_PASSWORD = config('BASIC_PASSWORD')


def getAllBalances():
    r = requests.get(url=URL + "/balances/all", auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def updateWallets():
    allBalances = getAllBalances()
    return


updateWallets()
