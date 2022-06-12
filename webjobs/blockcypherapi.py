import blockcypher
from decouple import config


def getWalletAmountBtc(wallet):
    return blockcypher.get_address_details(wallet, coin_symbol="btc-testnet" if config("NODE_ENV") == "development" else "btc")
