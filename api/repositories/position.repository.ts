const knex = require("../src/db/knex.js");
const uuid = require("uuid");

export const getUserPositionsById = async (id: string) => {
    return await knex('positions').where("id", id).first();
};

export const createPosition = async (data: object) => {
    return await knex('positions').insert(data);
};

export const updatePosition = async (id: string, data: object) => {
    return await knex('positions').update(data).where("id", id);
};

export const deletePosition = async (id: string) => {
    return await knex('positions').del().where("id", id);
};