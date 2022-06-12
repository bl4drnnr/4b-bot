/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("vouchers", t => {
        t.uuid("id").notNullable().defaultTo(knex.raw("gen_random_uuid ()")).primary()
        t.float("amount")
        t.string("codeenc")
        t.string("userid").references("users.userid")
        t.uuid("currencyid").references("crypto.id")
        t.timestamp("createdat").defaultTo(knex.fn.now())
        t.timestamp("updatedat").defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("vouchers")
};
