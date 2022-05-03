import knex from 'knex';
import knexConfigs from './knexconfig';
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(path.resolve(), "../../../.env")
})

const config = knexConfigs[process.env.NODE_ENV || 'development']

const db = knex(config);

export default db;