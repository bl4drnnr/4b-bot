/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("balances", t => {
        t.uuid("id").notNullable().defaultTo(knex.raw("gen_random_uuid ()")).primary()
        t.string("userid").references("users.userid")
        t.string("wallet").defaultTo(null)
        t.uuid("currencyid").references("availablecurrencies.id")
        t.float("amount").defaultTo(0)
        t.timestamp("createdat").defaultTo(knex.fn.now())
        t.timestamp("updatedat").defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("balances");
};
