import { z } from "zod";

/**
 * Response contract for `GET /health`.
 *
 * Process liveness only — must not test downstream dependencies.
 */
export const HealthStatusSchema = z.enum(["ok"]);

export const HealthResponseSchema = z.object({
  status: HealthStatusSchema,
  timestamp: z.string().datetime(),
  applicationVersion: z.string(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

/**
 * Safe summary readiness statuses, shared by `GET /ready` and the more detailed
 * Demo Readiness endpoint.
 */
export const ReadinessStatusSchema = z.enum([
  "ready",
  "warning",
  "blocked",
  "not-configured",
  "not-verifiable",
]);

export type ReadinessStatus = z.infer<typeof ReadinessStatusSchema>;

export const ReadyResponseSchema = z.object({
  status: ReadinessStatusSchema,
  timestamp: z.string().datetime(),
});

export type ReadyResponse = z.infer<typeof ReadyResponseSchema>;
