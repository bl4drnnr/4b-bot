import { Knex, knex } from 'knex'
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(path.resolve(), "../../../.env")
})

const knexConfig: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.resolve() + '/migrations'
    },
    seeds: {
        directory: path.resolve() + '/seeders'
    },
    debug: false
};

export default knexConfig;