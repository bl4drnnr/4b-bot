import { Request, Response } from "express";
import * as userService from '../services/user.service';
import loggerConfig from "../common/logger";

const logger = loggerConfig({ lable: 'user-controller', path: 'user' })

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        logger.info(`Creating user: ${req.body}`)
        return res.json(user);
    } catch (e) {
        logger.error(`Error while creating user => ${e}`)
        return res.json({ error: true })
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    return res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    return res.json(user);
};
