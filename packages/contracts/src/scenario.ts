import { z } from "zod";

/**
 * A single chapter/scene in a scenario's deterministic presentation sequence.
 *
 * See prompt/02-Application.md, "Presentation Chapters".
 */
export const ScenarioSceneSchema = z.object({
  id: z.string().min(1),
  order: z.number().int().nonnegative(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export type ScenarioScene = z.infer<typeof ScenarioSceneSchema>;

/**
 * The exact, versioned outcome counts a scenario run must always produce.
 *
 * See prompt/01-Architecture.md, "Primary Scenario". These values are part of the
 * versioned scenario definition and must not change without a version increment.
 */
export const ScenarioExpectedOutcomesSchema = z.object({
  signalCount: z.number().int().nonnegative(),
  actionableIncidentCount: z.number().int().nonnegative(),
  delayedImagingTransactionCount: z.number().int().nonnegative(),
  delayedImagingReportCount: z.number().int().nonnegative(),
  failedImageRetrievalJourneyCount: z.number().int().nonnegative(),
  potentiallyAffectedFacilityCount: z.number().int().nonnegative(),
});

export type ScenarioExpectedOutcomes = z.infer<
  typeof ScenarioExpectedOutcomesSchema
>;

/**
 * A versioned, deterministic scenario definition.
 *
 * See prompt/01-Architecture.md, "Scenario Architecture": scenario execution must use
 * deterministic state transitions and versioned scenario manifests.
 */
export const ScenarioManifestSchema = z.object({
  scenarioDefinitionId: z.string().min(1),
  name: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "must be a semantic version"),
  initiatingCondition: z.string().min(1),
  isPrimary: z.boolean(),
  facilities: z.array(z.string().min(1)).min(1),
  healthcareCapabilities: z.array(z.string().min(1)).min(1),
  expectedOutcomes: ScenarioExpectedOutcomesSchema,
  scenes: z.array(ScenarioSceneSchema).min(1),
});

export type ScenarioManifest = z.infer<typeof ScenarioManifestSchema>;

/**
 * Possible states of a ScenarioRun.
 *
 * See prompt/01-Architecture.md, "Presenter Mode" capabilities (Start, Advance, Pause,
 * Resume, Reset, Restore, Autoplay).
 */
export const ScenarioRunStateSchema = z.enum([
  "not-started",
  "running",
  "paused",
  "completed",
  "reset",
]);

export type ScenarioRunState = z.infer<typeof ScenarioRunStateSchema>;

export const ScenarioRunModeSchema = z.enum(["presenter", "rehearsal"]);

export type ScenarioRunMode = z.infer<typeof ScenarioRunModeSchema>;

/**
 * A live or rehearsal execution of a ScenarioManifest.
 *
 * See prompt/03-API.md, "Scenario Ownership".
 */
export const ScenarioRunSchema = z.object({
  scenarioRunId: z.string().min(1),
  scenarioDefinitionId: z.string().min(1),
  scenarioVersion: z.string(),
  presenterSessionId: z.string().min(1),
  presentationCodeReference: z.string().nullable(),
  revision: z.number().int().nonnegative(),
  currentScene: z.string().min(1),
  state: ScenarioRunStateSchema,
  mode: ScenarioRunModeSchema,
  seed: z.string().min(1),
  dataVersion: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
  expiresAt: z.string().datetime(),
});

export type ScenarioRun = z.infer<typeof ScenarioRunSchema>;
