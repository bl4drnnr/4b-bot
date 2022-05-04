import * as alarmRepository from '../repositories/alarm.repository';

export const getUserAlarmsById = async (id: string) => {
    try {
        return await alarmRepository.getUserAlarmsById(id);
    } catch (error) {
        console.log(error);
    }
};

export const createAlarm = async (data: object) => {
    try {
        return await alarmRepository.createAlarm(data);
    } catch (error) {
        console.log(error);
    }
};

export const updateAlarm = async (id: string, data: object) => {
    try {
        return await alarmRepository.updateAlarm(id, data);
    } catch (error) {
        console.log(error);
    }
}

export const deleteAlarm = async (id: string) => {
    try {
        return await alarmRepository.deleteAlarm(id);
    } catch (error) {
        console.log(error);
    }
}