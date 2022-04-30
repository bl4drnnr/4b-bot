const router = require('express').Router();

const userController = require('../controllers/userController');
const alarmController = require('../controllers/alarmController');

router.get('/user/one/:id', userController.getUserById);
router.post('/user/create', userController.createUser);

router.get('/alarms/:id', alarmController.getAllUserAlarmById);
router.post('/alarm/create', alarmController.createAlarm);

router.get('/positons/:id');
router.post('/position/create');

export default router;