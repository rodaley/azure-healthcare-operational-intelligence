import { Router } from "express";
import { VersionResponseSchema, type VersionResponse } from "@ahoi/contracts";
import type { AppConfig } from "../config.js";

/**
 * `GET /api/v1/version` — public, safe application-version information.
 *
 * See prompt/03-API.md, "Version".
 */
export function createVersionRouter(config: AppConfig): Router {
  const router = Router();

  router.get("/api/v1/version", (_req, res) => {
    const body: VersionResponse = {
      applicationVersion: config.applicationVersion,
      apiVersion: config.apiVersion,
      schemaVersion: config.schemaVersion,
      scenarioDataVersion: config.primaryScenarioVersion,
      primaryScenarioVersion: config.primaryScenarioVersion,
      demoScriptVersion: config.demoScriptVersion,
      deploymentMode: config.deploymentMode,
    };
    res.json(VersionResponseSchema.parse(body));
  });

  return router;
}
