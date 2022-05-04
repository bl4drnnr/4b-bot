const knex = require('../src/db/knex.js')

export const getUserById = async (id: string) => {
    return await knex('test').select('*')
};

export const createUser = async (data: object) => {
    return await knex('users').insert(data)
};
