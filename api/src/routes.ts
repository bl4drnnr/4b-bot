import { Router } from "express";

const router = Router();

import { UserController } from '../controllers/user.controller';
import { AlarmController } from '../controllers/alarm.controller';
import { PositionController } from '../controllers/position.controller';

const userController = new UserController();
const alarmController = new AlarmController();
const positionController = new PositionController();

router.get('/user/:id', userController.read);
router.post('/user/create', userController.create);
router.put('/user/update/:id', userController.update);
router.delete('/user/delete/:id', userController.delete);

router.get('/alarms/:id', alarmController.read);
router.post('/alarm/create', alarmController.create);
router.put('/alarm/update/:id', alarmController.update);
router.delete('/alarm/delete/:id', alarmController.delete);

router.get('/positions/:id', positionController.read);
router.post('/positions/create', positionController.create);
router.put('/positions/update/:id', positionController.update);
router.delete('/positions/delete/:id', positionController.delete);

export default router;
