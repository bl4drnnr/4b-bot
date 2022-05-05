import * as userRepository from '../repositories/user.repository';
import loggerConfig from "../common/logger";
import { User } from '../interfaces/user.interface';

const logger = loggerConfig({ label: 'user-service', path: 'user' });

export const getUserById = async (id: string) => {
    try {
        return await userRepository.getUserById(id);
    } catch (error: any) {
        logger.error(`error-while-getting-user-by-id => ${error.sqlMessage}`);
        throw Error("error-while-getting-user-by-id");
    }
};

export const createUser = async (user: User) => {
    try {
        logger.info(`Check while creating if user with this id already exists: ${user.id}`)
        const foundUser = await getUserById(user.id);

        if (foundUser) return foundUser

        return await userRepository.createUser(user);
    } catch (error: any) {
        logger.error(`error-while-creating-user => ${error.sqlMessage}`);
        throw Error("error-while-creating-user");
    }
};

export const updateUser = async (user: User) => {
    try {
        logger.info(`Check while creating if user with this id already exists: ${user.id}`)
        const foundUser = await getUserById(user.id);

        if (!foundUser) {
            logger.warn(`User with id: ${user.id} doesn't exists`)
            return
        }

        return await userRepository.updateUser(user);
    } catch (error: any) {
        logger.error(`error-while-updating-user => ${error.sqlMessage}`);
        throw Error("error-while-updating-user");
    }
};

export const deleteUser = async (user: User) => {
    try {
        logger.info(`Check while creating if user with this id already exists: ${user.id}`)
        const foundUser = await getUserById(user.id);

        if (!foundUser) {
            logger.warn(`User with id: ${user.id} doesn't exists`)
            return
        }

        return await userRepository.deleteUser(user);
    } catch (error: any) {
        logger.error(`error-while-deleting-user => ${error.sqlMessage}`);
        throw Error("error-while-deleting-user");
    }
};
