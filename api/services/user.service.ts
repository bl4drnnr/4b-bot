import * as balancesService from "./balances.service";
import * as userRepository from "../repositories/user.repository";

import loggerConfig from "../common/logger";
import { IUser } from "../interfaces/user.interface";

const logger = loggerConfig({ label: "user-service", path: "user" });

export const getUserById = async (userid: string) => {
    try {
        return await userRepository.getUserById(userid);
    } catch (error: any) {
        logger.error(`error-while-getting-user-by-id => ${error}`);
        throw Error("error-while-getting-user-by-id");
    }
};

export const createUser = async (user: IUser) => {
    try {
        await userRepository.createUser(user);

        logger.info(`Creating BTC wallet for user with id: ${user.userid}`);
        return await balancesService.createBtcWallet(user.userid);
    } catch (error: any) {
        logger.error(`error-while-creating-user => ${error}`);
        throw Error("error-while-creating-user");
    }
};
