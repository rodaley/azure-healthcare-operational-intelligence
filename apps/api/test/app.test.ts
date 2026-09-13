import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createFileDataStores } from "../src/repository/dataStores.js";
import { DeterministicDemoProvider } from "../src/ai/DeterministicDemoProvider.js";

let dataDirectory: string;

beforeEach(async () => {
  dataDirectory = await mkdtemp(join(tmpdir(), "ahoi-api-test-"));
});

afterEach(async () => {
  await rm(dataDirectory, { recursive: true, force: true });
});

function buildApp(dir: string) {
  const config = loadConfig({ ...process.env, DATA_DIRECTORY: dir });
  const dataStores = createFileDataStores(dir);
  const aiProvider = new DeterministicDemoProvider();
  return createApp({ config, dataStores, aiProvider });
}

describe("GET /health", () => {
  it("returns process liveness without touching dependencies", async () => {
    const app = buildApp(dataDirectory);
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(typeof response.body.applicationVersion).toBe("string");
  });
});

describe("GET /ready", () => {
  it("returns ready when the data directory is available", async () => {
    const app = buildApp(dataDirectory);
    const response = await request(app).get("/ready");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ready");
  });
});

describe("GET /api/v1/version", () => {
  it("returns version information without secrets", async () => {
    const app = buildApp(dataDirectory);
    const response = await request(app).get("/api/v1/version");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      apiVersion: "v1",
      deploymentMode: "local",
      primaryScenarioVersion: "1.0.0",
    });
    expect(JSON.stringify(response.body)).not.toMatch(/secret|token/i);
  });
});

describe("unknown routes", () => {
  it("returns 404 for unknown routes", async () => {
    const app = buildApp(dataDirectory);
    const response = await request(app).get("/does-not-exist");
    expect(response.status).toBe(404);
  });
});
