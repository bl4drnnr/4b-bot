const knex = require("../src/db/knex.js");
const uuid = require("uuid");

export const getPair = async (pair: string) => {
    return await knex('crypto').where("pair", pair).first()
}

export const updateRates = async (data: object) => {
    return await knex('crypto').update(data);
};