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
        database=env_config.get("MYSQL_DATABASE"),
    )
    cursor = db.cursor()
except mysql.connector.Error as err:
    print(err)


def postAlarm(cryptopair, price, uid):
    addAlarm = "INSERT INTO alarms (userid, crypto, triggerprice) VALUES (%s, %s, %s)"
    dataAlarm = (uid, cryptopair, price)
    return cursor.execute(addAlarm, dataAlarm)


def getAlarm():
    return None
