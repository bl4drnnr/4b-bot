import * as userRepository from '../repositories/user.repository';
import loggerConfig from "../common/logger";

const logger = loggerConfig({ lable: 'user-service', path: 'user' });

export const getUserById = async (id: string) => {
    try {
        return await userRepository.getUserById(id);
    } catch (error) {
        logger.error("error-while-getting-user-by-id");
        throw Error("error-while-getting-user-by-id");
    }
};

export const createUser = async (data: object) => {
    try {
        logger.info(`Check if user with this id already exists: ${data.id}`)
        return await userRepository.createUser(data);
    } catch (error) {
        logger.error("error-while-creating-user");
        throw Error("error-while-creating-user");
    }
};

export const updateUser = async (id: string, data: object) => {
    try {
        return await userRepository.updateUser(id, data);
    } catch (error) {
        logger.error("error-while-updating-user");
        throw Error("error-while-updating-user");
    }
};

export const deleteUser = async (id: string) => {
    try {
        return await userRepository.deleteUser(id);
    } catch (error) {
        logger.error("error-while-deleting-user");
        throw Error("error-while-deleting-user");
    }
};
