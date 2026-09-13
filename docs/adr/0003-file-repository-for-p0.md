# 3. Use FileRepository for P0 persistence

Status: Accepted

## Context

`prompt/00-MASTER-PROMPT.md` explicitly excludes Cosmos DB from P0 ("Do not implement
Cosmos DB"). `prompt/01-Architecture.md` still requires logical separation of Baseline
Data, Scenario Definitions, Live Scenario Runs, Rehearsal Runs, Sessions, and Audit
Events. The API needs a working local persistence mechanism so that the accelerator can
be demonstrated entirely offline before any Azure resources exist.

## Decision

We will implement a `FileRepository` that persists each logical data category as JSON
documents on the local filesystem, under a configurable data directory (defaulting to
`./data`). `FileRepository` implements a generic repository interface so that a future
Cosmos DB–backed implementation (planned for P1) can be substituted without changing
calling code.

## Consequences

- The API can run and be demonstrated with zero external dependencies.
- Logical data separation is preserved through distinct sub-directories/collections
  (baseline, scenario-definitions, scenario-runs, rehearsal-runs, sessions,
  idempotency-records, audit-events, reviews).
- A follow-up ADR and implementation will introduce a Cosmos DB-backed repository for
  P1 behind the same interface.
