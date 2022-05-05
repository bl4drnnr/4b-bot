/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("crypto", t => {
      t.uuid("id").primary().notNullable()
      t.string("pair")
      t.float("currentPrice")
      t.timestamp('createdAt').defaultTo(knex.fn.now())
      t.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("crypto");
};
