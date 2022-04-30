import { Request, Response } from "express";
import * as userService from '../services/userService';

export const getUserById = async (req: Request, res: Response) => {
    try {
        return await userService.getUserById(req.params.id);
    } catch (error) {
        
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        return await userService.createUser(req.body);
    } catch (error) {

    }
};
