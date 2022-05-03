import { Request, Response } from "express";
import * as positionService from '../services/position.service';

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
