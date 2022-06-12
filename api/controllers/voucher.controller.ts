import { Request, Response } from "express";
import * as voucherService from "../services/voucher.service";
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "voucher-controller", path: "voucher" });

export const getVouchersByClientId = async (req: Request, res: Response) => {
    try {
        const vouchers = await voucherService.getVouchersByClientId(req.params.id);
        return res.json(vouchers);
    } catch (e) {
        logger.error(`Error while getting vouchers => ${e}`);
        return res.json({ status: -1 });
    }
};

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
