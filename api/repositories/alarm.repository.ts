const knex = require("../src/db/knex.js");
const uuid = require("uuid");

export const getUserAlarmsById = async (id: string) => {
    return await knex("alarms").where("id", id).first();
};

export const createAlarm = async (data: object) => {
    return await knex("alarms").insert(data);
};

export const updateAlarm = async (id: string, data: object) => {
    return await knex("alarms").update(data).where("id", id);
};

export const deleteAlarm = async (id: string) => {
    return await knex("alarms").del().where("id", id);
} ;