const knex = require("../src/db/knex.js");
import { IBalance } from "../interfaces/balance.interface";

export const getClientBalancesById = async (id: string) => {
    return await knex("balances").where("userid", id)
        .leftJoin("crypto", "crypto.id", "balances.currencyid")
        .select("balances.wallet", "balances.amount", "crypto.symbol");
};

export const createBalance = async (data: IBalance) => {
    return await knex("balances").insert(data);
};

export const getAllBalances = async () => {
    return await knex("balances").select("*");
};

export const updateBalance = async (balance: IBalance) => {
    return await knex("balances").update(balance).where("id", balance.id);
};
