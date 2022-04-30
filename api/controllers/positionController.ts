import { Request, Response } from "express";
import * as positionService from '../services/positionService';

export const getUserPositionsById = async (req: Request, res: Response) => {
    try {
        return await positionService.getUserPositionsById(req.params.id);
    } catch (error) {

    }
};

export const createPosition = async (req: Request, res: Response) => {
    try {
        return await positionService.createPosition(req.body);
    } catch (error) {

    }
};
