import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface PackageJson {
  version: string;
}

function readOwnVersion(): string {
  const packageJsonPath = join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8")) as PackageJson;
  return packageJson.version;
}

export interface AppConfig {
  port: number;
  host: string;
  dataDirectory: string;
  applicationVersion: string;
  apiVersion: string;
  schemaVersion: string;
  primaryScenarioId: string;
  primaryScenarioVersion: string;
  demoScriptVersion: string;
  deploymentMode: "local" | "demo" | "secure";
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    port: Number(env.PORT ?? 3000),
    host: env.HOST ?? "localhost",
    dataDirectory: env.DATA_DIRECTORY ?? join(process.cwd(), "..", "..", "data"),
    applicationVersion: readOwnVersion(),
    apiVersion: "v1",
    schemaVersion: "1.0.0",
    primaryScenarioId: "critical-imaging-access-degradation",
    primaryScenarioVersion: "1.0.0",
    demoScriptVersion: "1.0.0",
    deploymentMode: (env.DEPLOYMENT_MODE as AppConfig["deploymentMode"]) ?? "local",
  };
}
