import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CtaBand } from "./CtaBand";

describe("CtaBand", () => {
  it("renders the eyebrow and inverted-tone headline", () => {
    render(<CtaBand />);
    expect(screen.getByText(/start here/i)).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/A 30-minute conversation/i);
    expect(heading).toHaveTextContent(/no pitch deck/i);
  });

  it("renders the body copy", () => {
    render(<CtaBand />);
    expect(screen.getByText(/Tell me where you're stuck/i)).toBeInTheDocument();
  });

  it("renders the Book your consult CTA linked to /contact", () => {
    render(<CtaBand />);
    const cta = screen.getByRole("link", { name: /book your consult/i });
    expect(cta).toHaveAttribute("href", "/contact");
  });

  it("renders the meta line about Portland and U.S. clients", () => {
    render(<CtaBand />);
    expect(screen.getByText(/Portland-based/i)).toBeInTheDocument();
  });
});
