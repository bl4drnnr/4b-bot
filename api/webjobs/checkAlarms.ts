import * as alarmService from "../services/alarm.service";
import * as cryptoService from "../services/crypto.service";

const Operations = {
    async getAllNonTriggeredAlarms() {
        return await alarmService.getAllAlarms()
    },
    async notifyUser() {

    },
    async getAllRates() {
        return await cryptoService.getAllRates();
    }
};

(async () => {
    try {
        const allNoneTriggeredAlarms = await Operations.getAllNonTriggeredAlarms()

        process.exit(0)
    } catch (e) {
        process.exit(1)
    }
})();
