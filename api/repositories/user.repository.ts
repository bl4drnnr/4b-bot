const knex = require('../src/db/knex.js')

export const getUserById = async (id: string) => {
    const test = await knex('test').select('*')
    console.log(test)
    return test
};

export const createUser = (data: object) => {

};
