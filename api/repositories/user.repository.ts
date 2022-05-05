const knex = require('../src/db/knex.js');
const uuid = require('uuid');
import { User } from "../interfaces/user.interface";

export const getUserById = async (id: string) => {
    return await knex('users').where('id', id).first();
};

export const createUser = async (user: User) => {
    return await knex('users').insert(user);
};

export const updateUser = async (user: User) => {
    return await knex('users').update(user).where('userid', user.id);
};

export const deleteUser = async (user: User) => {
    return await knex('users').del().where('userid', user.id);
};