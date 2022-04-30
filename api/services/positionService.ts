import * as positionRepository from '../repositories/positionRepository';

export const getAllUserPositionById = async (id: string) => {
    try {
        return await positionRepository.getAllUserPositionById(id);
    } catch (error) {

    }
};

export const createPosition = async (data: object) => {
    try {
        return await positionRepository.createPosition(data);
    } catch (error) {

    }
}