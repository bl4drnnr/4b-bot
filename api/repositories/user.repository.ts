import db from "../src/db/knex";

export const getUserById = (id: string) => {

};

export const createUser = (data: object) => {
    return db('users').insert({id: 'asd', userid: 'ds'})
};
