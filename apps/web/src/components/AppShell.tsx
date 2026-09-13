import { NavLink, Outlet } from "react-router-dom";
import { NAV_ITEMS } from "../navigation.js";
import { DisclaimerBanner } from "./DisclaimerBanner.js";

/**
 * Application shell providing the minimum navigation defined in
 * prompt/02-Application.md ("Application Navigation") and the mandatory
 * disclaimers shown throughout the application.
 */
export function AppShell() {
  return (
    <div className="app-shell">
      <nav className="app-nav" aria-label="Primary">
        <h1>Contoso Regional Health</h1>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="app-main">
        <DisclaimerBanner />
        <Outlet />
      </main>
    </div>
  );
}
