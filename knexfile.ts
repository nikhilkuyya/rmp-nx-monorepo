import type { Knex } from "knex";

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.rmpdb.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
       directory: './migrations/rmp-db'
    }
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: "./prod.rmpdb.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations/rmp-db"
    }
  }
};

export default config;
