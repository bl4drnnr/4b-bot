from flask import Flask, request
from bybitapi import updatingRates
from main import notifyuserwithtriggeredalarms

import requests
import json
import time

URL="http://127.0.0.1:3000"

app = Flask(__name__)


@app.route('/u', methods=['GET'])
def getUserById():
    r = requests.get(url=URL + '/user/' + str(request.args.get('id')))
    return r.json()


@app.route('/u/c', methods=['POST'])
def createUser():
    r = requests.post(url=URL + '/user/create', data=request.get_json())
    return r.json()


@app.route('/a', methods=['GET'])
def getUserAlarmsById():
    r = requests.get(url=URL + '/alarms/' + str(request.args.get('id')))
    return {'allAlarms': r.json()}


@app.route('/a/c', methods=['POST'])
def createAlarm():
    r = requests.post(url=URL + '/alarm/create', data=request.get_json())
    return r.json()


@app.route('/c/p', methods=['GET'])
def getPair():
    r = requests.get(url=URL + '/crypto/pair/' + str(request.args.get('pair')))
    return r.json()


@app.route('/c/u-r', methods=['GET'])
def updateRates():
    r = updatingRates()
    r['updatedPairs'] = json.dumps(r['updatedPairs'])
    return r


@app.route('/u/n', methods=['POST'])
def notifyUserAlarm():
    data = request.get_json()
    notifyuserwithtriggeredalarms(data['userid'], data['alarm'])


@app.route('/c/b', methods=['POST'])
def buyCrypto():
    data = request.get_json()


@app.route('/c/s', methods=['POST'])
def sellCrypto():
    data = request.get_json()


try:
    app.run(debug=True, port=5000)
except Exception as e:
    print(e)
    time.sleep(15)
