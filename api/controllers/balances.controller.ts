import { Request, Response } from "express";
import * as balancesService from "../services/balances.service";
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "balances-controller", path: "balances" });

export const getClientBalancesById = async (req: Request, res: Response) => {
    try {
        const balances = await balancesService.getClientBalancesById(req.params.id);
        return res.json(balances)
    } catch (e) {
        logger.error(`Error while getting clients balances => ${e}`);
        return res.json({ status: -1 });
    }
};

export const withdrawalCrypto = async (req: Request, res: Response) => {
    try {

    } catch (e) {

    }
};

export const depositCrypto = async (req: Request, res: Response) => {
    try {

    } catch (e) {

    }
};
