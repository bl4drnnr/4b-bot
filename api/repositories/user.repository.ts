const knex = require("../src/db/knex.js");
import { IUser } from "../interfaces/user.interface";

export const getUserById = async (userid: string) => {
    return await knex("users").where("userid", userid).first();
};

export const createUser = async (user: IUser) => {
    return await knex("users").insert(user);
};
