import * as cryptoRepository from '../repositories/crypto.repository';
import loggerConfig from "../common/logger";
import { ICryptoPair } from '../interfaces/crypto.interface';
const uuid = require("uuid");

const logger = loggerConfig({ label: 'crypto-service', path: 'crypto' });

export const getAllRates = async () => {
    try {
        return await cryptoRepository.getAllPairs();
    } catch (error: any) {
        logger.error(`error-while-getting-all-rates => ${error.sqlMessage}`);
        throw Error("error-while-getting-all-rates");
    }
};

export const getPair = async (pair: string) => {
    try {
        return await cryptoRepository.getPair(pair);
    } catch (error: any) {
        logger.error(`error-while-getting-pair => ${error.sqlMessage}`);
        throw Error("error-while-getting-pair");
    }
};

export const updateRates = async (data: ICryptoPair[]) => {
    try {
        data.forEach((pair: ICryptoPair) => { pair.id = uuid.v4() });
        return await cryptoRepository.updateRates(data);
    } catch (error: any) {
        logger.error(`error-while-updating-rates => ${error.sqlMessage}`);
        throw Error("error-while-updating-rates");
    }
};
