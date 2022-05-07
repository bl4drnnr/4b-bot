/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("crypto", t => {
      t.uuid('id').notNullable().defaultTo(knex.raw('gen_random_uuid ()')).primary()
      t.string("symbol")
      t.float("mark_price")
      t.float("index_price")
      t.float("bid_price")
      t.float("ask_price")
      t.float("high_price_24h")
      t.float("low_price_24h")
      t.timestamp('createdat').defaultTo(knex.fn.now())
      t.timestamp('updatedat').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("crypto");
};
