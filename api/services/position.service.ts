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

export const createPosition = async (position: Position) => {
    try {
        return await positionRepository.createPosition(position);
    } catch (error: any) {
        logger.error(`error-while-creating-position => ${error.sqlMessage}`);
        throw Error("error-while-creating-position");
    }
};

export const updatePosition = async (position: Position) => {
    try {
        return await positionRepository.updatePosition(position);
    } catch (error: any) {
        logger.error(`error-while-updating-position => ${error.sqlMessage}`);
        throw Error("error-while-updating-position");
    }
};

export const deletePosition = async (position: Position) => {
    try {
        return await positionRepository.deletePosition(position);
    } catch (error: any) {
        logger.error(`error-while-deleting-position => ${error.sqlMessage}`);
        throw Error("error-while-deleting-position");
    }
};