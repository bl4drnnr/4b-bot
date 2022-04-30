import * as positionRepository from '../repositories/positionRepository';

export const getUserPositionsById = async (id: string) => {
    try {
        return positionRepository.getUserPositionsById(id);
    } catch (error) {

    }
};

export const createPosition = async (data: object) => {
    try {
        return positionRepository.createPosition(data);
    } catch (error) {

    }
};