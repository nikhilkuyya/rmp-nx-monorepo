# API Library Architecture Decision

**Date:** 2026-04-28  
**Decision:** Layered Architecture for API Libraries  
**Status:** Adopted

## Chosen Architecture

```
libs/api/
├── shared/
│   └── clients/      ← Shared utilities for API communication
└── domain/
    └── invoices/     ← Domain-specific logic (depends on shared/clients)
```

## Rationale

1. **Clear Separation of Concerns**
   - `shared/clients`: Infrastructure layer — reusable HTTP clients and utilities
   - `domain/invoices`: Business logic layer — domain-specific implementations

2. **Scalability**
   - Makes it easy to add more domain libraries (payments, orders, etc.) following the same pattern
   - Prevents architectural confusion as the codebase grows

3. **Dependency Management**
   - Explicit dependency flow: domain → shared → external
   - Easier to prevent circular dependencies
   - Clear what is a utility vs. a business domain

## Future Considerations

- As more domains are added, consider if additional layers (e.g., `libs/api/core`, `libs/api/integrations`) are needed
- Enforce dependency rules with Nx project graph constraints if needed
