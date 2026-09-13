# 4. Use DeterministicDemoProvider as default AI

Status: Accepted

## Context

`prompt/01-Architecture.md` requires a `DeterministicDemoProvider` that "supports all
demonstrations" and states that the complete solution must function if Azure OpenAI is
unavailable. `prompt/00-MASTER-PROMPT.md` excludes any Azure deployment work from P0.
Executive demonstrations must be fully repeatable and must not depend on a live model
endpoint.

## Decision

We will implement `DeterministicDemoProvider`, an AI provider that answers the fixed set
of Executive Copilot questions defined in `prompt/02-Application.md` using canned,
evidence-grounded responses derived from the active scenario manifest. It will be the
default and only AI provider implemented in P0. An optional `AzureOpenAIProvider` is
deferred to a later priority and will implement the same `AiProvider` interface.

## Consequences

- Demonstrations are fully deterministic and reproducible without network access or an
  Azure OpenAI resource.
- Every answer includes Assessment, Evidence, Confidence, Uncertainty, and Human
  Validation Requirements sections, satisfying the Application specification.
- Adding `AzureOpenAIProvider` later requires only a new implementation of the shared
  `AiProvider` interface and a provider-selection mechanism.
