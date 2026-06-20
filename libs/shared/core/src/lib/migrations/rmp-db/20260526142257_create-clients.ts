import type { Knex } from "knex";

module.exports.up = function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('clients', function(table) {
        table.uuid('id').primary().notNullable().defaultTo(knex.fn.uuid());
        table.string("company_name").notNullable();
        table.string("company_gstin").notNullable().unique();
        table.string("company_address_line").notNullable();
        table.string("company_postal_code").notNullable();
        table.string("company_country").notNullable().defaultTo("Bharat");
        table.string("company_city").notNullable().defaultTo("Hyderabad");
        table.string("company_state").notNullable().defaultTo("Telangana");
        table.string("currency").defaultTo("INR");
        table.string("invoice_email").notNullable();
        table.timestamp("created_at",{
            useTz: false                        
        }).defaultTo(knex.fn.now());
        table.timestamp("updated_at",{ useTz: false}).defaultTo(knex.fn.now())
    });
}


module.exports.down = function down(knex: Knex): Promise<void> {
      return knex.schema.dropTableIfExists('clients');
}

