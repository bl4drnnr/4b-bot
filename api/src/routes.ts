import { Router } from "express";

const router = Router();

import * as userController from "../controllers/user.controller";
import * as alarmController from "../controllers/alarm.controller";
import * as cryptoController from "../controllers/crypto.controller";
import * as voucherController from "../controllers/voucher.controller";
import * as balancesController from "../controllers/balances.controller";

import basicauth from "../middlewares/basicauth";

router.get("/user/:id", basicauth, userController.getUserById);
router.post("/user/create", basicauth, userController.createUser);

router.get("/alarms/:id", basicauth, alarmController.getUserAlarmsById);
router.post("/alarm/create", basicauth, alarmController.createAlarm);
router.delete("/alarm/delete", basicauth, alarmController.deleteAlarm);

router.get("/crypto/pair/:pair", basicauth, cryptoController.getPair);
router.get("/crypto/update-rates", basicauth, cryptoController.updateRates);
router.post("/crypto/buy", basicauth, cryptoController.buyCrypto);
router.post("/crypto/sell", basicauth, cryptoController.sellCrypto);
router.post("/crypto/exchange", basicauth, cryptoController.exchangeCrypto);

router.post("/voucher/generate", basicauth, voucherController.generateVoucher);
router.post("/voucher/redeem", basicauth, voucherController.redeemVoucher);

router.get("/balances/:id", basicauth, balancesController.getClientBalancesById);
router.post("/balances/deposit", basicauth, balancesController.depositCrypto);
router.post("/balances/withdrawal", basicauth, balancesController.withdrawalCrypto);

export default router;
