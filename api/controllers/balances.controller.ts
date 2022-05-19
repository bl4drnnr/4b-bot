import { Request, Response } from "express";
import * as balancesService from "../services/balances.service";
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "balances-controller", path: "balances" });

export const getClientBalancesById = async (req: Request, res: Response) => {
    try {
        return balancesService.getClientBalancesById(req.params.id);
    } catch (e) {
        logger.error(`Error while getting clients balances => ${e}`);
        return res.json({ status: -1 });
    }
};
