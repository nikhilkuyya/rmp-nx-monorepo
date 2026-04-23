# Week 1: Foundations and Learning Setup

## Weekly Goal

Build the base learning environment and understand what **Agent Evals** actually are.

This week is intentionally slow.  
The goal is not to finish a lot of code.  
The goal is to build a strong mental model.

---

## Main Focus

- set up a small TypeScript learning project
- define the scope of the invoice terminal sandbox
- create deterministic mock data
- understand what evals measure
- write personal notes after each session

---

## Suggested Time Style

Use around **1 hour per session**, but allow more time for reading if needed.

Suggested structure:

- `20 min` reading / research
- `25 min` coding
- `15 min` notes / reflection

If research takes longer, that is fine.

---

## Tasks

### 1. Project Setup
Create a small project with:

- `TypeScript`
- `Vitest`
- `Zod`
- CLI entry point
- folders:
  - `src/agent`
  - `src/tools`
  - `src/mocks`
  - `src/evals`
  - `notes`

### 2. Define Project Scope
Write down the narrow scope of the sandbox.

Keep it limited to:

- invoice-related mock data
- tool calling
- terminal output
- eval learning

Do not include:

- real APIs
- database
- auth
- UI
- PDF generation

### 3. Create Mock Data
Create JSON fixtures for:

- customers
- products or services
- invoices
- invoice drafts

Keep the data small and readable.

### 4. Add Simple Filter Helpers
Implement filter logic for:

- customer name
- status
- category
- invoice status

### 5. Define Initial Tools
Draft tool ideas such as:

- `searchCustomers`
- `searchProducts`
- `searchInvoices`
- `createInvoiceDraft`
- `calculateInvoice`
- `previewInvoice`
- `saveInvoice`

Do not worry about agent loop yet.

---

## Research Topics

Spend extra time here if needed.

### Research 1: What Agent Evals Measure
Read about:

- output testing vs decision testing
- deterministic testing
- why mocking matters
- why agent evaluation is different from unit testing

### Research 2: Golden vs Negative Evals
Understand:

- golden evals
- negative evals
- what “must do” vs “must avoid” means

---

## Practice Ideas

- write 10 invoice-related user prompts
- identify which tools each prompt would probably need
- write down which tools should never be used for certain prompts

Example prompts:

- “Find Acme customer and preview a draft invoice”
- “Show unpaid invoices for Beta”
- “Preview only, do not save”
- “Create a draft invoice for active customer Acme”

---

## End-of-Week Check

By the end of this week, I should have:

- a working project setup
- mock JSON data
- basic filtering helpers
- a list of tools
- a clearer understanding of what agent evals are

---

## Reflection Questions

- What is the difference between testing a function and testing an agent?
- Why are deterministic mocks important?
- What would a “passing” invoice agent mean in this project?
- Which tool actions should be considered risky or forbidden?