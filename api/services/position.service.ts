import * as positionRepository from '../repositories/position.repository';
import loggerConfig from "../common/logger";
import { Position } from '../interfaces/position.interface';

const logger = loggerConfig({ label: 'position-service', path: 'position' });

export const getUserPositionsById = async (id: string) => {
    try {
        return await positionRepository.getUserPositionsById(id);
    } catch (error: any) {
        logger.error(`error-while-getting-positions-by-user-id => ${error.sqlMessage}`);
        throw Error("error-while-getting-positions-by-user-id");
    }
};

export const createPosition = async (data: object) => {
    try {
        return await positionRepository.createPosition(data);
    } catch (error: any) {
        logger.error(`error-while-creating-position => ${error.sqlMessage}`);
        throw Error("error-while-creating-position");
    }
};

export const updatePosition = async (id: string, data: object) => {
    try {
        return await positionRepository.updatePosition(id, data);
    } catch (error: any) {
        logger.error(`error-while-updating-position => ${error.sqlMessage}`);
        throw Error("error-while-updating-position");
    }
};

export const deletePosition = async (id: string) => {
    try {
        return await positionRepository.deletePosition(id);
    } catch (error: any) {
        logger.error(`error-while-deleting-position => ${error.sqlMessage}`);
        throw Error("error-while-deleting-position");
    }
};