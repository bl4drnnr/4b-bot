import { Router } from "express";

const router = Router();

import { UserController } from '../controllers/user.controller';
import * as alarmController from '../controllers/alarm.controller';
import * as positionController from '../controllers/position.controller';

const userController = new UserController();

router.get('/user/:id', userController.read);
router.post('/user/create', userController.create);
router.put('/user/update/:id', userController.update);
router.delete('/user/delete/:id', userController.delete);

router.get('/alarms/:id', alarmController.getUserAlarmsById);
router.post('/alarm/create', alarmController.createAlarm);
router.put('/alarm/update/:id', alarmController.updateAlarm);
router.delete('/alarm/delete/:id', alarmController.deleteAlarm);

router.get('/positions/:id', positionController.getUserPositionsById);
router.post('/positions/create', positionController.createPosition);
router.put('/positions/update/:id', positionController.updatePosition);
router.delete('/positions/delete/:id', positionController.deletePosition);

router.get('/crypto/update-rates')

export default router;
