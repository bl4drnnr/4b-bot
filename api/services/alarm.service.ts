import moment from "moment";
import * as alarmRepository from "../repositories/alarm.repository";
import loggerConfig from "../common/logger";
import { IAlarm } from "../interfaces/alarm.interface";

const logger = loggerConfig({ label: "alarm-service", path: "alarm" });

export const getAllAlarms = async () => {
    try {
        return await alarmRepository.getAllAlarms();
    } catch (error: any) {
        logger.error(`error-while-getting-all-alarms => ${error}`);
        throw Error("error-while-getting-all-alarms");
    }
};

export const getUserAlarmsById = async (id: string) => {
    try {
        const alarms = await alarmRepository.getUserAlarmsById(id);
        alarms.forEach((alarm: IAlarm) => {
            alarm.createdat = moment(alarm.createdat).format("YYYY-MM-DD HH:mm:ss")
        });
        return alarms;
    } catch (error: any) {
        logger.error(`error-while-getting-alarms-by-id => ${error}`);
        throw Error("error-while-getting-alarms-by-id");
    }
};

export const createAlarm = async (alarm: IAlarm) => {
    try {
        return await alarmRepository.createAlarm(alarm);
    } catch (error: any) {
        logger.error(`error-while-creating-alarm => ${error}`);
        throw Error("error-while-creating-alarm");
    }
};

export const deleteAlarm = async (alarm: IAlarm) => {
    try {
        return await alarmRepository.deleteAlarm(alarm);
    } catch (error: any) {
        logger.error(`error-while-deleting-alarm => ${error}`);
        throw Error("error-while-deleting-alarm");
    }
};

export const markTriggeredAlarms = async (alarms: IAlarm[]) => {
    try {
        return await alarmRepository.markTriggeredAlarms(alarms);
    } catch (error: any) {
        logger.error(`error-while-marking-triggered-alarms => ${error}`);
        throw Error("error-while-marking-triggered-alarms");
    }
}
