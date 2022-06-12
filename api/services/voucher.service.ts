import * as voucherRepository from "../repositories/voucher.repository";
import * as securityService from "./security.service";
import * as userService from "./user.service";
import * as cryptoService from "./crypto.service";
import { IVoucher } from "../interfaces/voucher.interface";

import moment from "moment";

import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "voucher-service", path: "vouchers" });

export const getVouchersByClientId = async (userid: string) => {
    try {
        const user = await userService.getUserById(userid);
        if (!user) {
            logger.warn(`There is no such user: ${userid}`)
            return { status: -1 }
        }
        
        logger.info(`Getting vouchers for user: ${user.userid}`);
        const vouchers = await voucherRepository.getVouchersByClientId(user.userid);
        vouchers.forEach((voucher: IVoucher) => { voucher.codeenc = securityService.decrypt(voucher.codeenc) })

        return vouchers;
    } catch (error: any) {
        logger.error(`error-while-getting-clients-vouchers => ${error}`);
        throw Error("error-while-getting-clients-vouchers");
    }
};

export const generateVoucher = async (userid: string, crypto: string, amount: string) => {
    try {
        const user = await userService.getUserById(userid);
        if (!user) {
            logger.warn(`There is no such user: ${userid}`)
            return { status: -1 }
        }
        const encriptionString = moment().unix().toString() + user.userid + crypto + amount;

        logger.info(`Generating voucher by user ${user.userid} for ${amount} and ${crypto}`);

        const voucher = securityService.encrypt(encriptionString).slice(0, 32).toUpperCase();
        const encryptedVoucher = securityService.encrypt(voucher);

        const currency = await cryptoService.getPair(crypto + "USD");

        return await voucherRepository.generateVoucher({
            amount: parseFloat(amount),
            codeenc: encryptedVoucher,
            currencyid: currency.id,
            userid: user.userid
        });
    } catch (error: any) {
        logger.error(`error-while-generating-voucher => ${error}`);
        throw Error("error-while-generating-voucher");
    }
};

export const redeemVoucher = async (voucher: string, userid: string) => {
    try {
        const checkUser = await userService.getUserById(userid);
        if (!checkUser) {
            logger.warn(`There is no such user: ${userid}`);
            return { status: -1 }; 
        }

        const encryptedVoucher = securityService.encrypt(voucher)
        const checkVoucher = await voucherRepository.getVoucher(encryptedVoucher);
        if (!checkVoucher) {
            logger.warn(`There is no such voucher: ${voucher}`);
            return { status: -1 };
        }

    } catch (error: any) {
        logger.error(`error-while-redeeming-voucher => ${error}`);
        throw Error("error-while-redeeming-voucher");
    }
};
