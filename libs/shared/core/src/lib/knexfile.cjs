const path = require('path');
const fs = require('fs');

function findWorkspaceRoot(dir) {
  if (fs.existsSync(path.join(dir, 'nx.json'))) return dir;
  const parent = path.dirname(dir);
  if (parent === dir) throw new Error('Could not find Nx workspace root');
  return findWorkspaceRoot(parent);
}

// Stable anchor: workspace root found by locating nx.json.
// Works whether this file runs from src/lib (migrations) or dist/lib (API runtime).
const workspaceRoot = findWorkspaceRoot(__dirname);
const libSrcDir = path.resolve(workspaceRoot, 'libs/shared/core/src/lib');

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(libSrcDir, "dev.rmpdb.sqlite3"),
    },
    useNullAsDefault: true,
    migrations: {
       directory: path.resolve(libSrcDir, 'migrations/rmp-db'),
    },
    seeds: {
      directory: path.resolve(libSrcDir, 'seeds/rmp-db-dev')
    },
    debug: true
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(libSrcDir, "prod.rmpdb.sqlite3"),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(libSrcDir, 'migrations/rmp-db'),
    },
    seeds: {
      directory: path.resolve(libSrcDir, 'seeds/rmp-db-prod')
    }
  }
};
