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
        const { userid, crypto, amount } = req.body;
        const generatedVoucher = await voucherService.generateVoucher(userid, crypto, amount);
        return res.json(generatedVoucher);
    } catch (e) {
        logger.error(`Error while generating voucher => ${e}`);
        return res.json({ status: -1 });
    }
};

export const redeemVoucher = async (req: Request, res: Response) => {
    try {
        const result = await voucherService.redeemVoucher(req.body.voucher, req.body.userid);
        return res.json(result);
    } catch (e) {
        logger.error(`Error while redeeming voucher => ${e}`);
        return res.json({ status: -1 });
    }
};
