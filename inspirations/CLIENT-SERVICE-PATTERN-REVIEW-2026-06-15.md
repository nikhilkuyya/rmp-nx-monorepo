# Client Service Design Pattern Review

**Date:** 2026-06-15  
**Scope:** Analysis of Client Service Layer Implementation (commits: d68d84e, 287bd9e, f0d1392)  
**Status:** Pattern Defined with Recommendations  
**Reviewer:** Design Pattern Analysis

---

## Executive Summary

The client service layer implementation introduces a **Service-Repository Pattern** with **Valibot-based validation** and **Model Mapping** across three architectural layers (Controller → Service → Database). While the pattern is sound and follows established conventions, there are several design consistency issues and critical test coverage gaps that should be addressed.

**Key Achievement:** Extraction of business logic into a reusable service layer with validation boundaries.  
**Key Concern:** Lack of test coverage, inconsistent error handling, and model name mismatches.

---

## Changes Summary

### Commits Analyzed
1. **d68d84e** - feat: add get and post of client (initial client API)
2. **287bd9e** - feat: error handling for client (error handling improvements)
3. **f0d1392** - feat: getclients update also update with ai (service extraction + AI integration)

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **Client Model** | `libs/shared/models/src/lib/client.model.ts` | Type definitions & schemas |
| **Client Service** | `libs/api/domain/invoices/src/lib/services/client.service.ts` | Business logic layer |
| **Client Controller** | `libs/api/domain/invoices/src/lib/controllers/client.controller.ts` | HTTP request handling |
| **Client Routes** | `apps/api/src/routes/client.ts` | Route definitions |
| **AI Tool** | `apps/api/src/agent/tools/getClient.ts` | LLM integration |
| **Mappers** | `libs/shared/util/src/lib/client.ts` | Model transformation |

---

## Current Design Pattern: Service-Repository Pattern

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│            Express Routes Layer                 │
│  (apps/api/src/routes/client.ts)               │
└────────────────────┬────────────────────────────┘
                     │ validates request with schema
┌────────────────────▼────────────────────────────┐
│         Controller Layer (HTTP)                 │
│  (libs/api/domain/invoices/.../controller)    │
│  - getClients, createClient                    │
│  - Validation, error handling                  │
└────────────────────┬────────────────────────────┘
                     │ calls service methods
┌────────────────────▼────────────────────────────┐
│          Service Layer (Business Logic)        │
│  (libs/api/domain/invoices/.../service)       │
│  - getClients, getClientByName                 │
│  - Data transformation                         │
└────────────────────┬────────────────────────────┘
                     │ queries database
┌────────────────────▼────────────────────────────┐
│         Database Layer (Knex/SQL)              │
│  - Raw queries, migrations                     │
└─────────────────────────────────────────────────┘
```

### Design Strengths

1. **Separation of Concerns**
   - Controllers handle HTTP concerns (requests, responses)
   - Services handle business logic (data transformation, filtering)
   - Models define the contract

2. **Reusability**
   - Services are used by both HTTP controllers and AI tools
   - Example: `getClientByName` used in both client controller and AI agent

3. **Validation Strategy**
   - Valibot schemas at model layer
   - Route-level validation middleware
   - Query parameter validation in controller

---

## Design Issues Identified

### 1. **Critical: Type Mismatch in Model Naming**

**Issue Location:** `libs/shared/models/src/lib/client.model.ts`

```typescript
// Line 7: Schema uses camelCase
companyGSTIN: v.pipe(v.string(), v.minLength(10)),

// Line 19: Payload uses different casing
companyGSTIn: v.pipe(v.string(),v.minLength(10)),  // ❌ Missing 'T' (GSTIn vs GSTIN)
```

**Impact:** 
- Type safety broken when mapping payload to database model
- Inconsistent property names cause silent failures
- AI tool receives wrong property names

**Recommendation:**
```typescript
// Correct to consistent naming
const rmpCreateClientPayloadSchema = v.object({
  companyName: rmpStringSchema,
  companyGSTIN: v.pipe(v.string(), v.minLength(10)),  // ← Match rmpClientSchema
  address: rmpAddressSchema,
  invoiceEmail: v.pipe(v.string(), v.email())
});
```

### 2. **Medium: Missing Error Handling in Service Layer**

**Issue Location:** `libs/api/domain/invoices/src/lib/services/client.service.ts`

```typescript
// Current: No try-catch, no error propagation
const getClientByName = async (name: string) => {
  const clients = (await db('clients').select('*').where(...)) || [];
  // If db query fails, exception bubbles up unhandled
};
```

**Impact:**
- Database errors not caught
- Caller (controller) must handle all errors
- Inconsistent error handling across the application

**Recommendation:**
```typescript
export const clientService = {
  async getClientByName(name: string) {
    try {
      const clients = await db('clients').select('*').where('company_name', 'like', `%${name}%`);
      return clients.map((client: RMPClientModel) => mapDBModelToClientModel(client));
    } catch (error) {
      console.error('[ClientService] Failed to get clients by name:', { name, error });
      throw new ServiceError('FETCH_FAILED', `Failed to fetch clients matching "${name}"`, error);
    }
  },
  
  async getClients(limit: number = 10) {
    try {
      const clients = await db('clients').select('*').limit(limit);
      return clients.map((client: RMPClientModel) => mapDBModelToClientModel(client));
    } catch (error) {
      console.error('[ClientService] Failed to get clients:', { limit, error });
      throw new ServiceError('FETCH_FAILED', 'Failed to fetch clients', error);
    }
  }
};
```

### 3. **Medium: Console.log in Production Code**

**Issue Location:** `libs/api/domain/invoices/src/lib/controllers/client.controller.ts`

```typescript
export const getClients = async (req: Request, res: Response) => {
  const { name } = req.query;
  console.log({ query: req.query });  // ❌ Debug logging in production
```

**Recommendation:** Use a proper logger (Winston, Pino) instead.

### 4. **Low: Method Organization in Controller**

**Issue Location:** Controller exports multiple handler functions

```typescript
export const getClients;        // Main entry point
export const getClientByName;   // Filtered search
export const getClientNoFilter; // Default list
```

**Impact:** 
- Three separate exports for what could be unified logic
- Slight duplication in error handling

**Recommendation:** Keep current structure but document routing logic clearly in routes file.

### 5. **Medium: Incomplete Route Implementation**

**Issue Location:** `apps/api/src/routes/client.ts`

```typescript
router.get('/:id', (req, res) => {
  res.json({ message: 'Client fetched' });  // ❌ Not implemented
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Client updated' });  // ❌ Not implemented
});
```

**Recommendation:** Either implement these endpoints or remove them from the API contract.

---

## Validation Strategy Assessment

### Positive Aspects
- ✅ Valibot used consistently across models
- ✅ Email and GSTIN validation at schema level
- ✅ Middleware validates request body before controller

### Gaps
- ⚠️ Query parameter validation only in controller (not in middleware)
- ⚠️ No validation for optional fields (id, currency)
- ⚠️ Limit parameter in service (default 10) has no validation

---

## AI Tool Integration Pattern

### Current Implementation

```typescript
// apps/api/src/agent/tools/getClient.ts
export const getClientByName = tool({
  description: 'Search clients by partial company name match',
  inputSchema: jsonSchema(toJsonSchema(clientSearchSchema)),
  execute: async ({ companyName }: ClientSearchSchemaType) => {
    const data = await clientService.getClientByName(companyName);
    return data;
  },
});
```

### Assessment

**Strengths:**
- ✅ Reuses service layer (good separation)
- ✅ Schema-driven tool definition
- ✅ Type-safe execution

**Issues:**
- ⚠️ No error handling in tool execution
- ⚠️ Tool can return raw database errors to LLM
- ⚠️ No result formatting/summarization for LLM

**Recommendation:**
```typescript
export const getClientByName = tool({
  description: 'Search clients by partial or full company name',
  inputSchema: jsonSchema(toJsonSchema(clientSearchSchema)),
  execute: async ({ companyName }: ClientSearchSchemaType) => {
    try {
      const clients = await clientService.getClientByName(companyName);
      if (!clients.length) {
        return { success: false, message: `No clients found matching "${companyName}"` };
      }
      return {
        success: true,
        count: clients.length,
        clients: clients.map(c => ({
          id: c.id,
          name: c.companyName,
          email: c.invoiceEmail
        }))
      };
    } catch (error) {
      return { 
        success: false, 
        error: 'Unable to search clients at this time'
      };
    }
  },
});
```

---

## Test Coverage Requirements

### Current State
**Test Files:** 0  
**Coverage:** 0%  
**Status:** ❌ Critical Gap

### Required Test Suite

#### 1. **Service Layer Tests** (HIGH PRIORITY)

**File:** `libs/api/domain/invoices/src/lib/services/client.service.spec.ts`

```typescript
describe('ClientService', () => {
  describe('getClients', () => {
    it('should fetch clients with default limit of 10', async () => {
      // Mock db query
      // Assert db called with limit(10)
      // Assert response is mapped via mapDBModelToClientModel
    });

    it('should respect custom limit parameter', async () => {
      // Arrange: call with limit = 5
      // Assert: db called with limit(5)
    });

    it('should map database model to client model correctly', async () => {
      // Arrange: mock DB returns snake_case model
      // Act: call getClients
      // Assert: returned data is camelCase with correct fields
    });

    it('should handle database errors gracefully', async () => {
      // Arrange: mock db.select throws error
      // Assert: service throws ServiceError with proper context
    });

    it('should handle empty result set', async () => {
      // Arrange: mock empty query result
      // Assert: returns empty array, not null
    });
  });

  describe('getClientByName', () => {
    it('should search clients by partial company name', async () => {
      // Assert: db.where called with 'like' operator and %name%
    });

    it('should return clients matching search term', async () => {
      // Arrange: mock 3 clients from DB
      // Assert: all mapped and returned
    });

    it('should be case-insensitive', async () => {
      // Arrange: search for 'ACME' or 'acme' or 'Acme'
      // Assert: all return same results
    });

    it('should handle no matches gracefully', async () => {
      // Arrange: no clients match search
      // Assert: returns empty array
    });

    it('should handle database errors', async () => {
      // Assert: throws ServiceError
    });

    it('should escape special characters in search term', async () => {
      // Arrange: search for string with %_\\
      // Assert: query is escaped properly
    });
  });
});
```

**Test Coverage Targets:**
- ✅ All happy-path scenarios
- ✅ Error handling (database failures)
- ✅ Edge cases (empty results, special characters)
- ✅ Model mapping correctness
- ✅ Parameter validation

#### 2. **Controller Layer Tests** (HIGH PRIORITY)

**File:** `libs/api/domain/invoices/src/lib/controllers/client.controller.spec.ts`

```typescript
describe('ClientController', () => {
  describe('getClients', () => {
    it('should route to getClientByName if name query param provided', async () => {
      // Arrange: req.query = { name: 'ACME' }
      // Act: call getClients
      // Assert: getClientByName called with 'ACME'
    });

    it('should route to getClientNoFilter if no query params', async () => {
      // Arrange: req.query = {}
      // Act: call getClients
      // Assert: getClientNoFilter called
    });

    it('should return 400 if name param is not a string', async () => {
      // Arrange: req.query = { name: 123 }
      // Assert: returns 400 with 'Bad request' message
    });

    it('should remove console.log debug statement', async () => {
      // This test documents the fix for the console.log issue
    });
  });

  describe('createClient', () => {
    it('should map payload to database model and insert', async () => {
      // Arrange: valid request body
      // Assert: mapClientModelToDBModel called with payload
      // Assert: db.insert called with mapped model
    });

    it('should return 201 on success', async () => {
      // Assert: res.status(201).json() called
    });

    it('should return 500 on database error', async () => {
      // Arrange: db.insert throws error
      // Assert: returns 500
    });

    it('should validate payload before mapping', async () => {
      // Arrange: invalid payload (middleware catches this, but document the flow)
    });
  });

  describe('getClientByName', () => {
    it('should validate name parameter is string', async () => {
      // Assert: v.safeParse used correctly
    });

    it('should return 400 if validation fails', async () => {
      // Arrange: name is not a string
      // Assert: returns 400
    });

    it('should call service and return results', async () => {
      // Assert: clientService.getClientByName called
      // Assert: returns 200 with data
    });

    it('should return 500 on service error', async () => {
      // Arrange: service throws error
      // Assert: returns 500
    });
  });

  describe('getClientNoFilter', () => {
    it('should call service.getClients with default params', async () => {
      // Assert: clientService.getClients() called
    });

    it('should return 200 with clients array', async () => {
      // Assert: returns 200 with clients
    });

    it('should return 500 on service error', async () => {
      // Arrange: service throws error
      // Assert: returns 500
    });
  });
});
```

**Test Coverage Targets:**
- ✅ Request routing logic
- ✅ Parameter validation
- ✅ Response status codes
- ✅ Service integration
- ✅ Error handling

#### 3. **Model Mapping Tests** (MEDIUM PRIORITY)

**File:** `libs/shared/util/src/lib/client.spec.ts`

```typescript
describe('Client Mappers', () => {
  describe('mapClientModelToDBModel', () => {
    it('should transform camelCase payload to snake_case database model', () => {
      // Arrange: valid RMPCreateClientPaylod
      // Assert: all fields mapped correctly
      // Assert: nested address fields flattened
    });

    it('should handle all required fields', () => {
      // Assert: no fields lost in transformation
    });

    it('should not include optional fields in output', () => {
      // Assert: id, currency not in output (only in input schema)
    });

    it('should preserve email format', () => {
      // Assert: email@example.com stays intact
    });

    it('should preserve GSTIN format', () => {
      // Assert: 10+ character string preserved
    });
  });

  describe('mapDBModelToClientModel', () => {
    it('should transform snake_case DB model to camelCase API response', () => {
      // Arrange: RMPClientModel from database
      // Assert: camelCase field names
      // Assert: nested address object reconstructed
    });

    it('should handle optional fields', () => {
      // Arrange: model with/without id, currency, timestamps
      // Assert: all present in output
    });

    it('should handle missing timestamps gracefully', () => {
      // Arrange: created_at and updated_at are undefined
      // Assert: mapped to empty strings (current behavior) or null (preferred)
    });

    it('should reconstruct nested address correctly', () => {
      // Assert: address object with city, state, country, postal_code, address
    });

    it('should be inverse of mapClientModelToDBModel', () => {
      // For full round-trip, missing fields in schema will cause loss
      // Document this limitation
    });
  });
});
```

#### 4. **Integration Tests** (MEDIUM PRIORITY)

**File:** `libs/api/domain/invoices/src/integration.spec.ts`

```typescript
describe('Client Domain - Integration Tests', () => {
  describe('Full flow: Create & Retrieve', () => {
    it('should create a client and retrieve it by name', async () => {
      // 1. Insert client via service
      // 2. Query by name via service
      // 3. Assert retrieved client matches inserted data
    });

    it('should map correctly through full round-trip', async () => {
      // 1. Create with payload (camelCase)
      // 2. Retrieved as RMPClient (camelCase)
      // 3. Assert no data loss
    });
  });

  describe('AI Tool Integration', () => {
    it('getClientByName tool should execute and return formatted results', async () => {
      // Arrange: insert test clients
      // Act: execute tool with company name
      // Assert: returns success with client array
    });

    it('tool should handle no matches gracefully', async () => {
      // Arrange: search for non-existent company
      // Assert: returns success: false with message
    });

    it('tool should handle database errors', async () => {
      // Arrange: mock database failure
      // Assert: returns error response (not throwing)
    });
  });
});
```

#### 5. **AI Tool Tests** (LOW PRIORITY)

**File:** `apps/api/src/agent/tools/getClient.spec.ts`

```typescript
describe('ClientSearchTool', () => {
  describe('schema validation', () => {
    it('should validate companyName parameter', () => {
      // Assert: schema requires non-empty string
    });

    it('should generate correct JSON schema for AI model', () => {
      // Assert: toJsonSchema produces valid OpenAI tool format
    });
  });

  describe('tool execution', () => {
    it('should execute search and return results', async () => {
      // Covered by service tests, but verify tool wrapper
    });

    it('should handle errors and return safe response', async () => {
      // Assert: never throws, returns error object
    });
  });
});
```

### Test Coverage Summary Table

| Layer | File | Coverage Target | Priority | Est. Tests |
|-------|------|-----------------|----------|-----------|
| Service | `client.service.spec.ts` | 90%+ | 🔴 HIGH | 8-10 |
| Controller | `client.controller.spec.ts` | 85%+ | 🔴 HIGH | 12-15 |
| Mapper | `client.spec.ts` | 95%+ | 🟡 MEDIUM | 10-12 |
| Integration | `integration.spec.ts` | Real DB | 🟡 MEDIUM | 5-8 |
| AI Tool | `getClient.spec.ts` | 80%+ | 🟢 LOW | 4-6 |
| **Total** | | | | **40-51** |

### Testing Best Practices

1. **Use Jest with proper setup:**
   ```bash
   npm install --save-dev jest @types/jest ts-jest
   ```

2. **Mock database for unit tests:**
   ```typescript
   jest.mock('@rmp/shared-core', () => ({
     db: jest.fn()
   }));
   ```

3. **Test with real database for integration tests** (separate test suite)

4. **Use test factories for common test data:**
   ```typescript
   const createMockClient = (overrides?: Partial<RMPClient>): RMPClient => ({
     id: '123',
     companyName: 'Test Corp',
     // ... defaults
     ...overrides
   });
   ```

---

## Recommended Changes (Implementation Order)

### Phase 1: Critical Fixes (This Sprint)
- [ ] Fix GSTIN naming mismatch (companyGSTIn → companyGSTIN)
- [ ] Remove console.log from controller
- [ ] Add basic error handling to service layer
- [ ] Add service error class

### Phase 2: Test Coverage (Next Sprint)
- [ ] Implement service layer tests (8-10 tests)
- [ ] Implement controller tests (12-15 tests)
- [ ] Implement mapper tests (10-12 tests)
- [ ] Reach 80%+ coverage

### Phase 3: Enhancements (Following Sprint)
- [ ] Implement integration tests
- [ ] Improve AI tool error handling
- [ ] Complete GET /:id and PUT /:id endpoints
- [ ] Add logging strategy (Winston/Pino)

---

## Related Design Patterns

### Connections to Existing Patterns

**[[api-library-architecture]]**
- The service layer follows the domain-specific library structure
- Respects the shared/core dependency pattern

**[[validation-middleware-pattern]]**
- Request body validation is handled by middleware
- Query parameter validation is in controller
- Consider unifying validation strategy

**[[database-migration-pattern]]**
- Services depend on the database connection from shared/core
- Uses Knex for queries, as established in migration pattern

---

## Design Pattern Decision

### Pattern Name
**Service-Repository Pattern with Valibot Schema Validation**

### When to Use
- Multi-layered REST APIs with business logic
- APIs that need to serve both HTTP and non-HTTP consumers (e.g., AI tools)
- Applications using Knex for database access
- Projects requiring strong type safety and validation

### When NOT to Use
- Simple CRUD APIs (use direct database queries)
- Serverless functions with minimal logic (overhead not worth it)
- High-performance scenarios where latency is critical (layer overhead)

### Key Principles
1. Controllers handle HTTP concerns only
2. Services contain all business logic and data transformation
3. Models define the contract (schema + types)
4. Errors should be caught and handled at appropriate layers
5. Code should be testable at each layer

---

## Sign-Off

**Current Status:** ✅ Pattern Defined  
**Recommendation:** Adopt service pattern with critical fixes and comprehensive testing  
**Next Review:** After Phase 2 (test coverage implementation)  
**Owner:** Development Team

---

## Appendix: Code Review Checklist

Use this when reviewing new client-related PRs:

- [ ] Service methods have try-catch blocks
- [ ] Errors are logged with context
- [ ] Controllers route requests correctly
- [ ] Response status codes are appropriate (200, 201, 400, 500)
- [ ] No console.log in production code
- [ ] Model names are consistent (GSTIN, not GSTIn)
- [ ] AI tools handle errors safely
- [ ] New tests cover happy path and error cases
- [ ] Test coverage doesn't decrease
- [ ] No unimplemented route handlers

---

*Generated: 2026-06-15*  
*Review Cadence: Every 2 weeks or after major changes*
