import type { Knex } from "knex";

module.exports.up = function up(knex: Knex) : Promise<void> {
  return knex.raw(`
        CREATE TRIGGER update_clients_timestamp
        AFTER UPDATE ON clients
        FOR EACH ROW
        WHEN OLD.updated_at IS NEW.updated_at 
        BEGIN
            UPDATE clients 
            SET updated_at = CURRENT_TIMESTAMP 
            WHERE id = OLD.id;
        END;
    `)
};

module.exports.down = function(knex : Knex): Promise<void> {
  return knex.raw(`DROP TRIGGER IF EXISTS update_clients_timestamp ON clients;`)
};
