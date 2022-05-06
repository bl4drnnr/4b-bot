import * as alarmService from "../services/alarm.service";

const Operations = {
    async getAllNonTriggeredAlarms() {
        return await alarmService.getAllAlarms()
    },
    async notifyUser() {

    },
    async getUpdatedCryptoRates() {
        
    }
};

(async () => {
    try {
        const allNoneTriggeredAlarms = await Operations.getAllNonTriggeredAlarms()

        process.exit(0)
    } catch (e) {
        process.exit(1)
    }
})()