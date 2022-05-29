import { Router } from "express";

const router = Router();

import * as userController from "../controllers/user.controller";
import * as cryptoController from "../controllers/crypto.controller";
import * as voucherController from "../controllers/voucher.controller";
import * as balancesController from "../controllers/balances.controller";

import basicauth from "../middlewares/basicauth";

router.get("/user/:id", basicauth, userController.getUserById);
router.post("/user/create", basicauth, userController.createUser);

router.get("/crypto/pair/:pair", basicauth, cryptoController.getPair);
router.post("/crypto/update-rates", basicauth, cryptoController.updateRates);
router.post("/crypto/buy", basicauth, cryptoController.buyCrypto);
router.post("/crypto/sell", basicauth, cryptoController.sellCrypto);
router.post("/crypto/exchange", basicauth, cryptoController.exchangeCrypto);

router.post("/voucher/generate", basicauth, voucherController.generateVoucher);
router.post("/voucher/redeem", basicauth, voucherController.redeemVoucher);

router.get("/balances/:id", basicauth, balancesController.getClientBalancesById);
router.post("/balances/deposit", basicauth, balancesController.depositCrypto);
router.post("/balances/withdrawal", basicauth, balancesController.withdrawalCrypto);
router.get("/balances/all", basicauth, balancesController.getAll);
router.put("/balances/update", basicauth, balancesController.updateWallets);

export default router;
