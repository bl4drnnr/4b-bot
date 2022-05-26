import { Request, Response } from "express";
import * as userService from "../services/user.service";
import * as securityService from "../services/security.service";
import * as balancesService from "../services/balances.service";

import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "user-controller", path: "user" })

export const createUser = async (req: Request, res: Response) => {
    try {
        const encryptedId = securityService.encrypt(req.body.userid)

        logger.info(`Check if user already exists: ${encryptedId}`);

        const user = await userService.getUserById(encryptedId);

        if (user) {
            logger.warn(`User alredy exists! Exiting: ${encryptedId}`);
            return res.json({ status: -1 });
        }

        logger.info(`Creating user with id: ${encryptedId}`);
        await userService.createUser({ userid: encryptedId });

        logger.info(`Creating BTC wallet for user with id: ${encryptedId}`);
        await balancesService.createBtcWallet(encryptedId);

        return res.json({ status: 1 });
    } catch (e) {
        logger.error(`Error while creating user => ${e}`);
        return res.json({ status: -1 });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const encryptedId = securityService.encrypt(req.params.id)

        logger.info(`Getting user by id: ${encryptedId}`);

        const user = await userService.getUserById(encryptedId);

        return res.json(user || { status: 0 });
    } catch (e) {
        logger.error(`Error while getting user by id => ${e}`);
        return res.json({ status: -1 });
    }
};
