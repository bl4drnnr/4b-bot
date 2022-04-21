from services.database import postAlarm, getAlarms, postPosition, getUserPositions, getUserById, createUser, postTriggeredAlarms, getAllTriggeredAlarms
from services.thread import startNewAlarmThread

# DATABASE


def postUser(userid, name):
    return createUser(userid, name)


def getUser(userid):
    return getUserById(userid)


def setAlarmApi(crypto, triggerPrice, indexPrice, userid):
    return postAlarm(crypto, triggerPrice, indexPrice, userid)


def getAllAlarms(userid):
    return getAlarms(userid)


def setTriggeredAlarms(crypto, currentPrice, triggerPrice, chatid):
    return postTriggeredAlarms(crypto, currentPrice, triggerPrice, chatid)


def getTriggeredAlarms(chatid):
    return getAllTriggeredAlarms(chatid)


def commitPositions(crypto, dateFrom, dateTo, interval, tp, sl):
    return postPosition(crypto, dateFrom, dateTo, interval, tp, sl)


def getPositions(userid):
    return getUserPositions(userid)

# THREADS


def setAlarm(chatid, crypto, triggerPrice, currentPrice):
    return startNewAlarmThread(chatid, crypto, triggerPrice, currentPrice)

