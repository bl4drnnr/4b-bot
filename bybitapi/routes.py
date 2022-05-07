import requests
import json

URL="http://localhost:3000"


def updateRates(data):
    data['updatedPairs'] = json.dumps(data['updatedPairs'])
    r = requests.post(url=URL + '/crypto/update-rates', data=data)
    return r.json()
