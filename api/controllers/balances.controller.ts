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

export const getAllBalances = async (req: Request, res: Response) => {
    try {
        const allBalances = await balancesService.getAllBalances();
        return res.json(allBalances);
    } catch (e) {
        logger.error(`Error while getting all balances => ${e}`);
        return res.json({ status: -1 });
    }
};

export const getAllPendingWithdrawals = async (req: Request, res: Response) => {
    try {
        const pendingWithdrawals = await balancesService.getAllPendingWithdrawals(req.params.id);
        return res.json(pendingWithdrawals);
    } catch (e) {
        logger.error(`Error while withdrawal crypto => ${e}`);
        return res.json({ status: -1 });
    }
};

export const updateWallets = async (req: Request, res: Response) => {
    try {
        logger.info("Updating wallets...");
        return await balancesService.updateBalances(req.body.wallets);
    } catch (e) {
        logger.error(`Error while updating wallets => ${e}`);
        return res.json({ status: -1 });
    }
};

export const withdrawalCrypto = async (req: Request, res: Response) => {
    try {
        const result = await balancesService.withdrawalCrypto(req.body);
        return res.json(result);
    } catch (e) {
        logger.error(`Error while withdrawal crypto => ${e}`);
        return res.json({ status: -1 });
    }
};

export const getHistory = async (req: Request, res: Response) => {
    try {
        const history = await balancesService.getHistory(req.params.id);
        return res.json(history);
    } catch (e) {
        logger.error(`Error while getting history => ${e}`);
        return res.json({ status: -1 });
    }
};
