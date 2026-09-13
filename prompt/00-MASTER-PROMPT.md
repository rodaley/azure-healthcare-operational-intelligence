# Azure Healthcare Operational Intelligence Accelerator

## PROMPT VERSION

Version: v1.0

Status: FROZEN

Further changes require:

- Documented issue
- Architecture review
- Version increment

---

# Mission

Build a complete, deployable healthcare operational intelligence accelerator that demonstrates how healthcare organizations can unify operational visibility across Azure services, healthcare applications, integration platforms, infrastructure dependencies, synthetic monitoring, and operational workflows.

The solution must:

- Use only synthetic healthcare operational data
- Demonstrate explainable incident correlation
- Connect technical events to healthcare operational capabilities
- Support AI\-assisted investigation grounded in evidence
- Require human validation for healthcare workflow impact
- Require human approval for simulated remediation
- Support a repeatable executive demonstration experience
- Be deployable with Azure Developer CLI

The solution must not:

- Diagnose patients
- Recommend treatments
- Process real patient data
- Perform autonomous remediation
- Claim healthcare compliance certification
- Present correlation as proven causation

---

# Product Identity

Repository Name:

azure\-healthcare\-operational\-intelligence

Product Name:

Azure Healthcare Operational Intelligence Accelerator

Primary Scenario:

Critical Imaging Access Degradation v1.0.0

---

# Delivery Priorities

## P0 \- Local Demonstration

Required before all other work.

Must include:

- Local web application
- Local API
- Synthetic data generator
- Primary healthcare scenario
- Presenter Mode
- Demo Readiness page
- Deterministic AI
- Correlation engine
- Healthcare impact engine
- Core tests
- Demo runbook

Target Release:

v0.1.0

---

## P1 \- Azure Deployable Demonstration

Must include:

- Bicep
- Azure Developer CLI
- Cosmos DB
- Key Vault
- Managed Identity
- Application Insights
- Seed job
- Cleanup job
- Demo Mode security
- Azure validation

Target Release:

v0.2.0

---

## P2 \- Reusable Accelerator

Must include:

- Audience View
- Server\-Sent Events
- Secondary scenarios
- Tool Rationalization
- Cost Optimization
- GitHub deployment workflows
- Executive talking points

Target Release:

v0.3.0

---

## P3 \- Production Extensions

Optional future enhancements.

Examples:

- Private networking
- API gateway
- Distributed event architecture
- Enterprise integrations
- Advanced governance
- External ITSM integration

Not required for v1.0.

---

# Authoritative Specifications

The following files define the product contract.

Read all files before implementation.

1. 01\-Architecture.md
2. 02\-Application.md
3. 03\-API.md
4. 04\-Security.md
5. 05\-Infrastructure.md
6. 06\-Demo\-Experience.md
7. 07\-Testing.md
8. 08\-Acceptance\-Criteria.md

These specifications are authoritative.

Do not override them with assumptions.

---

# Required Working Principle

Implement P0 completely before beginning P1.

Implement P1 before beginning P2.

Implement P2 before beginning P3.

Do not leave a P0 requirement incomplete in order to implement a P2 or P3 feature.

---

# Completion Rules

Never claim:

- A deployment succeeded unless it was executed and validated.
- A test passed unless it was executed and validated.
- A feature is complete unless acceptance criteria have been met.

If implementation limits are reached:

- Leave the repository in a working state.
- Create GitHub issues for incomplete items.
- Update implementation status.
- Do not create misleading placeholders.

---

# Expected Release Milestones

## v0.1.0

Local Working Demo

Includes:

- Primary scenario
- Presenter Mode
- Deterministic AI
- Demo Readiness
- 175\-signal incident story

---

## v0.2.0

Azure Deployable Demo

Includes:

- Azure deployment
- Cosmos DB
- Key Vault
- Presenter\-code security
- Seed job

---

## v0.3.0

Reusable Executive Briefing Accelerator

Includes:

- Audience View
- Secondary scenarios
- Tool Rationalization
- Cost Optimization

---

## v1.0.0

Full Acceptance Criteria Met

The accelerator may be considered complete only when all requirements in:

08\-Acceptance\-Criteria.md

have been successfully validated.

---

# Begin Implementation

Read all specification documents.

Create GitHub issues for implementation work.

Start with P0.

Do not begin P1 until P0 acceptance criteria are satisfied.

