import requests

from decouple import config
from blockcypherapi import getWalletAmountBtc

URL = config("DEV_API") if config("NODE_ENV") == "development" else config("PROD_API")
BASIC_USERNAME = config("BASIC_USERNAME")
BASIC_PASSWORD = config("BASIC_PASSWORD")


def getAllBalances():
    r = requests.get(url=URL + "/balances/list/all", auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def updateWallets(wallets):
    r = requests.put(url=URL + "/balances/update", json=wallets, auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def updateBalances():
    allBalances = getAllBalances()
    updatedBalances = []

    for balance in allBalances:

        if balance["symbol"] == "BTCUSD":
            updatedBalance = getWalletAmountBtc(balance["wallet"])
            
        updatedBalances.append({
            "id": balance["id"],
            "amount": updatedBalance["balance"]
        })
        
    return updateWallets({'wallets': updatedBalances})


updateBalances()
