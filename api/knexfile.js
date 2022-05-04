const dotevn = require("dotenv");
const path = require("path");

dotevn.config({
    path: path.resolve(path.resolve(), "../.env")
})

module.exports = {
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
            directory: path.resolve() + '/src/db/migrations'
        },
        seeds: {
            directory: path.resolve() + '/src/db/seeders'
        },
        debug: false
    }
}
