import { PlaceholderPage } from "../components/PlaceholderPage.js";
import { NAV_ITEMS } from "../navigation.js";

const DESCRIPTIONS: Record<string, string> = {
  "/executive-overview":
    "Single operational summary: service health, active incidents, facilities and " +
    "capabilities potentially impacted, MTTD/MTTU/MTTR, and readiness/cost summaries.",
  "/observability-map":
    "Connects technical resources to healthcare capabilities, with filtering and " +
    "impact-path visualization.",
  "/incident-command-center":
    "Unified incident view separating Confirmed Technical Condition, Probable Technical " +
    "Cause, Potential Healthcare Workflow Impact, and Recommended Actions.",
  "/aiops-insights":
    "Explains operational intelligence findings: correlated incidents, anomalies, " +
    "recommended runbooks, and confidence/uncertainty statements.",
  "/synthetic-monitoring":
    "Visualizes synthetic workflows such as Clinician Sign-In and Imaging Study Retrieval.",
  "/tool-rationalization":
    "Vendor-neutral evaluation of monitoring-platform strategy.",
  "/cost-optimization":
    "Illustrative economics comparing third-party and Azure-native monitoring costs.",
  "/executive-copilot":
    "Evidence-grounded investigation answering the fixed set of Executive Copilot " +
    "questions.",
  "/production-readiness":
    "Organizational readiness across Technical, Healthcare Operations, Security, and " +
    "Governance categories.",
  "/presenter-mode": "Full scenario control for delivering executive demonstrations.",
  "/rehearsal-mode": "Practice environment using deterministic AI and isolated data.",
  "/audience-view": "Read-only experience for observing a live demonstration.",
  "/demo-readiness": "Validates the environment before a demonstration begins.",
};

export const pageRoutes = NAV_ITEMS.map((item) => ({
  path: item.path,
  element: (
    <PlaceholderPage
      title={item.label}
      description={DESCRIPTIONS[item.path] ?? ""}
    />
  ),
}));
