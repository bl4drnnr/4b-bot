import * as cryptoRepository from '../repositories/crypto.repository';

export const getAllRates = async () => {
    return await cryptoRepository.getAllPairs()
};

export const getPair = async (pair: string) => {
    return await cryptoRepository.getPair(pair);
};

export const updateRates = async (data: object) => {
    try {

    } catch (error) {
        console.log(error);
    }
};