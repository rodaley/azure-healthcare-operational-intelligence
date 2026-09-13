# 1. Record architecture decisions

Status: Accepted

## Context

The Azure Healthcare Operational Intelligence Accelerator is delivered incrementally
across P0 (Local Demonstration), P1 (Azure Deployable Demonstration), P2 (Reusable
Accelerator), and P3 (Production Extensions) priorities, as defined in
`prompt/00-MASTER-PROMPT.md`. Significant architectural decisions need to be recorded so
that future contributors understand why a given approach was chosen and what
constraints it must satisfy.

## Decision

We will use Architecture Decision Records (ADRs), stored in `docs/adr`, to capture
architecturally significant decisions made during the implementation of this
accelerator.

## Consequences

- Every significant architectural decision is documented alongside the code.
- New contributors can review `docs/adr` to understand prior decisions before proposing
  changes.
- ADRs are numbered sequentially and are immutable once accepted; superseding decisions
  are recorded as new ADRs that reference the ones they replace.
