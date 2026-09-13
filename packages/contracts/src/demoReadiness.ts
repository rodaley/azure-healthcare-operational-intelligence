import { z } from "zod";
import { ReadinessStatusSchema } from "./health.js";

/**
 * A single readiness check result, used by `GET /api/v1/demo-readiness`.
 *
 * See prompt/02-Application.md, "Demo Readiness" and prompt/03-API.md, "Demo
 * Readiness".
 */
export const ReadinessCheckSchema = z.object({
  id: z.string().min(1),
  category: z.enum(["application", "data", "ai", "presentation", "infrastructure"]),
  label: z.string().min(1),
  status: ReadinessStatusSchema,
  detail: z.string().optional(),
});

export type ReadinessCheck = z.infer<typeof ReadinessCheckSchema>;

export const DemoReadinessResponseSchema = z.object({
  overallStatus: ReadinessStatusSchema,
  checks: z.array(ReadinessCheckSchema),
  generatedAt: z.string().datetime(),
});

export type DemoReadinessResponse = z.infer<typeof DemoReadinessResponseSchema>;
