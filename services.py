import mysql.connector
import os
from decouple import Config, RepositoryEnv

DB_DOTENV_FILE = str(os.getcwd()) + '/db.env'
env_config = Config(RepositoryEnv(DB_DOTENV_FILE))

db = mysql.connector.connect(
    host="localhost",
    user="localhost",
    passwd=env_config.get("PASSWORD"),
    database=env_config.get("DATABASE")
)
