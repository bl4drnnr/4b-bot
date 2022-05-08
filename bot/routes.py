import requests
import json

URL="http://127.0.0.1:5000"


def getUserById(id):
    r = requests.get(url=URL + '/user?id={}'.format(id))
    return r.json()


def createUser(data):
    r = requests.post(url=URL + '/user/create', data=data)
    return r.json()


def getUserAlarmsById(id):
    r = requests.get(url=URL + '/alarms?id={}'.format(id))
    return r.json()


def createAlarm(data):
    r = requests.post(url=URL + '/alarm/create', data=data)
    return r.json()


def getUserPositionsById(id):
    r = requests.get(url=URL + '/positions?id={}'.format(id))
    return r.json()


def createPosition(data):
    r = requests.post(url=URL + '/positions/create', data=data)
    return r.json()


def getPair(pair):
    r = requests.get(url=URL + '/crypto/pair?pair={}'.format(pair))
    return r.json()

