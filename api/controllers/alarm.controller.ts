import { Request, Response } from "express";
import * as alarmSerivce from '../services/alarm.service';

export const createAlarm = async (req: Request, res: Response) => {
    const alarm = await alarmSerivce.createAlarm(req.body);
    return res.json(alarm);
};

export const getUserAlarmsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const alarm = await alarmSerivce.getUserAlarmsById(id);
    return res.json(alarm);
};

export const updateAlarm = async (req: Request, res: Response) => {
    const { id } = req.params;
    const alarm = await alarmSerivce.updateAlarm(id, req.body);
    return res.json(alarm);
};

export const deleteAlarm = async (req: Request, res: Response) => {
    const { id } = req.params;
    const alarm = await alarmSerivce.deleteAlarm(id);
    return res.json(alarm);
};
