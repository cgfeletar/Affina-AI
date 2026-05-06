import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhatIBuildPage from "./page";

describe("What I build page", () => {
  it("renders the H1 with the italic accent", () => {
    render(<WhatIBuildPage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Builds that fix one/i);
    expect(heading).toHaveTextContent(/specific/i);
    expect(heading).toHaveTextContent(/thing/i);
  });

  it("renders the lede about the five categories", () => {
    render(<WhatIBuildPage />);
    expect(
      screen.getByText(/Every engagement starts with one bottleneck/i),
    ).toBeInTheDocument();
  });

  it("renders all five category numbers", () => {
    render(<WhatIBuildPage />);
    for (const num of ["01", "02", "03", "04", "05"]) {
      const matches = screen.getAllByText(num);
      // Categories list has 01-05; process list reuses 01-04
      expect(matches.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders all five category eyebrows", () => {
    render(<WhatIBuildPage />);
    expect(screen.getByText(/Lead capture & retention/i)).toBeInTheDocument();
    expect(screen.getByText(/Client experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Content & voice/i)).toBeInTheDocument();
    expect(screen.getByText(/Operations/i)).toBeInTheDocument();
    expect(screen.getByText(/Insight & data/i)).toBeInTheDocument();
  });

  it("renders each category headline as h3", () => {
    render(<WhatIBuildPage />);
    expect(
      screen.getByRole("heading", { level: 3, name: /Never lose a lead in your DMs again/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Personal at every step/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /A consistent presence/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Get the institutional knowledge/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Know what's actually happening/i,
      }),
    ).toBeInTheDocument();
  });

  it("lists each concrete build under its category as a definition list term", () => {
    render(<WhatIBuildPage />);
    const expectedBuilds = [
      "Lead Follow-Up Automation",
      "Client Reactivation Campaign",
      "Birthday & Anniversary Outreach",
      "Review Request Automation",
      "Appointment Reminder & Rebooking",
      "New Client Onboarding Flow",
      "Voice Agent for Inbound Calls",
      "Social Content Generation",
      "Monthly Newsletter",
      "Content Calendar + Blog Drafts",
      "Internal SOP Documentation",
      "Intake Form to CRM Pipeline",
      "Knowledge Base Q&A",
      "Reporting Dashboard",
      "Owner Analytics Dashboard",
      "Churn Prediction & Reactivation",
      "Inventory & Consumables Forecasting",
    ];
    for (const buildName of expectedBuilds) {
      expect(screen.getByText(buildName)).toBeInTheDocument();
    }
  });

  it("renders a one-sentence outcome description for each build", () => {
    render(<WhatIBuildPage />);
    // Spot-check a few descriptions to confirm dt + dd pairs rendered
    expect(
      screen.getByText(
        /Drafts a personal reply to every inquiry within minutes/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Answers the phone 24\/7, books real appointments into your PMS/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Forecasts your Botox, filler, and retail use from real booking patterns/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the four-step process section", () => {
    render(<WhatIBuildPage />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /From conversation to live in two to four weeks/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /A free 30-minute conversation/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /A scoped proposal/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Build and ship/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Light handoff/i }),
    ).toBeInTheDocument();
  });

  it("includes the reusable CtaBand", () => {
    render(<WhatIBuildPage />);
    expect(screen.getByText(/start here/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /book your consult/i }),
    ).toHaveAttribute("href", "/contact");
  });
});
