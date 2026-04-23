# Week 5: Judge-Based Evaluation and Observability

## Weekly Goal

Learn how to evaluate full task quality when deterministic checks are no longer enough.

This week introduces semantic grading and tracing.

---

## Main Focus

- use LLM-as-a-judge for final answers
- combine strict and flexible evaluation
- add tracing with Laminar and OpenTelemetry
- classify failure types

---

## Suggested Time Style

Suggested structure:

- `20 min` research
- `25 min` implementation
- `15 min` reviewing outputs

---

## Tasks

### 1. Build a Judge Schema
Use structured output for grading.

Example fields:

- `score`
- `reason`
- `passed`

### 2. Judge Final Responses
Evaluate things like:

- task completion
- correctness
- honesty about missing data
- whether the agent falsely claims something was saved

### 3. Combine Evaluators
Run a final evaluation that includes:

- tool order checks
- forbidden tool checks
- judge-based scoring

### 4. Add Tracing
Integrate:

- `Laminar`
- `OpenTelemetry`

Trace:

- iterations
- tool consideration
- tool execution
- final answer generation

### 5. Create a Failure Taxonomy
Create categories like:

- wrong tool selected
- missing tool
- wrong order
- schema mismatch
- repeated loop
- weak final answer
- forbidden tool used

---

## Research Topics

### Research 1: LLM-as-a-Judge
Read about:

- when semantic evaluation is needed
- model bias
- cost and latency trade-offs
- why judges need structured outputs

### Research 2: Observability for Agents
Understand:

- traces
- spans
- hierarchical execution visibility
- how observability helps explain failures

---

## Practice Ideas

- compare judge scores across several outputs
- review cases where deterministic checks pass but final quality is weak
- review cases where tool path is imperfect but answer is still acceptable

---

## End-of-Week Check

By the end of this week, I should have:

- a judge-based evaluator
- combined evaluation logic
- basic tracing
- a failure taxonomy for debugging

---

## Reflection Questions

- When is deterministic grading enough?
- When is semantic grading necessary?
- Did tracing explain failures better than raw logs?
- Which failures are easiest to fix?
- Which failures require redesign instead of small prompt changes?