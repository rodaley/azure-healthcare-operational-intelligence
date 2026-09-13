import { describe, expect, it } from "vitest";
import type { ExecutiveCopilotQuestion } from "@ahoi/contracts";
import { DeterministicDemoProvider } from "../src/ai/DeterministicDemoProvider.js";

const QUESTIONS: ExecutiveCopilotQuestion[] = [
  "what-happened",
  "what-was-detected-first",
  "what-is-the-probable-cause",
  "what-evidence-supports-this-conclusion",
  "which-systems-may-be-affected",
  "which-healthcare-capabilities-may-be-affected",
  "what-remains-uncertain",
  "what-should-the-operator-do-next",
];

describe("DeterministicDemoProvider", () => {
  it("answers every supported Executive Copilot question", async () => {
    const provider = new DeterministicDemoProvider();
    for (const question of QUESTIONS) {
      const response = await provider.answer({ scenarioRunId: "run-1", question });
      expect(response.question).toBe(question);
      expect(response.provider).toBe("deterministic-demo");
      expect(response.assessment.length).toBeGreaterThan(0);
      expect(response.evidence.length).toBeGreaterThan(0);
      expect(response.humanValidationRequired).toBe(true);
    }
  });

  it("is deterministic across repeated calls", async () => {
    const provider = new DeterministicDemoProvider();
    const first = await provider.answer({ scenarioRunId: "run-1", question: "what-happened" });
    const second = await provider.answer({ scenarioRunId: "run-1", question: "what-happened" });
    expect(first.assessment).toBe(second.assessment);
    expect(first.evidence).toEqual(second.evidence);
    expect(first.confidence).toBe(second.confidence);
  });
});
