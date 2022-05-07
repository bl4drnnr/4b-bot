import moment from 'moment';
import * as alarmRepository from '../repositories/alarm.repository';
import loggerConfig from "../common/logger";
import { IAlarm } from '../interfaces/alarm.interface';

const logger = loggerConfig({ label: 'alarm-service', path: 'alarm' });

export const getAllAlarms = async () => {
    try {
        logger.info("Getting all alarms for job to check...");
        return await alarmRepository.getAllAlarms();
    } catch (error: any) {
        logger.error(`error-while-getting-all-alarms => ${error.sqlMessage}`);
        throw Error("error-while-getting-all-alarms");
    }
}

export const getUserAlarmsById = async (id: string) => {
    try {
        const alarms = await alarmRepository.getUserAlarmsById(id);
        alarms.forEach((alarm: IAlarm) => {
            alarm.createdAt = moment(alarm.createdAt).format('YYYY-MM-DD HH:mm:ss')
        });
        return alarms;
    } catch (error: any) {
        logger.error(`error-while-getting-alarms-by-id => ${error.sqlMessage}`);
        throw Error("error-while-getting-alarms-by-id");
    }
};

export const createAlarm = async (alarm: IAlarm) => {
    try {
        return await alarmRepository.createAlarm(alarm);
    } catch (error: any) {
        logger.error(`error-while-creating-alarm => ${error.sqlMessage}`);
        throw Error("error-while-creating-alarm");
    }
};

export const updateAlarm = async (alarm: IAlarm) => {
    try {
        return await alarmRepository.updateAlarm(alarm);
    } catch (error: any) {
        logger.error(`error-while-updating-alarm => ${error.sqlMessage}`);
        throw Error("error-while-updating-alarm");
    }
};

export const deleteAlarm = async (alarm: IAlarm) => {
    try {
        return await alarmRepository.deleteAlarm(alarm);
    } catch (error: any) {
        logger.error(`error-while-deleting-alarm => ${error.sqlMessage}`);
        throw Error("error-while-deleting-alarm");
    }
};