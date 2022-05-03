import path from 'path';
import dotenv from 'dotenv';



dotenv.config({
    path: path.resolve(path.resolve(), '../../.env')
});

export default {
    getDbConfig() {
        return {
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            dialect: process.env.MYSQL_DIALECT
        }
    },
    getAppEnv() {
        return process.env.NODE_ENV
    }
}