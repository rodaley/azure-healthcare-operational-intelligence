import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../src/App.js";
import { NAV_ITEMS } from "../src/navigation.js";

describe("App", () => {
  it("redirects the index route to Executive Overview", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: "Executive Overview" }),
    ).toBeInTheDocument();
  });

  it("renders every navigation item as a link", () => {
    render(
      <MemoryRouter initialEntries={["/executive-overview"]}>
        <App />
      </MemoryRouter>,
    );
    for (const item of NAV_ITEMS) {
      expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument();
    }
  });

  it("shows the mandatory synthetic-data disclaimer on every page", () => {
    render(
      <MemoryRouter initialEntries={["/demo-readiness"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Synthetic Healthcare Demo Data/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Demo Readiness" }),
    ).toBeInTheDocument();
  });
});
