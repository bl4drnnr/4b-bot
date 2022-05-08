import * as cryptoService from "../services/crypto.service";
import * as serverApi from "../server/api";
import { ICryptoPair } from "../interfaces/crypto.interface";

const Operations = {
    async getUpdatedCryptoRates() {
        return await serverApi.updateRates(); 
    },
    async updateCryptoRates(rates: ICryptoPair[]) {
        return await cryptoService.updateRates(rates);
    }
};

(async () => {
    try {
        const { data } = await Operations.getUpdatedCryptoRates();

        const updatedRates = JSON.parse(data.updatedPairs);
        updatedRates.forEach((pair: any) => {
            Object.entries(pair).forEach((item: any) => {
                if (item[0] !== 'symbol') pair[item[0]] = parseFloat(item[1])
            })
        });
        await Operations.updateCryptoRates(updatedRates);
        process.exit(0);
    } catch (e) {
        process.exit(0);
    }
})()