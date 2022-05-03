import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', (table) => {
            table.uuid('id').unique().notNullable()
            table.string('userid').notNullable()
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

