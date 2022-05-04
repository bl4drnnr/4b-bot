const Knex = require("knex");
const knexConfig = require('./../../knexfile.js');
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve(path.resolve(), "../../../.env")
})

const environment = process.env.NODE_ENV || 'development'

const knex = Knex(knexConfig[environment]);

module.exports = knex;
