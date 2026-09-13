import { Router } from "express";
import { HealthResponseSchema, type HealthResponse } from "@ahoi/contracts";
import type { AppConfig } from "../config.js";

export function createHealthRouter(config: AppConfig): Router {
  const router = Router();

  // Process liveness only. Must not test downstream dependencies and must not
  // expose secrets, tokens, internal exception details, or Azure resource
  // identifiers. See prompt/03-API.md, "GET /health".
  router.get("/health", (_req, res) => {
    const body: HealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      applicationVersion: config.applicationVersion,
    };
    res.json(HealthResponseSchema.parse(body));
  });

  return router;
}
