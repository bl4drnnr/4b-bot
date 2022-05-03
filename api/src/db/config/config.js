import config from '../../../config/index.js'

const options = {
  username: config.getDbConfig().username,
  password: config.getDbConfig().password,
  database: config.getDbConfig().database,
  host: config.getDbConfig().hostname,
  port: config.getDbConfig().port,
  dialect: config.getDbConfig().dialect,
  dialectOptions: {
    encrypt: true,
    decimalNumbers: true
  }
}

export default { 
  development: options, 
  production: options
}
