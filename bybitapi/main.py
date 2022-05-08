from flask import Flask, request
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
print(sys.path.append(os.path.dirname(os.path.abspath(__file__))))

from bot.main import notifyuserwithtriggeredalarms
import requests
import json

URL="http://localhost:3000"

app = Flask(__name__)

@app.route('/test', methods=['GET'])
def updateCryptocurrencyRates():
    chatid = request.args.get('id')
    print(args)
    notifyuserwithtriggeredalarms(chatid, 'asd')
    return args


def updateRates(data):
    data['updatedPairs'] = json.dumps(data['updatedPairs'])
    r = requests.post(url=URL + '/crypto/update-rates', data=data)
    return r.json()


if __name__ == '__main__':
    app.run(debug=True, port=5000)