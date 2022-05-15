import { Router } from "express";

const router = Router();

import * as userController from "../controllers/user.controller";
import * as alarmController from "../controllers/alarm.controller";
import * as cryptoController from "../controllers/crypto.controller";
import * as voucherController from "../controllers/voucher.controller";

router.get("/user/:id", userController.getUserById);
router.post("/user/create", userController.createUser);
router.put("/user/update", userController.updateUser);
router.delete("/user/delete", userController.deleteUser);

router.get("/alarms/:id", alarmController.getUserAlarmsById);
router.post("/alarm/create", alarmController.createAlarm);
router.put("/alarm/update", alarmController.updateAlarm);
router.delete("/alarm/delete", alarmController.deleteAlarm);

router.get("/crypto/pair/:pair", cryptoController.getPair);
router.get("/crypto/update-rates", cryptoController.updateRates);
router.post("/crypto/buy", cryptoController.buyCrypto);
router.post("/crypto/sell", cryptoController.sellCrypto);
router.post("/crypto/exchange", cryptoController.exchangeCrypto);

router.post("/voucher/generate", voucherController.generateVoucher);
router.post("/voucher/redeem", voucherController.redeemVoucher);

export default router;
