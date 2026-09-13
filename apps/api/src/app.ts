import express, { type Express } from "express";
import { pinoHttp } from "pino-http";
import { pino } from "pino";
import { createHealthRouter } from "./routes/health.js";
import { createReadyRouter } from "./routes/ready.js";
import { createVersionRouter } from "./routes/version.js";
import type { AppConfig } from "./config.js";
import type { DataStores } from "./repository/dataStores.js";
import type { AiProvider } from "./ai/DeterministicDemoProvider.js";

export interface AppDependencies {
  config: AppConfig;
  dataStores: DataStores;
  aiProvider: AiProvider;
}

const REDACT_PATHS = [
  "req.headers.cookie",
  "req.headers.authorization",
  "req.body.presenterCode",
  "req.body.presentationCode",
];

/**
 * Builds the Express application. Kept separate from `server.ts` so it can be
 * exercised directly by tests without binding to a network port.
 */
export function createApp(deps: AppDependencies): Express {
  const app = express();
  const logger = pino({ redact: REDACT_PATHS });

  app.disable("x-powered-by");
  app.use(express.json({ limit: "100kb" }));
  app.use(pinoHttp({ logger, redact: REDACT_PATHS }));

  app.use(createHealthRouter(deps.config));
  app.use(createReadyRouter({ dataStores: deps.dataStores, aiProvider: deps.aiProvider }));
  app.use(createVersionRouter(deps.config));

  app.use((_req, res) => {
    res.status(404).json({ error: "Not Found" });
  });

  return app;
}
