from flask import Flask, request
from main import notifyuserwithtriggeredalarms

import requests
import json

URL="http://localhost:3000"

app = Flask(__name__)


@app.route('/user', methods=['GET'])
def getUserById():
    return


@app.route('/user/create', methods=['POST'])
def createUser():
    return


@app.route('/alarms', methods=['GET'])
def getUserAlarmsById():
    return


@app.route('/alarm/create', methods=['POST'])
def createAlarm():
    return


@app.route('/positions', methods=['GET'])
def getUserPositionsById():
    return


@app.route('/positions/create', methods=['POST'])
def createPosition():
    return


@app.route('/crypto/pair/', methods=['GET'])
def getPair():
    return



def updateRates(data):
    data['updatedPairs'] = json.dumps(data['updatedPairs'])
    r = requests.post(url=URL + '/crypto/update-rates', data=data)
    return r.json()


app.run(debug=True, port=5000)
