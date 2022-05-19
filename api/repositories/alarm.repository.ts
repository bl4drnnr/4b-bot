const knex = require("../src/db/knex.js");
import { IAlarm } from "../interfaces/alarm.interface";

export const getAllAlarms = async () => {
    return await knex("alarms").select("*");
}

export const getUserAlarmsById = async (id: string) => {
    return await knex("alarms").where("userid", id).select("*");
};

export const createAlarm = async (alarm: IAlarm) => {
    return await knex("alarms").insert(alarm);
};

export const deleteAlarm = async (alarm: IAlarm) => {
    return await knex("alarms").del().where("id", alarm.id);
} ;

export const markTriggeredAlarms = async (alarm: IAlarm[]) => {

};