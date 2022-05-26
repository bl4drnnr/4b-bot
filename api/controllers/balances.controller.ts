import { Request, Response } from "express";
import * as balancesService from "../services/balances.service";
import * as securityService from "../services/security.service";
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "balances-controller", path: "balances" });

export const getClientBalancesById = async (req: Request, res: Response) => {
    try {
        const encryptedId = securityService.encrypt(req.params.id)
        return balancesService.getClientBalancesById(req.params.id);
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
