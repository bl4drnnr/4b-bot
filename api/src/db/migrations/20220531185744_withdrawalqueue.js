/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("withdrawalqueue", t => {
        t.uuid("id").notNullable().defaultTo(knex.raw("gen_random_uuid ()")).primary()
        t.string("userid").references("users.userid")
        t.string("sourcebalanceid").references("balances.id")
        t.string("destinationbalance")
        t.float("amount")
        t.enum("status", ["pending", "done", "canceled"])
        t.timestamp("createdat").defaultTo(knex.fn.now())
        t.timestamp("updatedat").defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("withdrawalqueue")
};
