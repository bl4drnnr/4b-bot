/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("alarms", t => {
        t.uuid("id").notNullable().defaultTo(knex.raw("gen_random_uuid ()")).primary()
        t.string("userid").references("users.userid")
        t.string("pair")
        t.float("triggerprice")
        t.float("indexprice")
        t.boolean("wastriggered").nullable().defaultTo(false)
        t.timestamp("createdat").defaultTo(knex.fn.now())
        t.timestamp("updatedat").defaultTo(knex.fn.now())
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("alarms");
};
