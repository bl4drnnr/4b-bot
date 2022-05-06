import { Request, Response } from "express";
import * as cryptoService from "../services/crypto.service";

export const getPair = async (req: Request, res: Response) => {
    const { pair } = req.params
    return await cryptoService.getPair(pair);
};