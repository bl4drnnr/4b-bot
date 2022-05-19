import * as balanceRepository from "../repositories/balances.repository";
import loggerConfig from "../common/logger";

const logger = loggerConfig({ label: "balances-service", path: "balances" });

export const getClientBalancesById = async (id: string) => {
    try {
        return await balanceRepository.getClientBalancesById(id);
    } catch (error: any) {
        logger.error(`error-while-getting-clients-balances => ${error}`);
        throw Error("error-while-getting-clients-balances");
    }
}