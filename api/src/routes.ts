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

router.get('/alarms/:id', alarmController.read);
router.post('/alarm/create', alarmController.create);

router.get('/positions/:id', positionController.read);
router.post('/positions/create', positionController.create);

export default router;
