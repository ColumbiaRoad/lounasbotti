exports.up = (knex) => {
  return knex.schema
    .createTable('restaurants', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = knex => knex.schema.dropTableIfExists('restaurants');
