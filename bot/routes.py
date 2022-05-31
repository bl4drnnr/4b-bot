import requests
import json
from decouple import config

URL="http://127.0.0.1:3000"
BASIC_USERNAME = config('BASIC_USERNAME')
BASIC_PASSWORD = config('BASIC_PASSWORD')


def getUserById(id):
    r = requests.get(url=URL + "/user/{}".format(id), auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def createUser(data):
    r = requests.post(url=URL + "/user/create", json=data, auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def getPair(pair):
    r = requests.get(url=URL + "/crypto/pair/{}".format(pair), auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def buyCrypto(data):
    r = requests.post(url=URL + "/crypto/buy", json=data, auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def sellCrypto(data):
    r = requests.post(url=URL + "/crypto/sell", json=data, auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def exchangeCrypto(data):
    r = requests.post(url=URL + "/crypto/exchange", json=data, auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def generateVoucher(data):
    r = requests.post(url=URL + "/voucher/generate", json=data, auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def redeemVoucher(data):
    r = requests.post(url=URL + "/voucher/redeem", json=data, auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def getWallets(id):
    r = requests.get(url=URL + "/balances/{}".format(id), auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()


def getPendingWithdrawals(id):
    r = requests.get(url=URL + "/balances/withdrawals/pending/{}".format(id), auth=(BASIC_USERNAME, BASIC_PASSWORD))
    return r.json()
