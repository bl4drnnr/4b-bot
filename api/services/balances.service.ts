import * as balanceRepository from "../repositories/balances.repository";
import loggerConfig from "../common/logger";
const bitcore = require("bitcore-lib");

const logger = loggerConfig({ label: "balances-service", path: "balances" });

export const createBtcWallet = async () => {
    try {
        const randBuffer = bitcore.crypto.Random.getRandomBuffer(32);
        const randNumber = bitcore.crypto.BN.fromBuffer(randBuffer);
        const address = new bitcore.PrivateKey(randNumber).toAddress();
    } catch (error: any) {
        logger.error(`error-while-creating-btc-wallet => ${error}`);
        throw Error("error-while-creating-btc-wallet");
    }
};

export const getClientBalancesById = async (id: string) => {
    try {
        return await balanceRepository.getClientBalancesById(id);
    } catch (error: any) {
        logger.error(`error-while-getting-clients-balances => ${error}`);
        throw Error("error-while-getting-clients-balances");
    }
}