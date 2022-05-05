const knex = require("../src/db/knex.js");
const uuid = require("uuid");
import { Alarm } from "../interfaces/alarm.interface";

export const getUserAlarmsById = async (id: string) => {
    return await knex("alarms").where("userId", id).first();
};

export const createAlarm = async (alarm: Alarm) => {
    return await knex("alarms").insert({...alarm, id: uuid.v4()});
};

export const updateAlarm = async (alarm: Alarm) => {
    return await knex("alarms").update(alarm).where("id", alarm.id);
};

export const deleteAlarm = async (alarm: Alarm) => {
    return await knex("alarms").del().where("id", alarm.id);
} ;