import requests
import json

URL="http://127.0.0.1:5000"


def getUserById(id):
    r = requests.get(url=URL + "/u?id={}".format(id))
    return r.json()


def createUser(data):
    r = requests.post(url=URL + "/u/c", json=data)
    return r.json()


def getUserAlarmsById(id):
    r = requests.get(url=URL + "/a?id={}".format(id))
    return r.json()


def createAlarm(data):
    r = requests.post(url=URL + "/a/c", json=data)
    return r.json()


def getPair(pair):
    r = requests.get(url=URL + "/c/p?pair={}".format(pair))
    return r.json()


def buyCrypto(data):
    r = requests.post(url=URL + "/c/b", json=data)
    return r.json()


def sellCrypto(data):
    r = requests.post(url=URL + "/c/s", json=data)
    return r.json()
