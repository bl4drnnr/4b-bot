import mysql.connector
import os
from decouple import Config, RepositoryEnv

DB_DOTENV_FILE = str(os.getcwd()) + '/db.env'
env_config = Config(RepositoryEnv(DB_DOTENV_FILE))

db = mysql.connector.connect(
    host=(env_config.get("PROD_HOST"), env_config.get("DEV_HOST"))[env_config.get("APP_ENV") == 'development'],
    user="root",
    password=env_config.get("MYSQL_PASSWORD"),
    database=env_config.get("MYSQL_DATABASE"),
)


def postAlarm():
    return None


def getAlarm():
    return None
