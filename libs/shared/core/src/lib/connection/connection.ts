import knex from 'knex';
const knexfile = require('../knexfile.cjs');

// Now you can safely read it
const dbConfig = knexfile.development;

export const db = knex(dbConfig);

db.on('query', (queryData) => {
  const dbFile = dbConfig.connection.filename;
  console.log(`[Database: ${dbFile}] Running query: ${queryData.sql}`);
});