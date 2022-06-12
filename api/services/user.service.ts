import * as balancesService from "./balances.service";
import * as securityService from "./security.service";
import * as userRepository from "../repositories/user.repository";

import loggerConfig from "../common/logger";
import { IUser } from "../interfaces/user.interface";

const logger = loggerConfig({ label: "user-service", path: "user" });

export const getUserById = async (userid: string) => {
    try {
        const encryptedId = securityService.encrypt(userid)
        logger.info(`Getting user by id: ${encryptedId}`);
        return await userRepository.getUserById(encryptedId);
    } catch (error: any) {
        logger.error(`error-while-getting-user-by-id => ${error}`);
        throw Error("error-while-getting-user-by-id");
    }
};

export const createUser = async (user: IUser) => {
    try {
        const existingUser = await getUserById(user.userid);

        if (existingUser) {
            logger.warn(`User alredy exists! - ${existingUser.userid}`);
            return { status: -1 };
        }

        const encryptedId = securityService.encrypt(user.userid);
        logger.info(`Creating user with id: ${encryptedId}`);
        await userRepository.createUser({ userid: encryptedId });

        logger.info(`Creating BTC wallet for user with id: ${encryptedId}`);
        return await balancesService.createBtcWallet(encryptedId);
    } catch (error: any) {
        logger.error(`error-while-creating-user => ${error}`);
        throw Error("error-while-creating-user");
    }
};
