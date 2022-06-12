const knex = require("../src/db/knex.js");

export const getVoucher = async (codeenc: string) => {
    return await knex("vouchers").where("codeenc", codeenc).first()
};

export const getVouchersByClientId = async (userid: string) => {
    return await knex("vouchers")
        .where("userid", userid)
        .leftJoin("crypto", "crypto.id", "vouchers.currencyid")
        .select("vouchers.amount", "vouchers.codeenc", "crypto.symbol")
};

export const generateVoucher = async () => {
    
};

export const redeemVoucher = async () => {

};
