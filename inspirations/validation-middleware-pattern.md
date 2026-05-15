# Validation Middleware Pattern Decision

**Date:** 2026-05-16  
**Pattern:** Higher-Order Function (Middleware Factory) - Explicit Per-Location Validators  
**Status:** Good as of now, open to refactoring when better pattern is found

## Current Implementation

Located in `apps/api/src/middleware/validation.ts`

Three explicit middleware factories:
- `validationBody(schema)` - validates request body
- `validationParams(schema)` - validates URL parameters  
- `validationQuery(schema)` - validates query parameters

Each uses Valibot's `safeParse()` for schema validation and returns detailed error responses with field-level messages.

## Why This Pattern Now

- **Clarity:** Explicit and easy to understand at a glance
- **Simplicity:** Straightforward implementation without unnecessary abstractions
- **Pragmatism:** Works well for current scale; refactoring can wait

## Considered Alternatives

1. **DRY Generic Factory** - Single parameterized factory to eliminate duplication
2. **Strategy Pattern** - Separate location logic into strategy objects
3. **TypeScript Decorators** - More declarative route definitions (future consideration)

## When to Refactor

Revisit this pattern when:
- Code duplication becomes a maintenance burden
- Need cross-location validation logic sharing
- Additional validation locations or custom logic needed
- Team identifies a better abstraction through usage patterns

---

*This is a living decision. Update this file when pattern evolves.*
