import * as alarmRepository from '../repositories/alarmRepository';

export const getUserAlarmsById = async (id: string) => {
    try {
        return alarmRepository.getUserAlarmsById(id);
    } catch (error) {

    }
};

export const createAlarm = async (data: object) => {
    try {
        return alarmRepository.createAlarm(data);
    } catch (error) {

    }
};
