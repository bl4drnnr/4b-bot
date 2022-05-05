import { Request, Response } from "express";
import * as userService from '../services/user.service';
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: 'user-controller', path: 'user' })

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);

        logger.info(`Creating user: ${req.body}`);

        return res.json(user);
    } catch (e) {
        logger.error(`Error while creating user => ${e}`);
        return res.json({ status: -1 });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        logger.info(`Getting user by id: ${id}`);

        const user = await userService.getUserById(id);

        return res.json(user || { status: 0 });
    } catch (e) {
        logger.error(`Error while getting user by id => ${e}`);
        return res.json({ status: -1 });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        logger.info(`Updating user by id: ${id}`);

        const user = await userService.updateUser(req.body);
        return res.json(user);
    } catch (e) {
        logger.error(`Error while updating user => ${e}`);
        return res.json({ status: -1 });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        logger.info(`Delete user with id: ${id}`);
        
        const user = await userService.deleteUser(id);
        return res.json(user);
    } catch (e) {
        logger.error(`Error while deleting user => ${e}`);
        return res.json({ status: -1 });
    }
};
