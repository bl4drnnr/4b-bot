const router = require('express').Router();

const userController = require('../controllers/userController');
const alarmController = require('../controllers/alarmController');
const positionController = require('../controllers/positionController');

router.get('/user/one/:id', userController.getUserById);
router.post('/user/create', userController.createUser);

router.get('/alarms/:id', alarmController.getAllUserAlarmById);
router.post('/alarm/create', alarmController.createAlarm);

router.get('/positons/:id', positionController.getAllUserPositionById);
router.post('/position/create', positionController.createPosition);

export default router;