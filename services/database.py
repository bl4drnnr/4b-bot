import mysql.connector
import os
from decouple import Config, RepositoryEnv

DB_DOTENV_FILE = str(os.getcwd()) + '/db.env'
env_config = Config(RepositoryEnv(DB_DOTENV_FILE))


try:
    db = mysql.connector.connect(
        host=env_config.get("MYSQL_HOST"),
        user="root",
        password=env_config.get("MYSQL_PASSWORD"),
        database=env_config.get("MYSQL_DATABASE")
    )
    cursor = db.cursor(buffered=True)
except mysql.connector.Error as err:
    print(err)


def createUser(uid, name):
    addUser = "INSERT INTO users (id, userid, nickname) VALUES (uuid(), %s, %s)"
    dataUser = (uid, name)
    cursor.execute(addUser, dataUser)
    return db.commit()


def getUserById(uid):
    getUser = f"SELECT * FROM users WHERE userid = '{uid}'"
    user = None
    cursor.execute(getUser)
    for x in cursor:
        user = x
    return user


def postAlarm(cryptopair, price, uid):
    addAlarm = "INSERT INTO alarms (id, userid, crypto, triggerprice) VALUES (uuid(), %s, %s, %s)"
    dataAlarm = (uid, cryptopair, price)
    cursor.execute(addAlarm, dataAlarm)
    return db.commit()


def getAlarms(uid):
    getAllAlarms = f"SELECT crypto, triggerprice, created_at FROM alarms WHERE userid = '{uid}'"
    allAlarms = []
    cursor.execute(getAllAlarms)
    for x in cursor:
        allAlarms.append(x)
    return allAlarms


def postPosition(crypto, dateFrom, dateTo, interval, tp, sl):
    return None


def getUserPositions(uid):
    getAllPositions = f"SELECT * FROM positions WHERE userid = '{uid}'"
    allPositions = []
    cursor.execute(getAllPositions)
    for x in cursor:
        allPositions.append(x)
    return allPositions
