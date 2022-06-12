import * as voucherRepository from "../repositories/voucher.repository";
import * as securityService from "./security.service";
import * as userService from "./user.service";
import { IVoucher } from "../interfaces/voucher.interface";

import moment from "moment";

import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "voucher-service", path: "vouchers" });

export const getVouchersByClientId = async (userid: string) => {
    try {
        const encryptedId = securityService.encrypt(userid);
        logger.info(`Getting vouchers for user: ${encryptedId}`);
        const encryptedVouchers = await voucherRepository.getVouchersByClientId(encryptedId)

        // logger.info(`Decrypting vouchers for user: ${encryptedId}`);
        // encryptedVouchers.forEach((voucher: IVoucher) => {
        //     voucher.codeenc = securityService.decryptVoucher(voucher.codeenc, voucher.userid)
        // });

        return encryptedVouchers;
    } catch (error: any) {
        logger.error(`error-while-getting-clients-vouchers => ${error}`);
        throw Error("error-while-getting-clients-vouchers");
    }
};

export const generateVoucher = async (userid: string, crypto: string, amount: string) => {
    try {
        const pureVoucher = moment().unix().toString() + userid + crypto + amount;

        logger.info(`Generating voucher by ${userid} for ${amount} ${crypto}`);

        const encryptedVoucher = securityService.encrypt(pureVoucher);
        const encryptedVoucherFingerprint = securityService.voucherHash(encryptedVoucher);

        return await voucherRepository.generateVoucher({
            amount: parseFloat(amount),
            codeenc: encryptedVoucher,
            fingerprint: encryptedVoucherFingerprint,
            symbol: crypto,
            userid
        });
    } catch (error: any) {
        logger.error(`error-while-generating-voucher => ${error}`);
        throw Error("error-while-generating-voucher");
    }
};

export const redeemVoucher = async (voucher: string, userid: string) => {
    try {
        const encryptedId = securityService.encrypt(userid);
        logger.info(`User ${encryptedId} is reedeming voucher: ${voucher}`);

        const checkUser = await userService.getUserById(encryptedId);
        if (!checkUser) {
            logger.warn(`There is no such user: ${encryptedId}`);
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
