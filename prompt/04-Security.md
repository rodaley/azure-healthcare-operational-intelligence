# Azure Healthcare Operational Intelligence Accelerator

# Security Specification

Version: v1.0

Status: FROZEN

---

# Purpose

This document defines the security, privacy, identity, access control, session management, secret management, data\-protection, auditability, retention, and Responsible AI protection requirements for the Azure Healthcare Operational Intelligence Accelerator.

This document is authoritative for:

- Authentication
- Authorization
- Secret management
- Session management
- Demo Mode security
- Secure Mode security
- Browser privacy
- Telemetry protection
- Data separation
- Lifecycle management
- Auditability
- Healthcare safety boundaries

Application behavior is defined in:

02\-Application.md

API behavior is defined in:

03\-API.md

Infrastructure requirements are defined in:

05\-Infrastructure.md

---

# Security Principles

The solution must implement:

- Least privilege
- Deny by default
- Managed identity first
- Explicit authorization
- Human approval
- Auditability
- Deterministic behavior
- Secure defaults
- Token minimization
- Secret minimization
- Privacy by design

The solution must not:

- Store patient data
- Process protected health information
- Use shared Azure access keys
- Store production secrets in source control
- Permit anonymous mutation operations
- Perform autonomous remediation
- Claim healthcare compliance certification

---

# Threat Model

The solution must assume:

- Anonymous internet users
- Curious audience participants
- Accidental presenter mistakes
- Lost audience codes
- Compromised browser sessions
- Replay attempts
- API misuse
- Misconfigured Azure permissions
- Malicious automation attempts

The solution is not intended to defend against nation\-state level adversaries.

The objective is to demonstrate secure design patterns and governance boundaries.

---

# Identity Model

The solution supports:

## Demo Mode

Presenter authentication through presenter\-code exchange.

Provides:

- Presenter Session
- Audience Session

Does not require:

- Microsoft Entra ID
- Application registration
- Admin consent

---

## Secure Mode

Supports Microsoft Entra ID.

Roles:

- Viewer
- Operator
- Incident Commander
- Demo Administrator

Authentication must use:

- Authorization Code Flow
- PKCE
- Access\-token validation

Do not use:

- Implicit flow
- Long\-lived browser tokens
- Client secrets

---

# Secret Management

Secrets must be managed through Azure Key Vault.

Use Key Vault only for secrets.

Do not place ordinary configuration in Key Vault.

Secrets may include:

- Presenter\-code material
- Optional Azure secrets required by deployment

Secrets must never appear in:

- Source code
- Repository files
- Browser bundles
- Container images
- Bicep outputs
- GitHub logs
- Application logs
- Telemetry
- Test snapshots
- Documentation examples

---

# Presenter Code Security

Demo Mode requires a deployment\-generated presenter code.

Requirements:

- Generated using a cryptographically secure random\-number generator
- Minimum 128 bits of entropy
- Stored in Key Vault
- Rotatable
- Revocable
- Auditable

The presenter code must never:

- Appear in URLs
- Appear in query strings
- Appear in telemetry
- Appear in screenshots
- Appear in access logs

Do not store the plaintext presenter code after validation where avoidable.

---

# Presenter Code Rotation

Rotation must:

- Generate a new secure code
- Replace the existing secret
- Revoke active Presenter Sessions by default
- Generate audit events

The new secret must not:

- Be printed
- Be written to disk
- Be committed
- Be stored in GitHub variables

---

# Local Development Security

Local development must not require Azure Key Vault.

When running locally:

- Generate a temporary presenter code at startup
- Display only in the local console
- Remove when the process exits
- Bind to localhost by default

Allow a fixed presenter code only when:

NODE\_ENV=test

The fixed test code must never be valid in development or Azure environments.

---

# Authorization Model

Authorization must always be enforced by the API.

UI visibility is not authorization.

Hidden controls are not authorization.

Every mutation endpoint must verify:

- Identity
- Session validity
- Ownership
- Role requirements
- Revision requirements
- Idempotency requirements

---

# Demo Mode Authorization

Anonymous users may:

- View the landing experience
- Exchange presentation codes
- Access Audience View after successful exchange

Anonymous users may not:

- Start scenarios
- Advance scenarios
- Pause scenarios
- Reset scenarios
- Restore checkpoints
- Approve remediation
- Validate impacts
- Generate reviews
- Change cost assumptions
- Change readiness gates

---

# Secure Mode Authorization

## Viewer

May:

- Read dashboards
- Read incidents
- Read readiness information
- Read synthetic reports

May not:

- Perform mutations

---

## Operator

May:

- Create ScenarioRuns
- Control owned scenarios
- Request investigations

May not:

- Approve remediation

---

## Incident Commander

May:

- Perform operator actions
- Validate impact
- Validate scope
- Approve remediation
- Approve reviews
- Validate recovery

---

## Demo Administrator

May:

- Perform all demonstration operations
- Reset demonstration state
- Revoke sessions
- Trigger cleanup
- Change readiness demonstrations

---

# Session Security

Presenter Sessions and Audience Sessions must:

- Use random session identifiers
- Have configurable expiration
- Have inactivity expiration
- Support revocation
- Support logout
- Support rotation after successful authentication

When cookies are used:

- HTTPOnly
- Secure in Azure
- SameSite protection
- CSRF protection

Do not store session identifiers in:

- Local storage
- Session storage
- URL parameters

---

# Audience Session Security

Audience membership requires:

- Presentation code exchange
- Session issuance

Presentation codes must:

- Be random
- Be revocable
- Be scoped to one ScenarioRun
- Be time limited
- Be rate limited

Presentation codes must never appear in:

- URLs
- Query strings
- Browser history
- Telemetry
- SSE routes
- Logs

Audience users must never gain mutation permissions.

---

# API Protection

Implement:

- HTTPS only
- Restricted CORS
- CSP
- Secure HTTP headers
- Input validation
- Output validation
- Size limits
- Rate limits
- Correlation identifiers
- Structured logging

Never use:

\*

for Azure production CORS configuration.

---

# CSRF Protection

Authenticated mutations must be protected against CSRF.

Accepted approaches:

- Synchronizer token pattern
- Double\-submit cookie pattern
- Framework\-supported equivalent

Protection is required whenever cookie\-authenticated sessions are used.

---

# Logging Protection

Never log:

- Presenter codes
- Presentation codes
- Access tokens
- Refresh tokens
- Session identifiers
- Cookies
- Authorization headers
- AI prompts
- Patient information
- Personal information

Always log:

- Correlation identifiers
- Event identifiers
- Scenario identifiers
- Audit events

Apply redaction before log emission.

---

# Browser Privacy

The browser must never collect:

- Patient information
- Keystrokes
- Screen recordings
- Session replay recordings
- DOM captures
- AI prompt content
- Presentation codes
- Presenter codes

Browser telemetry must exclude:

- Query strings
- State fragments
- Session identifiers

Apply a sanitization processor before export.

---

# Data Separation

Persist data in separate logical stores:

- Baseline Data
- Scenario Definitions
- Live Scenario Runs
- Rehearsal Runs
- Sessions
- Idempotency Records
- Audit Events
- Generated Reviews

Requirements:

- Rehearsal data must not affect executive metrics
- Scenario data must not alter baseline history
- Cleanup must not remove baseline data
- Cleanup must not remove scenario definitions

---

# Retention Rules

Default retention:

## Live Scenario Runs

7 days

## Rehearsal Runs

24 hours

## Audience Sessions

24 hours

## Presenter Sessions

Until expiration

## Idempotency Records

24 hours

Retention must be configurable.

These values are demonstration defaults, not compliance recommendations.

---

# Cleanup Security

Cleanup must:

- Use managed identity
- Use least privilege
- Support dry\-run mode
- Generate audit events

Cleanup must never remove:

- Baseline data
- Scenario definitions
- Required runbooks

Cleanup must be safe to retry.

---

# Responsible AI Boundaries

The AI system may:

- Summarize evidence
- Explain incidents
- Explain dependencies
- Recommend operational actions

The AI system may not:

- Diagnose patients
- Interpret medical images
- Recommend care
- Recommend treatment
- Prioritize patients
- Confirm clinical impact
- Perform remediation
- Send communications

Every healthcare\-impact conclusion must require human validation.

---

# Healthcare Safety Boundaries

The solution must operate exclusively on synthetic data.

Do not generate:

- Patient names
- Medical record numbers
- Diagnoses
- Clinical notes
- Medications
- Treatments
- Diagnostic images

Do not process:

- PHI
- PII intended to represent real people

Display healthcare safety disclaimers throughout the application.

---

# Audit Requirements

Generate audit events for:

- Presenter authentication
- Presenter logout
- Audience\-session creation
- Audience\-session revocation
- Scenario creation
- Scenario transition
- Scenario reset
- Scenario restore
- Impact validation
- Remediation approval
- Recovery validation
- Review approval
- Cleanup execution
- Presenter\-code rotation

Audit records must not contain:

- Secrets
- Codes
- Tokens
- Cookies
- Prompt text
- Patient data

---

# Security Testing Requirements

Create automated tests for:

- Anonymous mutation rejection
- Audience mutation rejection
- Authorization enforcement
- Session expiration
- Session revocation
- Presenter\-code rotation
- Presenter\-code rate limiting
- Presentation\-code rate limiting
- CSRF protection
- CORS configuration
- Secret redaction
- Log redaction
- Telemetry redaction
- Data separation
- Cleanup authorization
- Rehearsal isolation

---

# Compliance Positioning

The solution must never state:

- HIPAA compliant
- HIPAA certified
- Approved for PHI
- Production ready for regulated healthcare information

The solution must state:

Production use involving regulated healthcare data requires the deploying organization to perform its own legal, privacy, compliance, security, clinical\-safety, and architecture reviews.

---

# Security Success Definition

The security architecture is successful when:

1. Anonymous users cannot mutate application state.
2. Audience users remain read\-only.
3. Presenter access is protected.
4. Secrets never appear in logs or telemetry.
5. Healthcare\-impact validation requires humans.
6. Simulated remediation requires approval.
7. Session controls operate correctly.
8. Cleanup protects baseline data.
9. Audit events are generated.
10. Automated security tests pass.
11. The application remains fully functional without processing real healthcare data.

