import { describe, expect, it } from "vitest";
import {
  ScenarioManifestSchema,
  ScenarioRunSchema,
  HealthResponseSchema,
  VersionResponseSchema,
  AiInvestigationResponseSchema,
} from "../src/index.js";

const validManifest = {
  scenarioDefinitionId: "critical-imaging-access-degradation",
  name: "Critical Imaging Access Degradation",
  version: "1.0.0",
  initiatingCondition:
    "Latency and connection exhaustion affecting the synthetic imaging database.",
  isPrimary: true,
  facilities: [
    "Contoso Regional Medical Center",
    "Contoso North Hospital",
    "Contoso West Emergency Center",
  ],
  healthcareCapabilities: ["Diagnostic Image Access"],
  expectedOutcomes: {
    signalCount: 175,
    actionableIncidentCount: 1,
    delayedImagingTransactionCount: 27,
    delayedImagingReportCount: 8,
    failedImageRetrievalJourneyCount: 2,
    potentiallyAffectedFacilityCount: 3,
  },
  scenes: [
    {
      id: "healthcare-monitoring-challenge",
      order: 0,
      title: "Healthcare Monitoring Challenge",
      description: "Introduce the fragmented monitoring problem.",
    },
  ],
};

describe("ScenarioManifestSchema", () => {
  it("accepts a valid primary scenario manifest", () => {
    expect(() => ScenarioManifestSchema.parse(validManifest)).not.toThrow();
  });

  it("rejects a manifest with a non-semver version", () => {
    expect(() =>
      ScenarioManifestSchema.parse({ ...validManifest, version: "v1" }),
    ).toThrow();
  });

  it("rejects a manifest with no scenes", () => {
    expect(() =>
      ScenarioManifestSchema.parse({ ...validManifest, scenes: [] }),
    ).toThrow();
  });
});

describe("ScenarioRunSchema", () => {
  it("accepts a valid scenario run", () => {
    const run = {
      scenarioRunId: "run-1",
      scenarioDefinitionId: "critical-imaging-access-degradation",
      scenarioVersion: "1.0.0",
      presenterSessionId: "session-1",
      presentationCodeReference: null,
      revision: 0,
      currentScene: "healthcare-monitoring-challenge",
      state: "not-started",
      mode: "presenter",
      seed: "seed-1",
      dataVersion: "1.0.0",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    };
    expect(() => ScenarioRunSchema.parse(run)).not.toThrow();
  });

  it("rejects an invalid state", () => {
    const run = {
      scenarioRunId: "run-1",
      scenarioDefinitionId: "critical-imaging-access-degradation",
      scenarioVersion: "1.0.0",
      presenterSessionId: "session-1",
      presentationCodeReference: null,
      revision: 0,
      currentScene: "healthcare-monitoring-challenge",
      state: "unknown-state",
      mode: "presenter",
      seed: "seed-1",
      dataVersion: "1.0.0",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    };
    expect(() => ScenarioRunSchema.parse(run)).toThrow();
  });
});

describe("HealthResponseSchema", () => {
  it("accepts a valid health response", () => {
    expect(() =>
      HealthResponseSchema.parse({
        status: "ok",
        timestamp: new Date().toISOString(),
        applicationVersion: "0.1.0",
      }),
    ).not.toThrow();
  });
});

describe("VersionResponseSchema", () => {
  it("accepts a valid version response", () => {
    expect(() =>
      VersionResponseSchema.parse({
        applicationVersion: "0.1.0",
        apiVersion: "v1",
        schemaVersion: "1.0.0",
        scenarioDataVersion: "1.0.0",
        primaryScenarioVersion: "1.0.0",
        demoScriptVersion: "1.0.0",
        deploymentMode: "local",
      }),
    ).not.toThrow();
  });
});

describe("AiInvestigationResponseSchema", () => {
  it("requires humanValidationRequired to be true", () => {
    expect(() =>
      AiInvestigationResponseSchema.parse({
        provider: "deterministic-demo",
        question: "what-happened",
        assessment: "Assessment text",
        evidence: ["Evidence 1"],
        confidence: "medium",
        uncertainty: "Uncertainty text",
        humanValidationRequired: false,
        generatedAt: new Date().toISOString(),
      }),
    ).toThrow();
  });
});
