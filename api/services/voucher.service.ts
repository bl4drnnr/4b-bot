import * as voucherRepository from "../repositories/voucher.repository";
import * as securityService from "./security.service";
import * as userService from "./user.service";
import { IVoucher } from "../interfaces/voucher.interface";

import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "voucher-service", path: "vouchers" });

const getVoucher = async (voucher: string) => {
    try {
        return await voucherRepository.getVoucher(voucher);
    } catch (error: any) {
        logger.error(`error-while-getting-clients-voucher => ${error}`);
        throw Error("error-while-getting-clients-voucher");
    }
};

export const getVouchersByClientId = async (userid: string) => {
    try {
        const encryptedId = securityService.encrypt(userid);
        logger.info(`Getting vouchers for user: ${encryptedId}`);
        const encryptedVouchers = await voucherRepository.getVouchersByClientId(encryptedId)

        logger.info(`Decrypting vouchers for user: ${encryptedId}`);
        encryptedVouchers.forEach((voucher: IVoucher) => {
            voucher.codeenc = securityService.decryptVoucher(voucher.codeenc, voucher.createdat.toString(), voucher.userid)
        });
    } catch (error: any) {
        logger.error(`error-while-getting-clients-vouchers => ${error}`);
        throw Error("error-while-getting-clients-vouchers");
    }
};

export const generateVoucher = async () => {
    try {

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

        const checkVoucher = await getVoucher(voucher);
        if (!checkVoucher) {
            logger.warn(`There is no such voucher: ${voucher}`);
            return { status: -1 };
        }

    } catch (error: any) {
        logger.error(`error-while-redeeming-voucher => ${error}`);
        throw Error("error-while-redeeming-voucher");
    }
};
