import * as userRepository from '../repositories/user.repository';

export const getUserById = async (id: string) => {
    try {
        return await userRepository.getUserById(id);
    } catch (error) {
        console.log(error);
    }
};

export const createUser = async (data: object) => {
    try {
        return await userRepository.createUser(data);
    } catch (error) {
        console.log(error)
    }
};

export const updateUser = async (id: string, data: object) => {
    try {
        return await userRepository.updateUser(id, data);
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (id: string) => {
    try {
        return await userRepository.deleteUser(id);
    } catch (error) {
        console.log(error);
    }
}
