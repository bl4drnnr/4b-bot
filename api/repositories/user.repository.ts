const knex = require('../src/db/knex.js');
import { IUser } from "../interfaces/user.interface";

export const getUserById = async (id: string) => {
    return await knex('users').where('id', id).first();
};

export const createUser = async (user: IUser) => {
    return await knex('users').insert(user);
};

export const updateUser = async (user: IUser) => {
    return await knex('users').update(user).where('userid', user.id);
};

export const deleteUser = async (user: IUser) => {
    return await knex('users').del().where('userid', user.id);
};