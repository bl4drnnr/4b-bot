import { Request, Response } from "express";
import * as alarmSerivce from '../services/alarm.service';

class AlarmController {
    async create(req: Request, res: Response) {
        const alarm = await alarmSerivce.createAlarm(req.body)
        return res.json(alarm)
    }
    async read(req: Request, res: Response) {
        const { id } = req.params
        const alarm = await alarmSerivce.getUserAlarmsById(id)
        return res.json(alarm)
    }
    async update(req: Request, res: Response) {
        return
    }
    async delete(req: Request, res: Response) {
        return
    }
}

export { AlarmController }