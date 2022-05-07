const knex = require("../src/db/knex.js");
import { ICryptoPair } from "../interfaces/crypto.interface";

export const getAllPairs = async () => {
    return await knex('crypto').select('*');
}

export const getPair = async (pair: string) => {
    return await knex('crypto').where("pair", pair).first();
}

export const updateRates = async (data: ICryptoPair[]) => {
    await knex('crypto').del('*')
    return await knex('crypto').insert(data);
};
