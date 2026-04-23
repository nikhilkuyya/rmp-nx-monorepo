
---

## `week-3-agent-loop-basics.md`

```markdown
# Week 3: Agent Loop Fundamentals

## Weekly Goal

Understand the core architecture of an agent loop.

This week is about learning that an agent is not magic.  
It is a loop that manages messages, tool calls, and stopping conditions.

---

## Main Focus

- build a minimal loop
- manage conversation state
- connect tool calls to results
- add safety limits
- understand workflow vs agent

---

## Suggested Time Style

Suggested structure:

- `20 min` reading / understanding architecture
- `25 min` implementation
- `15 min` testing and notes

---

## Tasks

### 1. Build a Minimal Agent Loop
Implement a loop that:

- keeps a `messages[]` array
- calls the model
- checks whether a tool should be called
- runs the mock tool
- appends the tool result
- repeats until final answer

Keep it simple.

### 2. Manage Tool Call IDs
Make sure each tool result is linked back to the correct tool request.

Think of this like frontend state consistency.

### 3. Add Exit Conditions
Protect against infinite loops with:

- maximum iterations
- stop when there are no tool calls
- stop after repeated errors

### 4. Add Loop Tests
Write tests for:

- tool result appending
- iteration stopping
- error handling
- max loop count

---

## Research Topics

### Research 1: Workflow vs Agent
Learn the difference between:

- a fixed workflow
- a dynamic tool-choosing agent

### Research 2: State Management in Agent Loops
Map this to frontend thinking:

- conversation history as state
- tool events as state transitions
- bugs caused by incorrect updates

---

## Practice Ideas

- walk through one prompt manually on paper
- list each expected step in the loop
- compare manual reasoning with actual loop behavior

Example prompt:
`Create a draft invoice for Acme and preview it`

Expected thinking path:

1. search customer
2. create draft
3. preview result
4. final response

---

## End-of-Week Check

By the end of this week, I should have:

- a minimal working agent loop
- proper message state updates
- safe exit conditions
- better understanding of when an agent is necessary

---

## Reflection Questions

- Which part of the loop feels most confusing?
- Did state bugs appear during implementation?
- Is this invoice sandbox truly an “agent” problem, or partly a workflow problem?
- What did I learn by tracing the loop manually?