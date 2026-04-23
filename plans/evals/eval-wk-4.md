# Week 4: Runtime Visibility and Multi-Turn Evaluation

## Weekly Goal

Move beyond single-turn evaluation and start understanding how full task trajectories can be evaluated.

This week is about observing the agent more clearly and introducing multi-turn test cases.

---

## Main Focus

- improve runtime visibility
- add terminal-friendly callbacks
- create multi-turn mock conversations
- evaluate tool order
- understand why exact text matching breaks down

---

## Suggested Time Style

Suggested structure:

- `15 min` reading
- `30 min` coding
- `15 min` analysis and notes

---

## Tasks

### 1. Add Runtime Callbacks
Add terminal-friendly callbacks such as:

- `onToken`
- `onToolCallStart`
- `onToolCallEnd`
- `onIteration`

This is useful even without a UI.

### 2. Create Multi-Turn Cases
Create test cases with:

- follow-up clarification
- partial information
- continued conversations
- pre-existing conversation history

Example:

- user asks to create invoice
- customer is unclear
- agent asks follow-up
- user clarifies
- agent continues

### 3. Build Tool Order Evaluation
Check whether tools happen in a logical order.

Examples:

- `searchCustomers` before `createInvoiceDraft`
- `calculateInvoice` before `saveInvoice`

### 4. Save Example Execution Traces
For a few sample runs, write down:

- selected tools
- sequence
- final answer
- where it failed or succeeded

---

## Research Topics

### Research 1: Why Exact Matching Stops Working
Read about:

- multiple valid paths
- semantic correctness
- trajectory evaluation
- why final success is bigger than exact text match

### Research 2: Tool Order as Logic Validation
Learn why order matters in agents:

- correctness
- safety
- reliability
- debugging value

---

## Practice Ideas

- create 5 realistic multi-turn scenarios
- compare two valid paths for the same task
- identify which parts should be judged strictly and which should be flexible

---

## End-of-Week Check

By the end of this week, I should have:

- more observable terminal output
- several multi-turn cases
- a tool-order evaluator
- better understanding of trajectory-based evaluation

---

## Reflection Questions

- What changes when evaluation becomes multi-turn?
- Which parts of the interaction should be deterministic?
- Which parts should allow multiple valid outcomes?
- Did runtime visibility help me debug faster?