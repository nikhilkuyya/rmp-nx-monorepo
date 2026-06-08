# Knex Module System Pattern Decision

**Date:** 2026-06-08  
**Pattern:** Hybrid Module System (CommonJS Runtime + TypeScript Declarations)  
**Status:** Implemented  
**Commits:** `6948b20` (knex cleanup)

## Problem Statement

The project initially used TypeScript (`knexfile.ts`) for Knex configuration, but Knex CLI tools (migrate, seed, etc.) require CommonJS modules. This created a module loading mismatch:
- TypeScript/ESM expects `import/export` syntax
- Knex CLI expects CommonJS `require()` and `module.exports`
- Result: Runtime failures when executing migration/seed commands

## Solution Implemented

**Hybrid Module System Pattern:**
```
knexfile.cjs          ← CommonJS config (what Knex CLI expects)
knexfile.d.ts         ← TypeScript declarations (IDE type safety)
```

### Key Changes

#### 1. **Configuration File Conversion**
```javascript
// Before: knexfile.ts (TypeScript/ESM)
import type { Knex } from "knex";
export default config;

// After: knexfile.cjs (CommonJS)
const path = require('path');
module.exports = {
  development: { /* ... */ }
};
```

#### 2. **Path Resolution**
```javascript
// Before: Relative paths (fragile, context-dependent)
filename: "./dev.rmpdb.sqlite3"
directory: './migrations/rmp-db'

// After: Absolute paths using path.resolve()
filename: path.resolve(path.dirname(__filename), "./dev.rmpdb.sqlite3"),
directory: path.resolve(path.dirname(__filename), './migrations/rmp-db'),
```

**Why:** Absolute paths are resilient to working directory changes. CLI tools run from various contexts; relative paths fail inconsistently.

#### 3. **TypeScript Type Declarations**
```typescript
// knexfile.d.ts - Declare types without implementation
import type { Knex } from 'knex';
declare const config: { [key: string]: Knex.Config };
export default config;
```

**Why:** IDEs need type info for autocomplete/checking. The `.d.ts` file provides types without forcing ESM syntax.

#### 4. **Connection Layer Update**
```typescript
// Before: Direct import
import knexfile from '../knexfile';
export const db = knex(knexfile['development']);

// After: Require + explicit extraction
const knexfile = require('../knexfile.cjs');
const dbConfig = knexfile.development;
export const db = knex(dbConfig);

// Added: Query logging
db.on('query', (queryData) => {
  const dbFile = dbConfig.connection.filename;
  console.log(`[Database: ${dbFile}] Running query: ${queryData.sql}`);
});
```

**Why:** 
- `require()` loads CommonJS without Module transformation
- Explicit extraction prevents accidentally loading wrong export
- Query logging aids debugging (which DB/query ran)

#### 5. **Migration & Seed Files**
Changed from ES6 exports to CommonJS:
```javascript
// Before
export async function up(knex: Knex): Promise<void> { /* ... */ }

// After
module.exports.up = function up(knex: Knex): Promise<void> { /* ... */ }
```

**Why:** Knex CLI directly loads and calls these functions; CommonJS `module.exports` is what it expects.

#### 6. **Build Configuration Updates**
```json
{
  "assets": ["libs/shared/core/*.md", "libs/shared/core/src/lib/knexfile.cjs"]
}
```

**Why:** Knex CLI needs access to the config file at runtime; it must be bundled/copied with the build output.

## Design Pattern Analysis

### Pattern Name: **Hybrid Module System**

**Definition:** Use the runtime system expected by a tool (CommonJS) while maintaining type safety and IDE support through declarations (TypeScript).

### Why This Pattern

1. **Tool Compliance**
   - Knex CLI is written for CommonJS; fighting that adds complexity
   - CommonJS is stable, widely understood, non-controversial for config files

2. **Type Safety Without Friction**
   - TypeScript devs get IDE autocomplete and type checking
   - No need to learn/use alternative config formats (YAML, JSON)
   - Declarations stay in sync via manual discipline (low cost for config files)

3. **Separation of Concerns**
   - Knex config responsibility: provide config to CLI
   - Type system responsibility: let TS know what the config shape is
   - These are orthogonal; separate them instead of forcing one solution

4. **Minimal Overhead**
   - 3 files (`.cjs` + `.d.ts` + usage in `connection.ts`)
   - No transpilation, build step, or wrapper needed
   - Works immediately once files are in place

### When to Use

- **Integrating CLI tools** that expect a specific module format
- **Mixing module systems** (ESM app + CommonJS CLI)
- **Config files** where tool compliance outweighs consistency benefits
- **Low-churn files** where manual `.d.ts` sync is viable (configs, not source code)

### Alternatives Considered

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|-------------|
| **All CommonJS** | Tool-native, simpler | Breaks TypeScript/modern codebase conventions | Restricts app architecture |
| **Transpile/Loader** | Unified syntax | Adds build complexity, debugging friction | Over-engineered for config |
| **Wrapper Script** | Isolates complexity | Extra indirection, harder to debug | Unnecessary layer |
| **JSON/YAML Config** | Language-neutral | Loses programmatic logic (computed paths, conditionals) | Config needs computation |

## Learnings & Insights

### ✅ What Worked Well

1. **Path Resolution**
   - `path.resolve(path.dirname(__filename), '...')` is robust
   - Works correctly whether run from project root, CI, or other contexts

2. **Explicit Database Logging**
   - Query logging revealed when/how the db was being called
   - Helped debug issues with file paths and config loading

3. **Absolute Separation**
   - No hybrid syntax in a single file (not mixing `require` + `import`)
   - Clear boundary: `.cjs` is CommonJS, `.ts` is ESM

### ⚠️ Maintenance Considerations

1. **Manual `.d.ts` Sync**
   - If `knexfile.cjs` changes, must update `knexfile.d.ts` types
   - Low friction for config (rarely changes), but easy to forget
   - Could add a comment reminder, or a linter rule in the future

2. **Build Asset Management**
   - Must remember to include `knexfile.cjs` in build outputs
   - Document clearly in deployment guides
   - CI should verify the file is present post-build

## Related Patterns

- **[[database-migration-pattern]]** - Parent pattern; this refines how Knex is configured
- **[[api-library-architecture]]** - Uses the connection defined here

## Future Enhancements

1. **Linter Rule** - Add ESLint rule to warn if `.d.ts` and `.cjs` drift
2. **Configuration Validation** - Add a startup check: `knex migrate:list` to verify config before app starts
3. **Environment Documentation** - Document which commands load `knexfile.cjs` (migrate, seed, etc.) vs. app code

---

## Revision History

| Date | Change | Reason |
|------|--------|--------|
| 2026-06-08 | Pattern established | Solved Knex CLI + TypeScript module compatibility |

*This is a living decision. Update when pattern evolves or new insights emerge.*
