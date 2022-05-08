import * as cryptoService from "../services/crypto.service";
import { ICryptoPair } from "../interfaces/crypto.interface";

const Operations = {
    async getUpdatedCryptoRates() {
        return []
    },
    async updateCryptoRates(rates: ICryptoPair[]) {
        return await cryptoService.updateRates(rates);
    }
};

(async () => {
    try {
        const updatedRates = await Operations.getUpdatedCryptoRates();
        await Operations.updateCryptoRates(updatedRates);
        process.exit(0);
    } catch (e) {
        process.exit(0);
    }
})()