import requests
import json

URL="http://127.0.0.1:5000"


def test(id):
    r = requests.get(url=URL + '/test' + '?chatid=' + str(id))
    return r.json()


def getUserById(id):
    r = requests.get(url=URL + '/user/' + str(id))
    return r.json()


def createUser(data):
    r = requests.post(url=URL + '/user/create', data=data)
    return r.json()


def getUserAlarmsById(id):
    r = requests.get(url=URL + '/alarms/' + str(id))
    return r.json()


def createAlarm(data):
    r = requests.post(url=URL + '/alarm/create', data=data)
    return r.json()


def getUserPositionsById(id):
    r = requests.get(url=URL + '/positions/' + str(id))
    return r.json()


def createPosition(data):
    r = requests.post(url=URL + '/positions/create', data=data)
    return r.json()


def getPair(pair):
    r = requests.get(url=URL + '/crypto/pair/' + str(pair))
    return r.json()

