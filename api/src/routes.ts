import { Router } from "express";

const router = Router();

import { UserController } from '../controllers/user.controller';
import { AlarmController } from '../controllers/alarm.controller';
import * as positionController from '../controllers/position.controller';

const userController = new UserController();
const alarmController = new AlarmController();

router.get('/user/:id', userController.read);
router.post('/user/create', userController.create);
router.put('/user/update/:id', userController.update);
router.delete('/user/delete/:id', userController.delete);

router.get('/alarms/:id', alarmController.read);
router.post('/alarm/create', alarmController.create);
router.put('/alarm/update/:id', alarmController.update);
router.delete('/alarm/delete/:id', alarmController.delete);

router.get('/positions/:id', positionController.getUserPositionsById);
router.post('/positions/create', positionController.createPosition);
router.put('/positions/update/:id', positionController.updatePosition);
router.delete('/positions/delete/:id', positionController.deletePosition);

router.get('/crypto/update-rates')

export default router;
