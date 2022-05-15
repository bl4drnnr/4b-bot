import * as userRepository from "../repositories/user.repository";
import loggerConfig from "../common/logger";
import { IUser } from "../interfaces/user.interface";

const logger = loggerConfig({ label: "user-service", path: "user" });

export const getUserById = async (userid: string) => {
    try {
        return await userRepository.getUserById(userid);
    } catch (error: any) {
        logger.error(`error-while-getting-user-by-id => ${error}`);
        throw Error("error-while-getting-user-by-id");
    }
};

export const createUser = async (user: IUser) => {
    try {
        logger.info(`Check while creating if user with this id already exists: ${user.userid}`)
        const foundUser = await getUserById(user.userid);

        if (foundUser) return foundUser

        return await userRepository.createUser(user);
    } catch (error: any) {
        logger.error(`error-while-creating-user => ${error}`);
        throw Error("error-while-creating-user");
    }
};

export const updateUser = async (user: IUser) => {
    try {
        logger.info(`Check while creating if user with this id already exists: ${user.userid}`)
        const foundUser = await getUserById(user.userid);

        if (!foundUser) {
            logger.warn(`User with id: ${user.userid} doesn"t exists`)
            return
        }

        return await userRepository.updateUser(user);
    } catch (error: any) {
        logger.error(`error-while-updating-user => ${error}`);
        throw Error("error-while-updating-user");
    }
};

export const deleteUser = async (user: IUser) => {
    try {
        logger.info(`Check while creating if user with this id already exists: ${user.userid}`)
        const foundUser = await getUserById(user.userid);

        if (!foundUser) {
            logger.warn(`User with id: ${user.userid} doesn"t exists`)
            return
        }

        return await userRepository.deleteUser(user);
    } catch (error: any) {
        logger.error(`error-while-deleting-user => ${error}`);
        throw Error("error-while-deleting-user");
    }
};
