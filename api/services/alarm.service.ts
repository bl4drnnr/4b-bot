import * as alarmRepository from '../repositories/alarm.repository';
import loggerConfig from "../common/logger";
import { Alarm } from '../interfaces/alarm.interface';

const logger = loggerConfig({ label: 'alarm-service', path: 'alarm' });

export const getUserAlarmsById = async (id: string) => {
    try {
        return await alarmRepository.getUserAlarmsById(id);
    } catch (error: any) {
        logger.error(`error-while-getting-alarms-by-id => ${error.sqlMessage}`);
        throw Error("error-while-getting-alarms-by-id");
    }
};

export const createAlarm = async (alarm: Alarm) => {
    try {
        return await alarmRepository.createAlarm(alarm);
    } catch (error: any) {
        logger.error(`error-while-creating-alarm => ${error.sqlMessage}`);
        throw Error("error-while-creating-alarm");
    }
};

export const updateAlarm = async (alarm: Alarm) => {
    try {
        return await alarmRepository.updateAlarm(alarm);
    } catch (error: any) {
        logger.error(`error-while-updating-alarm => ${error.sqlMessage}`);
        throw Error("error-while-updating-alarm");
    }
}

export const deleteAlarm = async (alarm: Alarm) => {
    try {
        return await alarmRepository.deleteAlarm(alarm);
    } catch (error: any) {
        logger.error(`error-while-deleting-alarm => ${error.sqlMessage}`);
        throw Error("error-while-deleting-alarm");
    }
}