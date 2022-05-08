import requests
import json

URL="http://127.0.0.1:5000"


def getUserById(id):
    r = requests.get(url=URL + '/u?id={}'.format(id))
    return r.json()


def createUser(data):
    r = requests.post(url=URL + '/u/c', data=data)
    return r.json()


def getUserAlarmsById(id):
    r = requests.get(url=URL + '/a?id={}'.format(id))
    return r.json()


def createAlarm(data):
    r = requests.post(url=URL + '/a/c', data=data)
    return r.json()


def getUserPositionsById(id):
    r = requests.get(url=URL + '/p?id={}'.format(id))
    return r.json()


def createPosition(data):
    r = requests.post(url=URL + '/p/c', data=data)
    return r.json()


def getPair(pair):
    r = requests.get(url=URL + '/c/p?pair={}'.format(pair))
    return r.json()

