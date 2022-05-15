/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", t => {
        t.uuid("id").notNullable().defaultTo(knex.raw("gen_random_uuid ()")).primary()
        t.string("userid").notNullable().unique()
        t.timestamp("createdat").defaultTo(knex.fn.now())
        t.timestamp("updatedat").defaultTo(knex.fn.now())
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
