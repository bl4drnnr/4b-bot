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

export const createUser = async (data: User) => {
    try {
        logger.info(`Check while creating if user with this id already exists: ${data.id}`)
        const user = await getUserById(data.id);

        if (user) return user

        return await userRepository.createUser(data);
    } catch (error: any) {
        logger.error(`error-while-creating-user => ${error.sqlMessage}`);
        throw Error("error-while-creating-user");
    }
};

export const updateUser = async (id: string, data: object) => {
    try {
        logger.info(`Check while creating if user with this id already exists: ${id}`)
        const user = await getUserById(id);

        if (!user) {
            logger.warn(`User with id: ${id} doesn't exists`)
            return
        }

        return await userRepository.updateUser(id, data);
    } catch (error: any) {
        logger.error(`error-while-updating-user => ${error.sqlMessage}`);
        throw Error("error-while-updating-user");
    }
};

export const deleteUser = async (id: string) => {
    try {
        logger.info(`Check while creating if user with this id already exists: ${id}`)
        const user = await getUserById(id);

        if (!user) {
            logger.warn(`User with id: ${id} doesn't exists`)
            return
        }

        return await userRepository.deleteUser(id);
    } catch (error: any) {
        logger.error(`error-while-deleting-user => ${error.sqlMessage}`);
        throw Error("error-while-deleting-user");
    }
};
