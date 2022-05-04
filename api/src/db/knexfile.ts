import path from "path";
import dotenv from "dotenv";

dotenv.config({
    path: path.resolve(path.resolve(), "../../../.env")
})

interface IKnexConfig {
    [key: string]: object
}

const knexConfig: IKnexConfig = {
    development: {
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
        debug: true
    }
}

export default knexConfig;
