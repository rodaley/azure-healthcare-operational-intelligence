# Scenario Data

This folder contains versioned, deterministic scenario definitions used by the
accelerator, as required by `prompt/01-Architecture.md` ("Scenario Architecture").

## Structure

```
data/scenarios/<scenario-definition-id>/<version>/manifest.json
```

Each `manifest.json` file conforms to the `ScenarioManifestSchema` defined in
`packages/contracts`. Manifests are immutable once published; a change to scenario
behavior requires a new version directory rather than editing an existing one.

## Primary scenario

`critical-imaging-access-degradation/1.0.0/manifest.json` defines the primary scenario,
"Critical Imaging Access Degradation", which must always produce:

- 175 related signals
- 1 actionable incident
- 27 delayed imaging transactions
- 8 delayed imaging reports
- 2 failed image retrieval journeys
- 3 potentially affected facilities

These values are frozen for this version and must not change without incrementing the
scenario version.
