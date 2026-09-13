import { Router } from "express";
import { ReadyResponseSchema, type ReadinessStatus, type ReadyResponse } from "@ahoi/contracts";
import type { DataStores } from "../repository/dataStores.js";
import type { AiProvider } from "../ai/DeterministicDemoProvider.js";

export interface ReadyDependencies {
  dataStores: DataStores;
  aiProvider: AiProvider;
}

/**
 * Determines whether the API can serve core application requests.
 *
 * Checks repository availability, the scenario engine's baseline manifest data, and
 * deterministic AI availability. Returns a safe summary only — detailed readiness
 * information belongs to the protected Demo Readiness endpoint. See
 * prompt/03-API.md, "GET /ready".
 */
export function createReadyRouter(deps: ReadyDependencies): Router {
  const router = Router();

  router.get("/ready", async (_req, res) => {
    let status: ReadinessStatus = "ready";
    try {
      await deps.dataStores.scenarioDefinitions.list();
    } catch {
      status = "blocked";
    }
    if (!deps.aiProvider) {
      status = "blocked";
    }

    const body: ReadyResponse = {
      status,
      timestamp: new Date().toISOString(),
    };
    res.status(status === "ready" ? 200 : 503).json(ReadyResponseSchema.parse(body));
  });

  return router;
}
