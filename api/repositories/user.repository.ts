const knex = require('../src/db/knex.js');
const uuid = require('uuid');

export const getUserById = async (id: string) => {
    return await knex('users').where('id', id).first();
};

export const createUser = async (data: object) => {
    return await knex('users').insert(data);
};

export const updateUser = async (id: string, data: object) => {
    return await knex('users').update(data).where('userid', id);
};

export const deleteUser = async (id: string) => {
    return await knex('users').del().where('userid', id);
};