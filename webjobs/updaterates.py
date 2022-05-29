from bybitapi import updatingRates
from decouple import config
import requests

URL = config("DEV_API") if config("NODE_ENV") == "development" else config("PROD_API")
BASIC_USERNAME = config('BASIC_USERNAME')
BASIC_PASSWORD = config('BASIC_PASSWORD')


def updateRates():
    data = updatingRates()
    return requests.post(url=URL+"/crypto/update-rates", json=data, auth=(BASIC_USERNAME, BASIC_PASSWORD))


updateRates()
