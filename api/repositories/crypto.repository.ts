const knex = require("../src/db/knex.js");
const uuid = require("uuid");

export const updateRates = async (data: object) => {
    return await knex('crypto').update(data);
};