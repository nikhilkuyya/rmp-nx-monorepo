# Database Migration Pattern Decision

**Date:** 2026-05-26  
**Pattern:** Knex.js Migration Pattern with Environment-Specific Configuration  
**Status:** Established, refinements pending seed implementation

## Current Implementation

Located in:
- `knexfile.ts` - Knex configuration for dev/prod SQLite databases
- `migrations/rmp-db/` - Timestamped migration files
- `package.json` - Migration management scripts

**Migration Scripts:**
- `npm run migrate` - Run pending migrations
- `npm run migration:rollback` - Rollback last migration
- `npm run migration:status` - List migration status
- `npm run migration:make` - Create new migration

## Design Decisions

### ✅ Environment Configuration Pattern
Separate `development` and `production` configs in knexfile.ts allows:
- Different database files per environment
- Easy environment switching
- Production-ready setup from the start

### ⚠️ Known Issue: Timestamp Defaults

**Current (Incorrect):**
```typescript
table.timestamp("created_at", { useTz: false })
  .defaultTo(new Date(Date.now()).toTimeString())
```

**Problem:** Runtime function calls don't translate to database defaults; each column gets migration-time value, not insertion-time value.

**Should Be (Correct):**
```typescript
table.timestamp("created_at", { useTz: false })
  .defaultTo(knex.fn.now())
```

**Why:** `knex.fn.now()` creates a database-level default that evaluates at insert time, ensuring consistency.

## Why This Pattern Now

- **Industry Standard:** Knex migrations are widely adopted for schema versioning
- **Version Control:** Full schema history tracked in git
- **Rollback Safety:** Up/down functions provide reversibility
- **Team Familiar:** Common pattern developers recognize immediately

## Considered Alternatives

1. **Raw SQL Files** - Manual management, error-prone
2. **TypeORM/Prisma** - Heavier dependencies for current project scope
3. **Manual Database Setup** - Not version controlled, hard to reproduce

## TODO: Future Enhancements

### 1. **Seed Pattern Implementation**
- [ ] Create `seeds/` directory structure
- [ ] Implement seed factories for test/development data
- [ ] Add `npm run seed` script
- [ ] Document seed usage in deployment

**Why Seeds Matter:**
- Consistent development environment setup
- Predictable test data for local testing
- Reproducible scenarios for debugging

**Implementation Approach:**
```typescript
// seeds/001_initial_clients.ts
exports.seed = async (knex) => {
  await knex('clients').del(); // Clear existing
  await knex('clients').insert([
    { /* test client 1 */ },
    { /* test client 2 */ }
  ]);
};
```


### 3. **Connection Pooling** (when scaling)
- [ ] Consider connection pooling config for production
- [ ] Monitor for connection leak scenarios

### 4. **Migration Validation**
- [ ] Add pre-migration schema validation tests
- [ ] Consider migration audit logging

---

## Revision History

| Date | Change | Reason |
|------|--------|--------|
| 2026-05-26 | Pattern established | Initial migration setup for RMP database |

*This is a living decision. Update when pattern evolves or new insights emerge.*
