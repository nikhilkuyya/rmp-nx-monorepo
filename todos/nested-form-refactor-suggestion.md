# Nested Form Refactor Suggestion

## Current Issue
The address binding in `create.html` has a reactivity gap:
```html
<rmp-address [(address)]="this.rmpClientForm.address().value" />
```

**Problem:** Passing `.value` (plain object) instead of the signal breaks two-way synchronization and creates stale references.

---

## Design Pattern Options

### Option A: Inherited Form Pattern (Recommended) ⭐
**Pattern:** Child receives and accesses the parent's form structure directly—no dual form creation.

**Implementation:**
```typescript
// Parent
<rmp-address [addressForm]="rmpClientForm.address" />

// Child
export class NewRMPAddress {
  @Input() addressForm!: FormField<RMPAddress>;
}
```

**Advantages:**
- Single source of truth (one form)
- Automatic two-way binding at form level
- No value extraction needed
- Better performance (no redundant signal watchers)
- Aligns with reactive form best practices

**Status:** ⏳ Pending Implementation

---

### Option B: Form State Composition Pattern
**Pattern:** Parent and child each manage their own form, but parent owns model truth.

**Implementation:**
```typescript
// Parent
<rmp-address [address]="rmpClientForm.address()" 
             (addressChange)="updateAddress($event)" />

// Child
@Input() address!: RMPAddress;
@Output() addressChange = new EventEmitter<RMPAddress>();
```

**Advantages:**
- Each component is self-contained
- Better testability in isolation
- Clear input/output contracts

**Disadvantages:**
- Requires explicit synchronization logic
- Dual form management overhead

**Status:** ⏳ Alternative Option

---

### Option C: Reactive Form Injection Pattern
**Pattern:** Parent injects the form group; child configures only its portion.

**Advantages:**
- Scalable for deeply nested forms
- Clear separation of concerns
- Leverages form control hierarchy

**Status:** ⏳ For Complex Nested Forms

---

## Recommendation
**Proceed with Option A (Inherited Form Pattern)**

### Why:
1. Eliminates the `.value` extraction bug
2. Single form instance = reliable synchronization
3. Simpler synchronization logic
4. Angular reactive form best practice alignment

### Affected Files:
- `apps/rmp-invoice/src/app/clients/address.ts` - Child component signature
- `apps/rmp-invoice/src/app/clients/create.ts` - Parent component form passing
- `apps/rmp-invoice/src/app/clients/create.html` - Template binding

### Next Steps:
1. Update `NewRMPAddress` to accept `addressForm` input
2. Update parent template to pass form control
3. Remove dual form creation in child
4. Verify two-way binding works correctly
5. Test with nested form submission

---

**Date Created:** 2026-06-19  
**Status:** Ready for Implementation
