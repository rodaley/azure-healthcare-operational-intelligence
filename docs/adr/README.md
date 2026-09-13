# Architecture Decision Records

This folder contains Architecture Decision Records (ADRs) for the Azure Healthcare
Operational Intelligence Accelerator.

Each ADR documents a significant architectural decision, the context that drove it, and
its consequences.

## Format

ADRs use the lightweight Michael Nygard format:

- Title
- Status (Proposed | Accepted | Superseded | Deprecated)
- Context
- Decision
- Consequences

## Index

| ADR                                                     | Title                                          | Status   |
| -------------------------------------------------------- | ----------------------------------------------- | -------- |
| [0001](./0001-record-architecture-decisions.md)         | Record architecture decisions                  | Accepted |
| [0002](./0002-monorepo-structure.md)                     | Use an npm workspaces monorepo                 | Accepted |
| [0003](./0003-file-repository-for-p0.md)                | Use FileRepository for P0 persistence          | Accepted |
| [0004](./0004-deterministic-demo-ai-provider.md)         | Use DeterministicDemoProvider as default AI    | Accepted |
