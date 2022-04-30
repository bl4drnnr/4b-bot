import * as positionRepository from '../repositories/positionRepository';

export const getAllUserPositionById = async (id: string) => {
    try {
        return positionRepository.getAllUserPositionById(id);
    } catch (error) {

    }
};

export const createPosition = async (data: object) => {
    try {
        return positionRepository.createPosition(data);
    } catch (error) {

    }
}