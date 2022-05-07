import { Request, Response } from "express";
import * as positionService from '../services/position.service';
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: 'position-controller', path: 'position' })

export const createPosition = async (req: Request, res: Response) => {
    try {
        const position = await positionService.createPosition(req.body);

        logger.info(`Creating position: ${req.body}`);

        return res.json(position);
    } catch (e) {
        logger.error(`Error whilte creating position => ${e}`);
        return res.json({ status: -1 });
    }
};

export const getUserPositionsById = async (req: Request, res: Response) => {
    try {
        logger.info(`Getting user postioins by id: ${req.params.id}`);

        const position = await positionService.getUserPositionsById(req.params.id);

        return res.json(position);
    } catch (e) {
        logger.error(`Error white getting user positions => ${e}`);
        return res.json({ status: -1 });
    }
};

export const updatePosition = async (req: Request, res: Response) => {
    try {
        logger.info(`Updating position by id: ${req.body.id}`);

        const position = await positionService.updatePosition(req.body);

        return res.json(position);
    } catch (e) {
        logger.error(`Error white updating user positions => ${e}`);
        return res.json({ status: -1 });
    }
};

export const deletePosition = async (req: Request, res: Response) => {
    try {
        logger.info(`Deleting position by id: ${req.body.id}`);

        const position = await positionService.deletePosition(req.body);
        
        return res.json(position);
    } catch (e) {
        logger.error(`Error while deleting position => ${e}`);
        return res.json({ status: -1 })
    }
};
