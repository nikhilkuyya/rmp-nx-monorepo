# Nested Form Refactor — Corrected Analysis

**Angular version:** 21.1.1 · **API:** `@angular/forms/signals` (experimental 21.0.0)

---

## What the previous suggestion got wrong

The original document described a "reactivity gap" and recommended passing a
`FormField<RMPAddress>` as an `@Input()`. **Both the diagnosis and the recommended fix
are incorrect.** This document supersedes it.

---

## Actual Bug Analysis

### Current binding (broken)

```html
<!-- create.html -->
<rmp-address [(address)]="this.rmpClientForm.address().value" />
```

### Why it breaks — step by step

`rmpClientForm` is `FieldTree<RMPCreateClientPaylod>`, the object returned by `form()`.

Navigating a property on a `FieldTree` gives a child `FieldTree`:
```
rmpClientForm.address       → FieldTree<RMPAddress>
```

Calling a `FieldTree` as a function invokes its state accessor:
```
rmpClientForm.address()     → FieldState<RMPAddress>
```

`.value` on `FieldState` is typed as `WritableSignal<RMPAddress>` (see `FieldNode.get value(): WritableSignal<unknown>` in the Angular 21 source):
```
rmpClientForm.address().value  → WritableSignal<RMPAddress>   ← a function, not a value
```

Angular's `[(address)]` two-way binding desugars to:

```html
[address]="this.rmpClientForm.address().value"
(addressChange)="this.rmpClientForm.address().value = $event"
```

The child declares:
```typescript
address = model.required<RMPAddress>();   // ModelSignal<RMPAddress>
```

`ModelSignal<RMPAddress>` expects an `RMPAddress` plain object on `[address]`.
What it actually receives is `WritableSignal<RMPAddress>` — **a function**.

As a result, `this.address` inside `NewRMPAddress` holds a `WritableSignal<RMPAddress>`
function reference, **not** an `RMPAddress`. The downstream:

```typescript
addressForm = form<RMPAddress>(this.address);
```

wraps a signal whose current value is another signal (a function) instead of an
address object. All sub-fields render garbage. Any typed form interactions silently
malfunction. This is a **type mismatch**, not just a timing or stale-reference issue.

The `(addressChange)` write-back also has no effect because Angular cannot assign
into `WritableSignal<RMPAddress>` itself — it is not an assignable lvalue.

---

## Why the Previous "Option A" Is Wrong

The original recommendation was:

```typescript
// Parent template
<rmp-address [addressForm]="rmpClientForm.address" />

// Child
@Input() addressForm!: FormField<RMPAddress>;
```

**Two distinct errors:**

### Error 1 — Type confusion: `FormField<T>` ≠ `FieldTree<T>`

`FormField<T>` (selector `[formField]`) is an **Angular directive** — a DOM binding agent.
Its role is to wire a `FieldTree<T>` to a UI control at render time.

`rmpClientForm.address` is a `FieldTree<RMPAddress>` — the reactive data node.

You cannot pass a `FieldTree` where a `FormField` directive instance is expected.
`FormField` instances are created by Angular's DI/compiler inside the DOM, not by
hand. Declaring `@Input() addressForm!: FormField<RMPAddress>` will compile but
receive `undefined` at runtime.

### Error 2 — The API semantics

Even if the type were corrected to `FieldTree<RMPAddress>`, using `@Input()` (not
`input()`) is the older API style. More importantly, the framework provides a
purpose-built integration contract for exactly this pattern — `FormValueControl<T>`
— which the original suggestion ignores entirely.

---

## Correct Options

### Option B — Explicit one-way + event (minimal change, not recommended)

Fix the template binding manually without refactoring the child.

```html
<!-- create.html -->
<rmp-address
  [address]="rmpClientForm.address().value()"
  (addressChange)="rmpClientForm.address().value.set($event)" />
```

**Reading the value correctly:**
`rmpClientForm.address().value` is `WritableSignal<RMPAddress>`. Call it to get the
current plain value: `rmpClientForm.address().value()`.

**Writing back correctly:**
`rmpClientForm.address().value.set($event)` updates the signal properly.

No changes to `address.ts` or `create.ts`.

**Pros:**
- Zero refactoring risk
- Explicit, easy to trace

**Cons:**
- Bypasses Signal Forms' touched/dirty tracking — the parent form doesn't know when
  address sub-fields are blurred or changed, breaking overall form `dirty` and
  `touched` state
- `.value.set(...)` writes to the model but not through the form's "mark dirty"
  pathway, so `rmpClientForm().dirty()` won't reflect changes in the address section
- Not idiomatic for Angular 21 Signal Forms

---

### Option C — `FormValueControl<T>` with `[formField]` ⭐ Recommended

This is the **canonical Angular 21 Signal Forms pattern** for reusable sub-form
components. It uses the built-in `FormValueControl<T>` contract.

**The contract rule:** a component that exposes `value = model<T>()` is automatically
compatible with the `[formField]` directive. The directive two-way-binds the parent
`FieldTree<T>` to the child `value` model, propagating value changes in both
directions and syncing the touched state.

#### `address.ts` — change `address` to `value`

```typescript
import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RMPAddress } from '@org/models';
import { RMPInput } from '@rmp/shared-ui-ang';

@Component({
  selector: 'rmp-address',
  template: `
    <fieldset>
      <rmp-input [formField]="addressForm.address" id="rmp-address-form-address" label="Address" />
      <rmp-input [formField]="addressForm.city" id="rmp-address-form-city" label="City" />
      <rmp-input
        [formField]="addressForm.postalCode"
        id="rmp-address-form-postal-code"
        label="Postal Code"
      />
    </fieldset>
  `,
  imports: [FormField, RMPInput, CommonModule],
})
export class NewRMPAddress {
  value = model.required<RMPAddress>();       // was: address = model.required<RMPAddress>()
  protected addressForm = form<RMPAddress>(this.value);
}
```

#### `create.html` — replace `[(address)]="..."` with `[formField]`

```html
<form>
  <rmp-input [formField]="rmpClientForm.companyName" id="rmp-company-name-form-element"
      label="Company Name"></rmp-input>
  <rmp-input [formField]="rmpClientForm.companyGSTIn" id="rmp-company-gstin-form-element"
      label="Company GST"></rmp-input>
  <rmp-input [formField]="rmpClientForm.invoiceEmail" id="rmp-invoice-email-form-element"
      label="Company Email"></rmp-input>
  <rmp-address [formField]="rmpClientForm.address" />
</form>
```

`create.ts` — **no changes needed**.

**How it works:** `[formField]="rmpClientForm.address"` passes `FieldTree<RMPAddress>`
to the `FormField` directive. The directive detects that `NewRMPAddress` has a
`value: ModelSignal<RMPAddress>` (satisfying `FormValueControl<RMPAddress>`), and
automatically keeps parent and child values in sync. Blur events in the child
correctly propagate touched state up to the parent's address field.

**Pros:**
- Idiomatic Angular 21 Signal Forms
- Touched and value changes propagate to parent `FieldTree` correctly
- `NewRMPAddress` is fully reusable — works with any `FieldTree<RMPAddress>` from
  any parent, not tied to `NewClient`'s form structure
- The child creates its own local `form()` view of the address, enabling address-
  specific schema rules (required, pattern, etc.) without parent knowledge

**Cons — important caveat on validation state:**
The child's `addressForm = form<RMPAddress>(this.value)` creates an **independent
second `FieldTree`**. Validation rules you add inside that child form (e.g., `required`
on `postalCode`) are computed in the child's tree and are **not visible** to
`rmpClientForm.address().errors()` or `rmpClientForm().valid()` in the parent.

This means:
- `submit(rmpClientForm, ...)` — address field errors **won't** block submission
  unless you re-declare the same rules in the parent's schema
- An error summary rendered from `rmpClientForm().errorSummary()` **won't** include
  address sub-field errors from the child

If address validation is cosmetic-only in the child (show inline errors but not
block the parent form), Option C is fine as-is. If address validation must gate
parent submission, see Option D.

---

### Option D — `input<FieldTree<RMPAddress>>()` (single form, full propagation)

Eliminate the child's local `form()` entirely. The child accepts the parent's
`FieldTree<RMPAddress>` sub-node directly and renders it.

#### `address.ts`

```typescript
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { RMPAddress } from '@org/models';
import { RMPInput } from '@rmp/shared-ui-ang';

@Component({
  selector: 'rmp-address',
  template: `
    <fieldset>
      <rmp-input [formField]="addressField().address" id="rmp-address-form-address" label="Address" />
      <rmp-input [formField]="addressField().city" id="rmp-address-form-city" label="City" />
      <rmp-input
        [formField]="addressField().postalCode"
        id="rmp-address-form-postal-code"
        label="Postal Code"
      />
    </fieldset>
  `,
  imports: [FormField, RMPInput, CommonModule],
})
export class NewRMPAddress {
  addressField = input.required<FieldTree<RMPAddress>>();
}
```

#### `create.html`

```html
<rmp-address [addressField]="rmpClientForm.address" />
```

`create.ts` — **no changes needed**.

**How it works:** There is one `FieldTree` for the whole client form. The address
sub-tree is a node inside it. Validation rules on `rmpClientForm`'s schema that
target `.address.postalCode` etc. propagate naturally. The child only renders the
fields; it does not own any form state.

**Pros:**
- True single source of truth — no dual form, no sync issues of any kind
- Validation errors in the address section are visible to the parent form
  (`rmpClientForm().valid()`, `submit()`, error summaries all work correctly)
- Touched/dirty propagate naturally through the single tree
- Conceptually the simplest at runtime

**Cons:**
- The child component is **tightly coupled to `@angular/forms/signals`** — it cannot
  be used outside a Signal Forms context (e.g., in a Storybook story, a unit test
  without a form, or a future form strategy migration)
- Address-specific validation rules must live in the **parent's schema**, not in the
  child component. If multiple parent forms embed `<rmp-address>`, each must
  redeclare the rules
- Harder to independently test — requires a full `form()` setup in every unit test

---

## Decision Guide

| Requirement | Best option |
|---|---|
| Minimal changes, not blocking parent submission | Option B |
| Clean Angular 21 idiom, self-contained child validation | Option C |
| Address validation must block parent `submit()` | Option D |
| Address validation in parent schema already / address is dumb display | Option D |
| Reusable address component used by multiple different parent forms | Option C |

For this project, **Option C** is the right starting point. The address component
already has a local `form()` and manages its own rendering. If you later need parent-
level submission gating on address fields, add a `schema(p => { required(p.address.postalCode); ... })` to `rmpClientForm` in `create.ts` — that's additive and
doesn't require changing the component boundary.

---

## Affected Files and Change Summary

| File | Change |
|---|---|
| `apps/rmp-invoice/src/app/clients/address.ts` | Rename `address` model → `value` |
| `apps/rmp-invoice/src/app/clients/create.html` | Replace `[(address)]="..."` → `[formField]="rmpClientForm.address"` |
| `apps/rmp-invoice/src/app/clients/create.ts` | No change |

---

## Quick Reference: Angular 21 Signal Forms Types

| Name | What it is |
|---|---|
| `FieldTree<T>` | Reactive data node — navigate sub-fields, call `()` to get state |
| `FieldState<T>` | State bag — `.value` (WritableSignal), `.errors()`, `.dirty()`, etc. |
| `FormField<T>` | **Directive** (selector `[formField]`) — binds a `FieldTree` to a control |
| `FormValueControl<T>` | Contract — component exposes `value: ModelSignal<T>` to integrate with `[formField]` |
| `form(signal, schema?)` | Factory — creates a root `FieldTree<T>` from a `Signal<T>` |

---

**Date Updated:** 2026-06-19
**Status:** Ready for implementation — Option C
