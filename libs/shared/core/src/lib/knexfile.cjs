const path = require('path');


// Update with your config settings.
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(path.dirname(__filename),"./dev.rmpdb.sqlite3"),
    },
    useNullAsDefault: true,
    migrations: {
       directory: path.resolve(path.dirname(__filename),'./migrations/rmp-db'),
    },
    seeds: {
      directory: path.resolve(path.dirname(__filename),'./seeds/rmp-db-dev')
    },
    debug: true
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: "./prod.rmpdb.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations/rmp-db"
    },
    seeds: {
      directory: './seeds/rmp-db-prod'
    }
  }
};
