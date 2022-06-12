const knex = require("../src/db/knex.js");
import { IBalance } from "../interfaces/balance.interface";

export const getClientBalancesById = async (userid: string) => {
    return await knex("balances")
        .where("userid", userid)
        .leftJoin("crypto", "crypto.id", "balances.currencyid")
        .select("balances.wallet", "balances.amount", "crypto.symbol");
};

export const createBalance = async (data: IBalance) => {
    return await knex("balances").insert(data);
};

export const getAllBalances = async () => {
    return await knex("balances")
        .leftJoin("crypto", "crypto.id", "balances.currencyid")
        .select("balances.id", "balances.wallet", "crypto.symbol");
};

export const updateBalance = async (balance: IBalance) => {
    return await knex("balances").update(balance).where("id", balance.id);
};

export const getAllPendingWithdrawals = async (userid: string) => {
    return await knex("withdrawalqueue")
        .where("userid", userid)
        .andWhere("status", "pending")
        .select("*").orderBy("createdat", "desc");
};

export const getHistory = async (userid: string) => {
    return await knex("withdrawalqueue").where("userid", userid).select("*").orderBy("createdat", "desc");
};
