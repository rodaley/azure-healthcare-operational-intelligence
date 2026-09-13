# Azure Healthcare Operational Intelligence Accelerator

# API Specification

Version: v1.0

Status: FROZEN

---

# Purpose

This document defines the API contract for the Azure Healthcare Operational Intelligence Accelerator.

It is authoritative for:

- API routes
- Request and response validation
- Authentication contexts
- Authorization rules
- Presenter and Audience Sessions
- Scenario concurrency
- Idempotency
- Audience updates
- Human-governed incident actions
- AI investigation requests
- Error handling
- API logging and telemetry

Application behavior is defined in `02-Application.md`.

Security controls are defined in `04-Security.md`.

Azure infrastructure and deployment are defined in `05-Infrastructure.md`.

---

# API Technology

Implement the API using:

- Node.js 22 LTS
- TypeScript
- Express
- Zod
- OpenAPI 3.1
- Pino structured logging

Use TypeScript strict mode.

All request and response contracts must be shared through:

`packages/contracts`

Do not define separate, incompatible API models inside the web and API applications.

---

# API Design Principles

The API must:

- Be versioned
- Validate all inputs
- Validate all outputs
- Enforce authorization server-side
- Deny access by default
- Support deterministic scenario execution
- Support optimistic concurrency
- Support idempotent mutations
- Protect Presenter Mode
- Keep Audience View read-only
- Preserve evidence traceability
- Generate audit events for sensitive actions
- Return consistent error responses
- Avoid exposing Azure implementation details

The API must not:

- Execute real remediation
- Send real notifications
- Access real healthcare systems
- Process patient data
- Make clinical determinations
- Expose credentials or secrets
- Put access-bearing codes in URLs
- Treat UI visibility as authorization
- Use in-memory state as the authoritative scenario state

---

# API Versioning

All business API routes must be grouped under:

`/api/v1`

Exceptions:

- `GET /health`
- `GET /ready`

Breaking changes require a new API version.

The API version must be returned through:

`GET /api/v1/version`

The version response must include:

- Application version
- API version
- Schema version
- Scenario-data version
- Primary scenario version
- Demo-script version

---

# Validation Requirements

Use shared Zod schemas to validate:

- Request bodies
- Path parameters
- Query parameters
- Required headers
- Response bodies
- Configuration values
- Scenario commands
- AI investigation responses
- Error responses

Invalid requests must be rejected before business logic executes.

Do not silently discard invalid fields.

Protect against mass assignment by mapping validated inputs into explicit command objects.

Apply limits to:

- Request-body size
- String length
- Array length
- JSON nesting depth where practical
- AI question length
- Filter complexity
- Pagination size

---

# Authentication Contexts

The API must distinguish four authentication contexts.

## Public Context

Public access is limited to:

- Process health
- Basic readiness status
- Safe application-version information
- Presenter-code exchange
- Audience-code exchange
- Public application configuration that contains no secrets

Public access must not include:

- Presenter controls
- Scenario mutations
- Detailed readiness diagnostics
- Incident approval actions
- Production-readiness changes
- Cost-model changes
- Administrative reset
- Seed operations
- Cleanup operations
- Presenter notes

---

## Audience Session

An Audience Session is a short-lived, read-only session scoped to one ScenarioRun.

Audience Sessions may:

- Read an audience-safe presentation state
- Read the current scene
- Read the audience-safe incident summary
- Receive audience-safe scene updates
- Reconnect to the active presentation
- Read presentation progress

Audience Sessions must not:

- Start a scenario
- Advance a scenario
- Move backward
- Pause or resume
- Reset or restore
- Approve remediation
- Validate workflow impact
- Validate facility scope
- Generate investigations
- Change cost assumptions
- Change production-readiness gates
- Access presenter notes
- Access administrative operations
- Access another ScenarioRun

The API must enforce Audience Session restrictions even if a user invokes routes directly.

---

## Demo Mode Presenter Session

A Demo Mode Presenter Session is created after successful exchange of the deployment-generated presenter access code.

A Presenter Session may:

- Access Presenter Mode
- Access detailed Demo Readiness results
- Create owned ScenarioRuns
- Control owned ScenarioRuns
- Start Rehearsal Mode
- Generate AI-assisted investigations
- Validate synthetic healthcare workflow impact
- Validate fictional facility scope
- Approve simulated remediation
- Validate recovery
- Generate synthetic post-incident reviews
- Approve synthetic post-incident reviews
- Create Audience Sessions
- Revoke Audience Sessions
- Reset owned ScenarioRuns
- Restore owned ScenarioRuns
- Reset demonstration cost assumptions

A Presenter Session must not:

- Read Key Vault secrets
- Rotate the presenter code directly
- Modify Azure infrastructure
- Access another presenter’s ScenarioRun
- Execute production remediation
- Send real notifications
- Modify baseline synthetic history outside authorized reset workflows

---

## Secure Mode User Session

Secure Mode uses Microsoft Entra authentication and server-side app-role authorization.

Supported roles:

- Viewer
- Operator
- Incident Commander
- Demo Administrator

### Viewer

May:

- Read dashboards
- Read synthetic incidents
- Read evidence
- Read production-readiness information
- Read cost information

May not perform mutations.

### Operator

May:

- Perform Viewer actions
- Create ScenarioRuns
- Control owned ScenarioRuns
- Request AI-assisted investigations
- Generate communication previews

May not approve remediation unless separately assigned the Incident Commander role.

### Incident Commander

May:

- Perform Operator actions
- Validate workflow impact
- Validate facility scope
- Approve simulated remediation
- Validate recovery
- Approve post-incident reviews

### Demo Administrator

May:

- Perform all demonstration actions
- Reset demonstration data
- Revoke Audience Sessions
- Manage demo configuration
- Initiate authorized cleanup
- Modify production-readiness demonstration gates
- Reset cost-model assumptions

Authorization must be enforced by the API.

Hiding a control in the UI is not sufficient authorization.

---

# Local Presenter Authentication

Local execution must not require:

- Azure Key Vault
- Microsoft Entra
- An Azure subscription
- A stored development secret

When the local API starts:

1. Bind to `localhost` by default.
2. Generate a temporary presenter access code using a cryptographically secure random-number generator.
3. Display the code only in the local process console.
4. Do not write the plaintext code to a file.
5. Store only a secure one-way representation where practical.
6. Expire the code when the local API process stops.
7. Allow a fixed presenter code only under `NODE_ENV=test`.
8. Reject the test-only presenter code outside automated tests.

Opening the API on a nonlocalhost interface must require explicit configuration and display a security warning.

---

# Session Requirements

Presenter and Audience Sessions must:

- Use cryptographically random session identifiers
- Use short-lived sessions
- Have configurable inactivity expiration
- Have configurable absolute expiration
- Be revocable
- Rotate identifiers after successful authentication
- Reject expired sessions
- Reject revoked sessions
- Avoid exposing session identifiers to application telemetry
- Record audit-safe session lifecycle events

When cookie-based sessions are used:

- Use HTTP-only cookies
- Use Secure cookies in Azure
- Use an appropriate SameSite policy
- Apply explicit CSRF protection to mutations
- Never store session identifiers in localStorage
- Never expose session cookies to client-side JavaScript

Presenter-code rotation must revoke all existing Demo Mode Presenter Sessions by default.

---

# Presenter Code Exchange

The presenter access code must be submitted only in the body of a POST request.

It must not appear in:

- URL paths
- Query strings
- Browser history
- Referrer headers
- Application Insights request names
- API access logs
- Error messages
- Telemetry
- Screenshots

Required flow:

1. Presenter opens Presenter Mode.
2. Presenter enters the access code.
3. Browser sends the code through a rate-limited POST request.
4. API validates the code.
5. API creates a short-lived Presenter Session.
6. API rotates the session identifier.
7. API returns only safe session information.
8. The plaintext presenter code is not retained in the browser.

Apply:

- Rate limiting
- Progressive delay
- Temporary lockout
- Generic failure messages
- Audit-safe failure records

Do not reveal whether a failed code was:

- Incorrect
- Expired
- Revoked
- Previously valid
- Unknown

---

# Audience Code Exchange

A presentation code is a discovery code used only to establish an Audience Session.

It must not be used as a bearer credential on subsequent API calls.

Required flow:

1. Presenter creates an Audience Session for one ScenarioRun.
2. API generates a high-entropy presentation code.
3. Audience member enters the code into the application.
4. Browser sends the code in the body of a rate-limited POST request.
5. API validates the code.
6. API exchanges the code for a short-lived, read-only Audience Session.
7. Subsequent requests use the Audience Session.
8. Presentation code is discarded by the browser.

Presentation codes must:

- Be randomly generated
- Have sufficient entropy to resist casual guessing
- Be scoped to one ScenarioRun
- Expire with the ScenarioRun
- Be revocable
- Be rate-limited during exchange
- Never grant Presenter access
- Never grant mutation access

Presentation codes must not appear in:

- URL paths
- Query strings
- Browser history
- Referrer headers
- Logs
- Telemetry
- SSE endpoint addresses
- Error messages

---

# Scenario Ownership

Every ScenarioRun must include:

- `scenarioRunId`
- `scenarioDefinitionId`
- `scenarioVersion`
- `presenterSessionId`
- `presentationCodeReference`
- `revision`
- `currentScene`
- `state`
- `mode`
- `seed`
- `dataVersion`
- `createdAt`
- `updatedAt`
- `completedAt`
- `expiresAt`

One Presenter Session must not mutate a ScenarioRun owned by another Presenter Session.

Demo Administrator access may override ownership only through an explicitly authorized administrative operation.

Audience Sessions must be scoped to exactly one ScenarioRun.

---

# Optimistic Concurrency

Every mutable ScenarioRun must contain a numeric `revision`.

Every scenario mutation must include:

- `Idempotency-Key` header
- `expectedRevision`
- Authenticated Presenter Session or authorized Secure Mode context

For a valid mutation:

1. Compare `expectedRevision` with current revision.
2. Reject stale requests.
3. Apply the state transition.
4. Increment the revision.
5. Persist the new state.
6. Persist the transition event.
7. Create an audit event.
8. Return the new revision.

Stale requests must return:

`409 Conflict`

The response must include a safe representation of:

- Current revision
- Current scene
- Current state
- Correlation identifier

Do not automatically overwrite newer state.

---

# Idempotency

All mutation endpoints must require:

`Idempotency-Key`

Requirements:

- Scope idempotency to authenticated session and route.
- Persist the command fingerprint.
- Persist the original response.
- Return the original response when the same key and equivalent request are repeated.
- Reject reuse of a key with a different request payload.
- Retain idempotency records for the configured retention period.
- Do not duplicate alerts.
- Do not duplicate incidents.
- Do not duplicate state transitions.
- Do not duplicate AI outputs.
- Do not duplicate audit events.
- Do not duplicate post-incident reviews.

---

# Pagination, Filtering, and Sorting

List endpoints must support bounded pagination.

Use:

- `pageSize`
- `continuationToken`

Do not expose raw Cosmos DB continuation tokens without protection.

Default page size:

`50`

Maximum page size:

`200`

Allow filtering only on documented, validated fields.

Allow sorting only on documented fields.

Reject unsupported filters and sort fields.

Large signal and telemetry lists must use server-side pagination.

---

# Minimum API Surface

## Process Health

### GET /health

Purpose:

Return process liveness only.

Response may include:

- Status
- Timestamp
- Application version

It must not test all downstream dependencies.

It must not expose:

- Secrets
- Tokens
- Internal exception details
- Azure resource identifiers

---

### GET /ready

Purpose:

Determine whether the API can serve core application requests.

Check:

- Repository availability
- Required configuration
- Scenario engine availability
- Deterministic AI availability

Return a safe summary only.

Detailed readiness information belongs to the protected Demo Readiness endpoint.

---

## Version

### GET /api/v1/version

Access:

Public

Return:

- Application version
- API version
- Schema version
- Data version
- Primary scenario version
- Demo-script version
- Deployment mode

Do not return:

- Commit secrets
- Repository credentials
- Azure resource identifiers
- Tenant information

---

## Demo Readiness

### GET /api/v1/demo-readiness

Access:

Presenter Session or authorized Secure Mode user

Return readiness checks for:

- API
- Repository
- Baseline data
- Scenario definitions
- Primary scenario manifest
- Deterministic AI
- Optional Azure OpenAI
- Presenter Mode
- Audience View
- Scenario state transitions
- OpenTelemetry
- Application Insights
- Seed-job status where available
- Cleanup-job status where available

Status values:

- Ready
- Warning
- Blocked
- Not configured
- Not verifiable

Azure OpenAI unavailability must be a warning when DeterministicDemoProvider is healthy.

Secure Mode not configured must be informational or Not configured in Demo Mode.

---

### POST /api/v1/demo-readiness/recheck

Access:

Presenter Session or authorized Secure Mode user

Requirements:

- Rate limited
- Audited
- Must not expose management tokens
- Must not return secrets
- Must not perform infrastructure mutations

---

## Demo Presenter Sessions

### POST /api/v1/demo-sessions/exchange-presenter-code

Access:

Public, rate limited

Request:

- Presenter access code

Response:

- Safe Presenter Session summary
- Authentication expiration
- CSRF token or equivalent if required by selected session design

Do not log the request body.

---

### GET /api/v1/demo-sessions/current

Access:

Presenter Session

Return:

- Session status
- Expiration
- Deployment mode
- Safe role information

---

### POST /api/v1/demo-sessions/logout

Access:

Presenter Session

Action:

- Revoke current session
- Clear session cookie
- Create audit event

---

## Baseline Operational Data

### GET /api/v1/overview

Return:

- Service-health summary
- Active synthetic incidents
- Mean time to detect
- Mean time to understand
-
