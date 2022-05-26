const knex = require("../src/db/knex.js");

export const getClientBalancesById = async (id: string) => {
    return await knex("balances").where("userid", id).select("wallet", "amount");
};

export const createBalance = async (data: object) => {
    return await knex("balances").insert(data);
};
