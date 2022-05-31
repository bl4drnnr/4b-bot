const dotevn = require("dotenv");
const path = require("path");

dotevn.config({
    path: path.resolve(path.resolve(), "../.env")
})

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DEV_DATABASE_HOST,
            user: process.env.DEV_DATABASE_USERNAME,
            password: process.env.DEV_DATABASE_PASSWORD,
            database: process.env.DEV_DATABASE_DATABASE,
            port: process.env.DEV_DATABASE_PORT
        },
        migrations: {
            tableName: "knex_migrations",
            directory: path.resolve() + "/src/db/migrations"
        },
        seeds: {
            directory: path.resolve() + "/src/db/seeders"
        },
        debug: false
    },
    production: {
        client: "pg",
        connection: {
            host: process.env.PROD_DATABASE_HOST,
            user: process.env.PROD_DATABASE_USERNAME,
            password: process.env.PROD_DATABASE_PASSWORD,
            database: process.env.PROD_DATABASE_DATABASE,
            port: process.env.PROD_DATABASE_PORT
        },
        migrations: {
            tableName: "knex_migrations",
            directory: path.resolve() + "/src/db/migrations"
        },
        seeds: {
            directory: path.resolve() + "/src/db/seeders"
        },
        debug: false
    }
}
