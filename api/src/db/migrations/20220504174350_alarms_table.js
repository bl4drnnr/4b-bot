/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("alarms", t => {
        t.uuid("id").primary().notNullable()
        t.uuid("userId").references("users.id")
        t.string("pair")
        t.float("triggerPrice")
        t.float("indexPrice")
        t.timestamp('createdAt').defaultTo(knex.fn.now())
        t.timestamp('updatedAt').defaultTo(knex.fn.now())
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("alarms");
};
