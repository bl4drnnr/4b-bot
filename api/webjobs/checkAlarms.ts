import * as alarmService from "../services/alarm.service";
import * as cryptoService from "../services/crypto.service";
import * as serverApi from "../server/api";
import { IAlarm } from "../interfaces/alarm.interface";

const Operations = {
    async getAllNonTriggeredAlarms() {
        return await alarmService.getAllAlarms();
    },
    async notifyUser(data: object) {
        return await serverApi.notifyUser(data);
    },
    async getAllRates() {
        return await cryptoService.getAllRates();
    },
    async markTriggeredAlarms(alarms: IAlarm[]) {
        return await alarmService.markTriggeredAlarms(alarms);
    }
};

(async () => {
    try {
        const allNoneTriggeredAlarms = await Operations.getAllNonTriggeredAlarms();
        const allCurrentRates = await Operations.getAllRates();

        allNoneTriggeredAlarms.forEach((alarm: IAlarm) => {

            const onShort = alarm.triggerprice < alarm.indexprice

            allCurrentRates.forEach(async (rate: any) => {
                if (alarm.pair === rate.symbol) {
                    let type = null
                    if (onShort && rate.index_price <= alarm.triggerprice) {
                        // Notify user with hit short
                        type = 'short'
                    } else if (!onShort && rate.index_price >= alarm.triggerprice) {
                        // Notify user with hit long
                        type = 'long'
                    }
                    if (type) {
                        await Operations.notifyUser({
                            type, userid: alarm.userid
                        })
                    }
                }
            })

        });

        process.exit(0);
    } catch (e) {
        process.exit(0);
    }
})();
