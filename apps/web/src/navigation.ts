/**
 * Minimum application navigation, per prompt/02-Application.md ("Application
 * Navigation").
 */
export interface NavItem {
  path: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/executive-overview", label: "Executive Overview" },
  { path: "/observability-map", label: "Observability Map" },
  { path: "/incident-command-center", label: "Incident Command Center" },
  { path: "/aiops-insights", label: "AIOps Insights" },
  { path: "/synthetic-monitoring", label: "Synthetic Monitoring" },
  { path: "/tool-rationalization", label: "Tool Rationalization" },
  { path: "/cost-optimization", label: "Cost Optimization" },
  { path: "/executive-copilot", label: "Executive Copilot" },
  { path: "/production-readiness", label: "Production Readiness" },
  { path: "/presenter-mode", label: "Presenter Mode" },
  { path: "/rehearsal-mode", label: "Rehearsal Mode" },
  { path: "/audience-view", label: "Audience View" },
  { path: "/demo-readiness", label: "Demo Readiness" },
];
