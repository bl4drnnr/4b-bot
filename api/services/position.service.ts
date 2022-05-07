import * as positionRepository from '../repositories/position.repository';
import loggerConfig from "../common/logger";
import { IPosition } from '../interfaces/position.interface';

const logger = loggerConfig({ label: 'position-service', path: 'position' });

export const getUserPositionsById = async (id: string) => {
    try {
        return await positionRepository.getUserPositionsById(id);
    } catch (error: any) {
        logger.error(`error-while-getting-positions-by-user-id => ${error}`);
        throw Error("error-while-getting-positions-by-user-id");
    }
};

export const createPosition = async (position: IPosition) => {
    try {
        return await positionRepository.createPosition(position);
    } catch (error: any) {
        logger.error(`error-while-creating-position => ${error}`);
        throw Error("error-while-creating-position");
    }
};

export const updatePosition = async (position: IPosition) => {
    try {
        return await positionRepository.updatePosition(position);
    } catch (error: any) {
        logger.error(`error-while-updating-position => ${error}`);
        throw Error("error-while-updating-position");
    }
};

export const deletePosition = async (position: IPosition) => {
    try {
        return await positionRepository.deletePosition(position);
    } catch (error: any) {
        logger.error(`error-while-deleting-position => ${error}`);
        throw Error("error-while-deleting-position");
    }
};