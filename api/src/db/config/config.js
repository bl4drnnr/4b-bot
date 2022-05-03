import { getDbConfig } from '../../../config/index'

const options = {
  username: getDbConfig().username,
  password: getDbConfig().password,
  database: getDbConfig().database,
  host: getDbConfig().hostname,
  port: getDbConfig().port,
  dialect: getDbConfig().dialect,
  dialectOptions: {
    encrypt: true,
    decimalNumbers: true
  }
}

export const development = options
export const production = options
