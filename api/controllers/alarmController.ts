import { Request, Response } from "express";
import * as alarmSerivce from '../services/alarmService';

export const getUserAlarmsById = async (req: Request, res: Response) => {
    try {
        return await alarmSerivce.getUserAlarmsById(req.params.id);
    } catch (error) { 

    }
};

export const createAlarm =async (req: Request, res: Response) => {
    try {
        return await alarmSerivce.createAlarm(req.body);
    } catch (error) {
        
    }
};