import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('clients', function(table) {
        table.uuid('id').primary();
        table.string("company_name").notNullable();
        table.string("company_gstin").notNullable();
        table.string("company_address").notNullable();
        table.string("company_country").notNullable().defaultTo("Bharat");
        table.string("company_city").notNullable().defaultTo("Hyderabad");
        table.string("company_state").notNullable().defaultTo("Telangana");
        table.string("currency").defaultTo("INR");
        table.string("invoice_email").notNullable();
        table.timestamp("created_at",{
            useTz: false                        
        }).defaultTo(new Date(Date.now()).toTimeString())
        table.timestamp("updated_at",{ useTz: false}).defaultTo(new Date(Date.now()).toTimeString())
    });
}


export async function down(knex: Knex): Promise<void> {
      return knex.schema.dropTableIfExists('clients');
}

