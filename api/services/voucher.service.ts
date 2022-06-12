import * as voucherRepository from "../repositories/voucher.repository";
import * as securityService from "./security.service";
import * as userService from "./user.service";
import * as cryptoService from "./crypto.service";

import moment from "moment";

import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "voucher-service", path: "vouchers" });

export const getVouchersByClientId = async (userid: string) => {
    try {
        const encryptedId = securityService.encrypt(userid);
        logger.info(`Getting vouchers for user: ${encryptedId}`);
        const encryptedVouchers = await voucherRepository.getVouchersByClientId(encryptedId);

        return encryptedVouchers;
    } catch (error: any) {
        logger.error(`error-while-getting-clients-vouchers => ${error}`);
        throw Error("error-while-getting-clients-vouchers");
    }
};

export const generateVoucher = async (userid: string, crypto: string, amount: string) => {
    try {
        const encryptedId = securityService.encrypt(userid.toString());
        const encriptionString = moment().unix().toString() + encryptedId + crypto + amount;

        logger.info(`Generating voucher by user ${encryptedId} for ${amount} and ${crypto}`);

        const encryptedVoucher = securityService.encrypt(encriptionString);
        const encryptedVoucherFingerprint = securityService.voucherHash(
            securityService.encrypt(encryptedVoucher).slice(0, 32).toUpperCase()
        );

        const currency = await cryptoService.getPair(crypto + "USD");

        return await voucherRepository.generateVoucher({
            amount: parseFloat(amount),
            codeenc: securityService.encrypt(encryptedVoucher).slice(0, 32).toUpperCase(),
            fingerprint: encryptedVoucherFingerprint,
            currencyid: currency.id,
            userid: encryptedId
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

        const voucherHashed = securityService.voucherHash(voucher)
        const checkVoucher = await voucherRepository.getVoucherByFingerprint(voucherHashed);
        if (!checkVoucher) {
            logger.warn(`There is no such voucher: ${voucher}`);
            return { status: -1 };
        }

    } catch (error: any) {
        logger.error(`error-while-redeeming-voucher => ${error}`);
        throw Error("error-while-redeeming-voucher");
    }
};
