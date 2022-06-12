import * as voucherRepository from "../repositories/voucher.repository";
import * as securityService from "./security.service";

import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "voucher-service", path: "vouchers" });

export const getVouchersByClientId = async (id: string) => {
    try {
        const encryptedId = securityService.encrypt(id);
        logger.info(`Getting vouchers for user: ${encryptedId}`);
        return await voucherRepository.getVouchersByClientId(encryptedId)
    } catch (error: any) {
        logger.error(`error-while-getting-clients-vouchers => ${error}`);
        throw Error("error-while-getting-clients-vouchers");
    }
};

export const generateVoucher = async () => {
    
}

export const redeemVoucher = async () => {

}
