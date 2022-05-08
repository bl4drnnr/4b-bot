from flask import Flask, request
# from main import notifyuserwithtriggeredalarms

import requests
import json

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
    return r.json()


@app.route('/a/c', methods=['POST'])
def createAlarm():
    r = requests.post(url=URL + '/alarm/create', data=request.get_json())
    return r.json()


@app.route('/p', methods=['GET'])
def getUserPositionsById():
    r = requests.get(url=URL + '/positions/' + str(request.args.get('id')))
    return r.json()


@app.route('/p/c', methods=['POST'])
def createPosition():
    r = requests.post(url=URL + '/positions/create', data=request.get_json())
    return r.json()


@app.route('/c/p', methods=['GET'])
def getPair():
    r = requests.get(url=URL + '/crypto/pair/' + str(request.args.get('pair')))
    return r.json()


def updateRates(data):
    data['updatedPairs'] = json.dumps(data['updatedPairs'])
    r = requests.post(url=URL + '/crypto/update-rates', data=data)
    return r.json()


app.run(debug=True, port=5000)
