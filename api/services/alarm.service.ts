import * as alarmRepository from '../repositories/alarm.repository';

export const getUserAlarmsById = async (id: string) => {
    try {
        return alarmRepository.getUserAlarmsById(id);
    } catch (error) {
        console.log(error)
    }
};

export const createAlarm = async (data: object) => {
    try {
        return alarmRepository.createAlarm(data);
    } catch (error) {
        console.log(error)
    }
};
