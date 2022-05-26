const knex = require("../src/db/knex.js");

export const getClientBalancesById = async (id: string) => {
    return await knex("balances").where("userid", id)
        .leftJoin("crypto", "crypto.id", "balances.currencyid")
        .select("balances.wallet", "balances.amount", "crypto.symbol");
};

export const createBalance = async (data: object) => {
    return await knex("balances").insert(data);
};
