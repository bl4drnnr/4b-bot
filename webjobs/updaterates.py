from bybitapi import updatingRates
from decouple import config
import requests

URL="http://127.0.0.1:3000"
BASIC_USERNAME = config('BASIC_USERNAME')
BASIC_PASSWORD = config('BASIC_PASSWORD')

def updateRates():
    data = updatingRates()
    r = requests.post("/crypto/update-rates", json=data, auth=(BASIC_USERNAME, BASIC_PASSWORD))

updateRates()
