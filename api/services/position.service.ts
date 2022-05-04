import * as positionRepository from '../repositories/position.repository';

export const getUserPositionsById = async (id: string) => {
    try {
        return positionRepository.getUserPositionsById(id);
    } catch (error) {
        console.log(error)
    }
};

export const createPosition = async (data: object) => {
    try {
        return positionRepository.createPosition(data);
    } catch (error) {
        console.log(error)
    }
};