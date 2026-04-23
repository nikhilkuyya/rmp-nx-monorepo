# Week 2: Single-Turn Evals

## Weekly Goal

Learn how to evaluate whether an agent selects the right tools for a single prompt.

This week is about building confidence with **controlled and deterministic tests**.

---

## Main Focus

- create first eval dataset
- write golden evals
- write negative evals
- handle ambiguous prompts
- learn precision, recall, and F1 in the context of tool choice

---

## Suggested Time Style

Suggested structure:

- `15 min` research / reading
- `30 min` coding
- `15 min` running evals and writing notes

---

## Tasks

### 1. Golden Evals
Create test cases where the tool selection should match expected tools.

Example:

Prompt:
`Find Acme and preview a new invoice`

Expected tools:
- `searchCustomers`
- `createInvoiceDraft`
- `previewInvoice`

### 2. Negative Evals
Create cases where certain tools must not be used.

Example:

Prompt:
`Preview the invoice only, do not save it`

Forbidden tool:
- `saveInvoice`

### 3. Ambiguous Prompt Evals
Create prompts where exact matching is too strict.

Examples:

- `Help me with invoices`
- `Show invoice info for Acme`
- `Get customer invoice history`

For these, compare selected tools using:

- precision
- recall
- F1

### 4. Eval Runner
Create one command such as:

```bash
npm run evals