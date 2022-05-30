import requests

from decouple import config
from blockcypherapi import getWalletAmount

URL = config("DEV_API") if config("NODE_ENV") == "development" else config("PROD_API")
BASIC_USERNAME = config("BASIC_USERNAME")
BASIC_PASSWORD = config("BASIC_PASSWORD")


def getAllBalances():
    r = requests.get(url=URL + "/balances/list/all", auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def updateWallets(wallets):
    return requests.put(url=URL + "/balances/update", json=wallets, auth=(BASIC_USERNAME, BASIC_PASSWORD))


def updateBalances():
    allBalances = getAllBalances()
    updatedBalances = []

    for balance in allBalances:
        updatedBalance = getWalletAmount(balance["wallet"])
        updatedBalances.append({
            "id": balance["id"],
            "amount": updatedBalance["balance"]
        })
        
    updateWallets({'wallets': updatedBalances})
