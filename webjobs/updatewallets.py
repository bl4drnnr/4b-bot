import blockcypher
import requests

from decouple import config

URL = config("DEV_API") if config("NODE_ENV") == "development" else config("PROD_API")
BASIC_USERNAME = config('BASIC_USERNAME')
BASIC_PASSWORD = config('BASIC_PASSWORD')


def updateWallets():
    return


updateWallets()
