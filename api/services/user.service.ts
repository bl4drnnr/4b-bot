import * as userRepository from '../repositories/user.repository';

export const getUserById = async (id: string) => {
    try {
        return userRepository.getUserById(id);
    } catch (error) {

    }
};

export const createUser = async (data: object) => {
    try {
        return userRepository.createUser(data);
    } catch (error) {

    }
};
