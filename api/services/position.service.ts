import * as positionRepository from '../repositories/position.repository';

export const getUserPositionsById = async (id: string) => {
    try {
        return await positionRepository.getUserPositionsById(id);
    } catch (error) {
        console.log(error);
    }
};

export const createPosition = async (data: object) => {
    try {
        return await positionRepository.createPosition(data);
    } catch (error) {
        console.log(error);
    }
};

export const updatePosition = async (id: string, data: object) => {
    try {
        return await positionRepository.updatePosition(id, data);
    } catch (error) {
        console.log(error);
    }
};

export const deletePosition = async (id: string) => {
    try {
        return await positionRepository.deletePosition(id);
    } catch (error) {
        console.log(error);
    }
};