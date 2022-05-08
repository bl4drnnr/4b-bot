from flask import Flask, request
import requests
import json

URL="http://localhost:3000"

app = Flask(__name__)

@app.route('/test', methods=['POST'])
def updateCryptocurrencyRates():
    args = request.args
    return args


def updateRates(data):
    data['updatedPairs'] = json.dumps(data['updatedPairs'])
    r = requests.post(url=URL + '/crypto/update-rates', data=data)
    return r.json()


if __name__ == '__main__':
    app.run(debug=True, port=5000)
