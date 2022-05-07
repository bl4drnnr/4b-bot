import requests
import json

URL="http://localhost:3000"


def updateRates(data):
    r = requests.post(url=URL + '/crypto/update-rates', data=data)
    return r.json()
    