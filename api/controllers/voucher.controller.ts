import { Request, Response } from "express";
import * as voucherService from "../services/voucher.service";
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "voucher-controller", path: "voucher" });

export const generateVoucher = async (req: Request, res: Response) => {
    try {

    } catch (e) {
        logger.error(`Error while generating voucher => ${e}`);
        return res.json({ status: -1 });
    }
};

export const redeemVoucher = async (req: Request, res: Response) => {
    try {
         
    } catch (e) {
        logger.error(`Error while redeeming voucher => ${e}`);
        return res.json({ status: -1 });
    }
};