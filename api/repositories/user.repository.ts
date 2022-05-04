import knex from "../src/db/knex";

export const getUserById = (id: string) => {

};

export const createUser = (data: object) => {
    return knex('users').select('*')
};
