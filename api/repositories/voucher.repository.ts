const knex = require("../src/db/knex.js");

export const getVoucher = async (codeenc: string) => {
    return await knex("vouchers").where("codeenc", codeenc).first()
};

export const getVouchersByClientId = async (userid: string) => {
    return await knex("vouchers")
        .where("userid", userid)
        .select("*")
};

export const generateVoucher = async () => {
    
};

export const redeemVoucher = async () => {

};
