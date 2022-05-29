import * as balanceRepository from "../repositories/balances.repository";
import * as cryptoRepository from "../repositories/crypto.repository";
import * as securityService from "./security.service";

import loggerConfig from "../common/logger";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

const bitcoin = require("bitcoinjs-lib");
const ec = require("ecpair");
const ecc = require("tiny-secp256k1");
const ECPair = ec.ECPairFactory(ecc);

const network = process.env.NODE_ENV === "development" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin

const logger = loggerConfig({ label: "balances-service", path: "balances" });

export const createBtcWallet = async (userid: string) => {
    try {
        const keypair = ECPair.makeRandom({ network });
        const { address } = bitcoin.payments.p2pkh({ pubkey: keypair.publicKey, network });
        
        logger.info(`Creating BTC wallet: ${address} for user with id: ${userid}`);

        const btc = await cryptoRepository.getPair("BTCUSD");
        
        return await balanceRepository.createBalance({ wallet: address, currencyid: btc.id, userid });
    } catch (error: any) {
        logger.error(`error-while-creating-btc-wallet => ${error}`);
        throw Error("error-while-creating-btc-wallet");
    }
};

export const getClientBalancesById = async (id: string) => {
    try {
        const encryptedId = securityService.encrypt(id);
        logger.info(`Getting balances for user: ${encryptedId}`);
        return await balanceRepository.getClientBalancesById(encryptedId);
    } catch (error: any) {
        logger.error(`error-while-getting-clients-balances => ${error}`);
        throw Error("error-while-getting-clients-balances");
    }
};

export const getAllBalances = async () => {
    try {
        return balanceRepository.getAllBalances();
    } catch (error: any) {
        logger.error(`error-while-getting-all-balances => ${error}`);
        throw Error("error-while-getting-all-balances");
    }
};
