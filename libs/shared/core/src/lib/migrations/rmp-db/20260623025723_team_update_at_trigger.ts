import type { Knex } from "knex";


module.exports.up =  async function up(knex: Knex): Promise<void> {
      return knex.raw(`
        CREATE TRIGGER update_at_teams_timestamp
        AFTER UPDATE ON teams
        FOR EACH ROW
        WHEN OLD.updated_at IS NEW.updated_at 
        BEGIN
            UPDATE teams 
            SET updated_at = CURRENT_TIMESTAMP 
            WHERE id = OLD.id;
        END;
    `);
}


module.exports.down =  async function down(knex: Knex): Promise<void> {
    return knex.raw(`DROP TRIGGER IF EXISTS update_at_teams_timestamp;`);
}

