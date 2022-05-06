import requests
import json

URL="http://localhost:3000"

def updateRates():
    r = requests.post(url=URL + '/crypto/update-rates')
    return r.json()