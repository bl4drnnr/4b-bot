const dotevn = require("dotenv");
const path = require("path");

dotevn.config({
    path: path.resolve(path.resolve(), "../.env")
})

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            port: process.env.DATABASE_PORT
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
