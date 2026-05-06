import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutPage from "./page";

describe("About page", () => {
  it("renders the H1 with the founder's name", () => {
    render(<AboutPage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Hi, I'm/i);
    expect(heading).toHaveTextContent(/Caitlyn/i);
  });

  it("renders the lede about Portland and boutique businesses", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/small AI consulting practice in Portland/i),
    ).toBeInTheDocument();
  });

  it("renders the founder portrait placeholder", () => {
    render(<AboutPage />);
    expect(screen.getByText("Founder portrait")).toBeInTheDocument();
    expect(screen.getByText(/Caitlyn at work/i)).toBeInTheDocument();
  });

  it("renders the three story paragraphs", () => {
    render(<AboutPage />);
    expect(screen.getByText(/I started Affina AI/i)).toBeInTheDocument();
    expect(
      screen.getByText(/practice I built around fixing one specific thing/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/med spas, beauty studios, and fitness studios/i),
    ).toBeInTheDocument();
  });

  it("renders the four principles as h3 headings", () => {
    render(<AboutPage />);
    const principles = [
      "Small, specific systems.",
      "On the tools you already trust.",
      "Two to four weeks per build.",
      "One or two clients at a time.",
    ];
    for (const title of principles) {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }
  });

  it("includes the reusable CtaBand", () => {
    render(<AboutPage />);
    expect(screen.getByText(/start here/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /book your consult/i }),
    ).toHaveAttribute("href", "/contact");
  });
});
