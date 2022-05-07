from flask import Flask, request
import requests
import json

URL="http://localhost:3000"

app = Flask(__name__)

@app.route('', methods=['POST'])
def updateCryptocurrencyRates(data):
    return


def updateRates(data):
    data['updatedPairs'] = json.dumps(data['updatedPairs'])
    r = requests.post(url=URL + '/crypto/update-rates', data=data)
    return r.json()
