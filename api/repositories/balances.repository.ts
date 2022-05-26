const knex = require("../src/db/knex.js");

export const getClientBalancesById = async (id: string) => {
    return await knex("balances").where("userid", id).select("*");
};

export const createBalance = async (data: object) => {
    return await knex("balances").insert(data);
};

export const getCurrencyByName = async (name: string) => {
    return await knex("availablecurrencies").where("name", name).first();
};

export const updateAvailableCurrencies = async (data: object[]) => {
    await knex("availablecurrencies").del("*")
    return await knex("availablecurrencies").insert(data)
};
