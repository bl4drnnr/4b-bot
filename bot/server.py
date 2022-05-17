from flask import Flask, request
from bybitapi import updatingRates
from main import bot

import requests
import json
import time

URL="http://127.0.0.1:3000"

app = Flask(__name__)


def notifyuserwithtriggeredalarms(chatid, alarm):
    alarmMessage = "<b>Watch out!</b>\n\nYour alarm has been triggered!"
    return bot.send_message(chatid, alarmMessage, parse_mode="html")


@app.route("/u", methods=["GET"])
def getUserById():
    r = requests.get(url=URL + "/user/" + str(request.args.get("id")))
    return r.json()


@app.route("/u/c", methods=["POST"])
def createUser():
    r = requests.post(url=URL + "/user/create", data=request.get_json())
    return r.json()


@app.route("/a", methods=["GET"])
def getUserAlarmsById():
    r = requests.get(url=URL + "/alarms/" + str(request.args.get("id")))
    return {"allAlarms": r.json()}


@app.route("/a/c", methods=["POST"])
def createAlarm():
    r = requests.post(url=URL + "/alarm/create", data=request.get_json())
    return r.json()


@app.route("/c/p", methods=["GET"])
def getPair():
    r = requests.get(url=URL + "/crypto/pair/" + str(request.args.get("pair")))
    return r.json()


@app.route("/c/u-r", methods=["GET"])
def updateRates():
    r = updatingRates()
    r["updatedPairs"] = json.dumps(r["updatedPairs"])
    return r


@app.route("/u/n", methods=["POST"])
def notifyUserAlarm():
    data = request.get_json()
    return


@app.route("/c/b", methods=["POST"])
def buyCrypto():
    r = requests.post(url=URL + "/crypto/buy", data=request.get_json())
    return r.json()


@app.route("/c/s", methods=["POST"])
def sellCrypto():
    r = requests.post(url=URL + "/crypto/sell", data=request.get_json())
    return r.json()


@app.route("/c/e", methods=["POST"])
def exchangeCrypto():
    r = requests.post(url=URL + "/crypto/exchange", data=request.get_json())
    return r.json()


@app.route("/v/g", methods=["POST"])
def generateVoucher():
    r = requests.post(url=URL + "/voucher/generate", data=request.get_json())
    return r.json()


@app.route("/v/r", methods=["POST"])
def redeemVoucher():
    r = requests.post(url=URL + "/voucher/redeem", data=request.get_json())
    return r.json()


try:
    app.run(debug=True, port=5000)
except Exception as e:
    print(e)
    time.sleep(15)
