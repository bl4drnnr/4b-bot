const knex = require("../src/db/knex.js");
const uuid = require("uuid");
import { IAlarm } from "../interfaces/alarm.interface";

export const getUserAlarmsById = async (id: string) => {
    return await knex("alarms").where("userId", id).select('*');
};

export const createAlarm = async (alarm: IAlarm) => {
    return await knex("alarms").insert({...alarm, id: uuid.v4()});
};

export const updateAlarm = async (alarm: IAlarm) => {
    return await knex("alarms").update(alarm).where("id", alarm.id);
};

export const deleteAlarm = async (alarm: IAlarm) => {
    return await knex("alarms").del().where("id", alarm.id);
} ;