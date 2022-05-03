require('dotenv').config()

const options = {
  username: conf.getDbConfig().username,
  password: conf.getDbConfig().password,
  database: conf.getDbConfig().database,
  host: conf.getDbConfig().hostname,
  port: conf.getDbConfig().port,
  dialect: conf.getDbConfig().dialect,
  dialectOptions: {
    encrypt: true,
    decimalNumbers: true
  }
}

module.exports = {
  development: options,
  production: options
}
