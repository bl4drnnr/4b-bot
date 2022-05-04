import { Request, Response } from "express";
import * as positionService from '../services/position.service';

export const createPosition = async (req: Request, res: Response) => {
    const position = await positionService.createPosition(req.body);
    return res.json(position);
};

export const getUserPositionsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const position = await positionService.getUserPositionsById(id);
    return res.json(position);
};

export const updatePosition = async (req: Request, res: Response) => {
    const { id } = req.params;
    const position = await positionService.updatePosition(id, req.body);
    return res.json(position);
};

export const deletePosition = async (req: Request, res: Response) => {
    const { id } = req.params;
    const position = await positionService.deletePosition(id);
    return res.json(position);
};
