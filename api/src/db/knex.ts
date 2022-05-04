import path from "path";
import Knex from "knex";
import dotenv from "dotenv";
import knexConfig from "./knexfile";

dotenv.config({
    path: path.resolve(path.resolve(), "../../../.env")
})

const enviroment = process.env.NODE_ENV || "development"

const knex = Knex(knexConfig[enviroment]);

export default knex;

// If I want to make/run migration/seed I need to use this and don't forget about --esm
// export default knexConfig;