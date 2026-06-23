import type { Knex } from 'knex';

module.exports.up = async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('teams', function (table) {
    table.uuid('id').primary().notNullable().defaultTo(knex.fn.uuid());
    table.string('company_name').notNullable();
    table.string('company_gstin').notNullable().unique();
    table.string('company_address_line').notNullable();
    table.string('company_postal_code').notNullable();
    table.string('company_country').notNullable().defaultTo('Bharat');
    table.string('company_city').notNullable().defaultTo('Hyderabad');
    table.string('company_state').notNullable().defaultTo('Telangana');
    table.string('website').defaultTo('');
    table.string('contact_email').defaultTo('');
    table.string('contact_phone').notNullable();
    table.string('currency').defaultTo('INR').notNullable();
    table
      .timestamp('created_at', {
        useTz: false,
      })
      .defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now());
  });
};

module.exports.down = async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('teams');
};
