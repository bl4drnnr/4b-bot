import { Request, Response } from "express";
import * as userService from "../services/user.service";
import * as securityService from "../services/security.service";

import loggerConfig from "../common/logger";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

const logger = loggerConfig({ label: "user-controller", path: "user" })

export const createUser = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const encryptedId = securityService.encrypt(req.body.userid, process.env.CRYPTO_KEY, process.env.IV)

        logger.info(`Creating user with id: ${encryptedId}`);
        await userService.createUser({
            userid: encryptedId
        });

        // TODO Generate wallets

        return res.json({ status: 1 });
    } catch (e) {
        logger.error(`Error while creating user => ${e}`);
        return res.json({ status: -1 });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const encryptedId = securityService.encrypt(req.params.id, process.env.CRYPTO_KEY, process.env.IV)

        logger.info(`Getting user by id: ${encryptedId}`);

        const user = await userService.getUserById(encryptedId);

        return res.json(user || { status: 0 });
    } catch (e) {
        logger.error(`Error while getting user by id => ${e}`);
        return res.json({ status: -1 });
    }
};
