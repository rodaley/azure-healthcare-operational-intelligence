import { z } from "zod";

/**
 * The fixed set of questions the Executive Copilot must be able to answer.
 *
 * See prompt/02-Application.md, "Executive Copilot".
 */
export const ExecutiveCopilotQuestionSchema = z.enum([
  "what-happened",
  "what-was-detected-first",
  "what-is-the-probable-cause",
  "what-evidence-supports-this-conclusion",
  "which-systems-may-be-affected",
  "which-healthcare-capabilities-may-be-affected",
  "what-remains-uncertain",
  "what-should-the-operator-do-next",
]);

export type ExecutiveCopilotQuestion = z.infer<
  typeof ExecutiveCopilotQuestionSchema
>;

export const AiInvestigationRequestSchema = z.object({
  scenarioRunId: z.string().min(1),
  question: ExecutiveCopilotQuestionSchema,
});

export type AiInvestigationRequest = z.infer<typeof AiInvestigationRequestSchema>;

/**
 * Every Executive Copilot answer must include an assessment, supporting evidence,
 * confidence, remaining uncertainty, and human-validation requirements.
 *
 * See prompt/02-Application.md, "Executive Copilot".
 */
export const AiInvestigationResponseSchema = z.object({
  provider: z.enum(["deterministic-demo", "azure-openai"]),
  question: ExecutiveCopilotQuestionSchema,
  assessment: z.string().min(1),
  evidence: z.array(z.string().min(1)),
  confidence: z.enum(["low", "medium", "high"]),
  uncertainty: z.string().min(1),
  humanValidationRequired: z.literal(true),
  generatedAt: z.string().datetime(),
});

export type AiInvestigationResponse = z.infer<
  typeof AiInvestigationResponseSchema
>;
