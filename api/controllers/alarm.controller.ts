import { Request, Response } from "express";
import * as alarmSerivce from '../services/alarm.service';
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: 'alarm-controller', path: 'alarm' })

export const createAlarm = async (req: Request, res: Response) => {
    try {
        const alarm = await alarmSerivce.createAlarm(req.body);

        logger.info(`Creating alarm: ${req.body}`);

        return res.json(alarm);
    } catch (e) {
        logger.error(`Error while creating alarm => ${e}`);
        return res.json({ status: -1 });
    }
};

export const getUserAlarmsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        logger.info(`Getting alarms by id: ${id}`);

        const alarm = await alarmSerivce.getUserAlarmsById(id);
        return res.json(alarm);
    } catch (e) {
        logger.error(`Error while getting alarm => ${e}`);
        return res.json({ status: -1 });
    }
};

export const updateAlarm = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        logger.info(`Updating alarm by id: ${id}`);

        const alarm = await alarmSerivce.updateAlarm(req.body);
        return res.json(alarm);
    } catch (e) {
        logger.error(`Error while updating alarm => ${e}`);
        return res.json({ status: -1 });
    }
};

export const deleteAlarm = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        logger.info(`Deleting alarm by id: ${id}`);

        const alarm = await alarmSerivce.deleteAlarm(req.body);
        return res.json(alarm);
    } catch (e) {
        logger.error(`Error while deleting alarm => ${e}`);
        return res.json({ status: -1 });
    }
};
