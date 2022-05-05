import { Router } from "express";

const router = Router();

import * as userController from '../controllers/user.controller';
import * as alarmController from '../controllers/alarm.controller';
import * as positionController from '../controllers/position.controller';
import * as cryptoController from '../controllers/crypto.controller';

router.get('/user/:id', userController.getUserById);
router.post('/user/create', userController.createUser);
router.put('/user/update', userController.updateUser);
router.delete('/user/delete', userController.deleteUser);

router.get('/alarms/:id', alarmController.getUserAlarmsById);
router.post('/alarm/create', alarmController.createAlarm);
router.put('/alarm/update/:id', alarmController.updateAlarm);
router.delete('/alarm/delete/:id', alarmController.deleteAlarm);

router.get('/positions/:id', positionController.getUserPositionsById);
router.post('/positions/create', positionController.createPosition);
router.put('/positions/update', positionController.updatePosition);
router.delete('/positions/delete', positionController.deletePosition);

router.get('/crypto/update-rates', cryptoController.updateRates);

export default router;
