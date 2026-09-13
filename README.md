# Azure Healthcare Operational Intelligence Accelerator

A demonstration accelerator showing how healthcare organizations can unify operational
visibility across Azure services, healthcare applications, integration platforms,
infrastructure dependencies, synthetic monitoring, and operational workflows.

All data in this repository is synthetic. No real patient data is used or processed.
See `prompt/` for the full authoritative specification set.

## Status

This repository currently implements **P0 — Local Demonstration** scaffolding only, per
[issue #1](https://github.com/rodaley/azure-healthcare-operational-intelligence/issues/1):

- Monorepo structure (npm workspaces)
- Architecture Decision Records (`docs/adr`)
- Shared contracts package (`packages/contracts`)
- Scenario manifest structure (`data/scenarios`)
- `FileRepository` local persistence
- `DeterministicDemoProvider` AI provider
- API skeleton (`apps/api`)
- React application shell (`apps/web`)

Azure deployment, Cosmos DB, and Key Vault are explicitly out of scope for P0 and are
tracked in follow-up issues.

## Repository structure

```
apps/
  api/            Node.js + TypeScript + Express API
  web/             React + TypeScript web application shell
packages/
  contracts/       Shared Zod schemas and TypeScript types
data/
  baseline/        Baseline synthetic organization data
  scenarios/        Versioned scenario manifests
docs/
  adr/              Architecture Decision Records
prompt/              Authoritative product specifications
```

## Getting started

Requires Node.js 22 LTS.

```bash
npm install
npm run build

# Run the API (prints a temporary presenter access code to the console)
npm run dev:api

# In another terminal, run the web app
npm run dev:web
```

Run tests for every workspace:

```bash
npm test
```

## Local persistence

The API persists all data to local JSON files under `./data` (configurable via the
`DATA_DIRECTORY` environment variable) using `FileRepository`. No Azure services are
required to run the accelerator locally.

## AI provider

The API uses `DeterministicDemoProvider` by default, which answers Executive Copilot
questions with fixed, evidence-grounded responses so demonstrations are fully
repeatable without any dependency on Azure OpenAI.
