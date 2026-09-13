import { z } from "zod";

/**
 * Response contract for `GET /api/v1/version`.
 *
 * See prompt/03-API.md, "Version".
 */
export const VersionResponseSchema = z.object({
  applicationVersion: z.string(),
  apiVersion: z.string(),
  schemaVersion: z.string(),
  scenarioDataVersion: z.string(),
  primaryScenarioVersion: z.string(),
  demoScriptVersion: z.string(),
  deploymentMode: z.enum(["local", "demo", "secure"]),
});

export type VersionResponse = z.infer<typeof VersionResponseSchema>;
