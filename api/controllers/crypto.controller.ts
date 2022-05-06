import { Request, Response } from "express";
import * as cryptoService from "../services/crypto.service";

export const getPair = async (req: Request, res: Response) => {
    const { pair } = req.params
    return await cryptoService.getPair(pair);
};

export const updateRates = async (req: Request, res: Response) => {
    return await cryptoService.updateRates(req.body);
};