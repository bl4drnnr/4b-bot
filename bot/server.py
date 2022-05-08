from flask import Flask, request
from main import notifyuserwithtriggeredalarms

import requests
import json

URL="http://localhost:3000"

app = Flask(__name__)

@app.route('/test', methods=['GET'])
def updateCryptocurrencyRates():
    chatid = request.args.get('chatid')
    return notifyuserwithtriggeredalarms(chatid, 'asd')


def updateRates(data):
    data['updatedPairs'] = json.dumps(data['updatedPairs'])
    r = requests.post(url=URL + '/crypto/update-rates', data=data)
    return r.json()


app.run(debug=True, port=5000)
