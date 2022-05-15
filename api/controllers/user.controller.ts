import { Request, Response } from "express";
import * as userService from "../services/user.service";
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "user-controller", path: "user" })

export const createUser = async (req: Request, res: Response) => {
    try {
        logger.info(`Creating user with id: ${req.body.id}`);
        await userService.createUser(req.body);

        return res.json({ status: 1 });
    } catch (e) {
        logger.error(`Error while creating user => ${e}`);
        return res.json({ status: -1 });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        logger.info(`Getting user by id: ${req.params.id}`);

        const user = await userService.getUserById(req.params.id);

        return res.json(user || { status: 0 });
    } catch (e) {
        logger.error(`Error while getting user by id => ${e}`);
        return res.json({ status: -1 });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        logger.info(`Updating user by id: ${req.body.id}`);

        const user = await userService.updateUser(req.body.id);

        return res.json(user);
    } catch (e) {
        logger.error(`Error while updating user => ${e}`);
        return res.json({ status: -1 });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        logger.info(`Delete user with id: ${req.body.id}`);
        
        const user = await userService.deleteUser(req.body.id);
        
        return res.json(user);
    } catch (e) {
        logger.error(`Error while deleting user => ${e}`);
        return res.json({ status: -1 });
    }
};
