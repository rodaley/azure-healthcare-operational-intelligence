import { FileRepository } from "./FileRepository.js";
import type { Repository } from "./Repository.js";

/**
 * Logical data categories that must be persisted separately.
 *
 * See prompt/01-Architecture.md ("Data Architecture") and prompt/04-Security.md
 * ("Data Separation"): rehearsal data must never affect executive metrics, and
 * cleanup must not remove baseline data or scenario definitions.
 */
export interface DataStores {
  baseline: Repository<unknown>;
  scenarioDefinitions: Repository<unknown>;
  scenarioRuns: Repository<unknown>;
  rehearsalRuns: Repository<unknown>;
  sessions: Repository<unknown>;
  idempotencyRecords: Repository<unknown>;
  auditEvents: Repository<unknown>;
  reviews: Repository<unknown>;
}

export function createFileDataStores(baseDirectory: string): DataStores {
  return {
    baseline: new FileRepository(baseDirectory, "baseline"),
    scenarioDefinitions: new FileRepository(baseDirectory, "scenario-definitions"),
    scenarioRuns: new FileRepository(baseDirectory, "scenario-runs"),
    rehearsalRuns: new FileRepository(baseDirectory, "rehearsal-runs"),
    sessions: new FileRepository(baseDirectory, "sessions"),
    idempotencyRecords: new FileRepository(baseDirectory, "idempotency-records"),
    auditEvents: new FileRepository(baseDirectory, "audit-events"),
    reviews: new FileRepository(baseDirectory, "reviews"),
  };
}
