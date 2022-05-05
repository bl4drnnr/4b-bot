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
        const { id } = req.params;

        logger.info(`Getting user postioins by id: ${id}`);

        const position = await positionService.getUserPositionsById(id);
        return res.json(position);
    } catch (e) {
        logger.error(`Error white getting user positions => ${e}`);
        return res.json({ status: -1 });
    }
};

export const updatePosition = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        logger.info(`Updating position by id: ${id}`);

        const position = await positionService.updatePosition(req.body);
        return res.json(position);
    } catch (e) {
        logger.error(`Error white updating user positions => ${e}`);
        return res.json({ status: -1 });
    }
};

export const deletePosition = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        logger.info(`Deleting position by id: ${id}`);

        const position = await positionService.deletePosition(req.body);
        return res.json(position);
    } catch (e) {
        logger.error(`Error while deleting position => ${e}`);
        return res.json({ status: -1 })
    }
};
