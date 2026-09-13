import type {
  AiInvestigationRequest,
  AiInvestigationResponse,
  ExecutiveCopilotQuestion,
} from "@ahoi/contracts";

/**
 * Common interface implemented by all AI providers.
 *
 * `DeterministicDemoProvider` is required and must support all demonstrations.
 * An optional `AzureOpenAIProvider` may be added later (see
 * docs/adr/0004-deterministic-demo-ai-provider.md) but the solution must function if
 * it is unavailable.
 */
export interface AiProvider {
  readonly name: "deterministic-demo" | "azure-openai";
  answer(request: AiInvestigationRequest): Promise<AiInvestigationResponse>;
}

const ANSWERS: Record<
  ExecutiveCopilotQuestion,
  { assessment: string; evidence: string[]; confidence: "low" | "medium" | "high"; uncertainty: string }
> = {
  "what-happened": {
    assessment:
      "The synthetic imaging database experienced latency and connection exhaustion, " +
      "producing 175 correlated signals that were grouped into a single actionable incident.",
    evidence: [
      "175 related signals detected across monitoring sources",
      "Connection pool exhaustion alerts from the synthetic imaging database",
    ],
    confidence: "high",
    uncertainty: "The precise root cause within the database tier has not been confirmed by a human operator.",
  },
  "what-was-detected-first": {
    assessment:
      "The first detected signal was elevated latency on the synthetic imaging database connection pool.",
    evidence: ["Earliest timestamped alert: imaging database connection pool latency"],
    confidence: "high",
    uncertainty: "Clock skew across monitoring sources may shift ordering by a few seconds.",
  },
  "what-is-the-probable-cause": {
    assessment:
      "The probable technical cause is connection exhaustion on the synthetic imaging database, " +
      "consistent with cascading failures observed in the Imaging Archive and Imaging Database services.",
    evidence: [
      "Dependency chain: Imaging Database -> Imaging Archive -> Clinical Imaging Viewer",
      "Correlated connection-pool and latency alerts",
    ],
    confidence: "medium",
    uncertainty: "Correlation represents evidence-based analysis and does not prove causation.",
  },
  "what-evidence-supports-this-conclusion": {
    assessment:
      "175 related signals, synthetic monitoring failures, and dependency analysis all point to the " +
      "same imaging database dependency.",
    evidence: [
      "175 correlated signals",
      "2 failed synthetic image retrieval journeys",
      "27 delayed imaging transactions",
    ],
    confidence: "medium",
    uncertainty: "Some evidence types (historical patterns) are illustrative and not exhaustive.",
  },
  "which-systems-may-be-affected": {
    assessment:
      "The Clinical Imaging Viewer, Imaging Archive, and Diagnostic Report Distribution Service may be affected.",
    evidence: ["Dependency graph traversal from Imaging Database"],
    confidence: "medium",
    uncertainty: "Downstream application-level impact has not been independently confirmed.",
  },
  "which-healthcare-capabilities-may-be-affected": {
    assessment:
      "Diagnostic Image Access, Radiology Interpretation Workflow, and Imaging Report Distribution " +
      "may be affected across 3 potentially affected facilities.",
    evidence: [
      "Capability mapping from affected Application Components",
      "3 potentially affected facilities identified",
    ],
    confidence: "medium",
    uncertainty: "This is a potential healthcare workflow impact and requires human validation before it is confirmed.",
  },
  "what-remains-uncertain": {
    assessment:
      "It remains uncertain whether the healthcare workflow impact has materially affected patient care, " +
      "and whether remediation will fully resolve the underlying condition.",
    evidence: ["No human validation has been recorded for this scenario run yet."],
    confidence: "low",
    uncertainty: "Human validation and recovery validation are required before this can be resolved.",
  },
  "what-should-the-operator-do-next": {
    assessment:
      "The operator should validate the potential healthcare workflow impact, review recommended " +
      "operational actions, and approve simulated remediation once validated.",
    evidence: ["Recommended operational actions derived from the scenario runbook"],
    confidence: "medium",
    uncertainty: "Recommended actions are human-reviewed and are not executed automatically.",
  },
};

/**
 * A deterministic AI provider that answers Executive Copilot questions using
 * fixed, evidence-grounded responses derived from the scenario's known outcome.
 *
 * Required by prompt/01-Architecture.md ("AI Architecture"). Supports all
 * demonstrations without any dependency on Azure OpenAI. See
 * docs/adr/0004-deterministic-demo-ai-provider.md.
 */
export class DeterministicDemoProvider implements AiProvider {
  readonly name = "deterministic-demo" as const;

  async answer(request: AiInvestigationRequest): Promise<AiInvestigationResponse> {
    const answer = ANSWERS[request.question];
    return {
      provider: this.name,
      question: request.question,
      assessment: answer.assessment,
      evidence: answer.evidence,
      confidence: answer.confidence,
      uncertainty: answer.uncertainty,
      humanValidationRequired: true,
      generatedAt: new Date().toISOString(),
    };
  }
}
