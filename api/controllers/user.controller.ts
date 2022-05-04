import { Request, Response } from "express";
import * as userService from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    return res.json(user);
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
