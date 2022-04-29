import * as userRepository from '../repositories/userRepository';

export const getUserById = async (id: string) => {
    try {
        return userRepository.getUserById(id);
    } catch (error) {

    }
}