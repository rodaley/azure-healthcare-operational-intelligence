# 2. Use an npm workspaces monorepo

Status: Accepted

## Context

`prompt/03-API.md` requires that request and response contracts be shared through
`packages/contracts` and that the web and API applications must not define separate,
incompatible API models. The solution also needs a local web application and a local API
(`prompt/00-MASTER-PROMPT.md`, P0) that can evolve together with Azure deployment
tooling added in later priorities.

## Decision

We will use a single repository (monorepo) managed with npm workspaces:

- `apps/api` — the Node.js/TypeScript/Express API.
- `apps/web` — the React web application shell.
- `packages/contracts` — shared TypeScript types and Zod schemas used by both apps.

A shared `tsconfig.base.json` at the repository root defines common TypeScript compiler
options that each workspace extends.

## Consequences

- Contracts are defined once and consumed by both the API and the web app, preventing
  drift between request/response models.
- A single `npm install` at the repository root installs dependencies for all
  workspaces.
- Future packages (for example, a scenario-engine package) can be added under
  `packages/` without restructuring the repository.
