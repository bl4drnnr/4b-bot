from flask import Flask, request
from main import notifyuserwithtriggeredalarms

import requests
import json

URL="http://127.0.0.1:3000"

app = Flask(__name__)


@app.route('/user', methods=['GET'])
def getUserById():
    r = requests.get(url=URL + '/user/' + str(request.args.get('id')))
    return r.json()


@app.route('/user/create', methods=['POST'])
def createUser():
    return


@app.route('/alarms', methods=['GET'])
def getUserAlarmsById():
    r = requests.get(url=URL + '/alarms/' + str(request.args.get('id')))
    return r.json()


@app.route('/alarm/create', methods=['POST'])
def createAlarm():
    return


@app.route('/positions', methods=['GET'])
def getUserPositionsById():
    r = requests.get(url=URL + '/positions/' + str(request.args.get('id')))
    return r.json()


@app.route('/positions/create', methods=['POST'])
def createPosition():
    return


@app.route('/crypto/pair/', methods=['GET'])
def getPair():
    r = requests.get(url=URL + '/crypto/pair/' + str(request.args.get('pair')))
    return r.json()


def updateRates(data):
    data['updatedPairs'] = json.dumps(data['updatedPairs'])
    r = requests.post(url=URL + '/crypto/update-rates', data=data)
    return r.json()


app.run(debug=True, port=5000)
