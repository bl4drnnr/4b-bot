const knex = require('../src/db/knex.js');
import { IUser } from "../interfaces/user.interface";

export const getUserById = async (userid: string) => {
    return await knex('users').where('userid', userid).first();
};

export const createUser = async (user: IUser) => {
    return await knex('users').insert(user);
};

export const updateUser = async (user: IUser) => {
    return await knex('users').update(user).where('userid', user.userid);
};

export const deleteUser = async (user: IUser) => {
    return await knex('users').del().where('userid', user.userid);
};