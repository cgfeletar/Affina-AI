import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the eyebrow with location", () => {
    render(<Hero />);
    expect(
      screen.getByText(/AI consulting · Portland, Oregon/i),
    ).toBeInTheDocument();
  });

  it("renders the headline including the italic accent", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Run like you have a/i);
    expect(heading).toHaveTextContent(/bigger team/i);
    expect(heading).toHaveTextContent(/without losing the personal touch/i);
  });

  it("renders the lede paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Affina AI helps boutique businesses give their clients/i),
    ).toBeInTheDocument();
  });

  it("renders the primary CTA linked to /contact", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /book a free consult/i });
    expect(cta).toHaveAttribute("href", "/contact");
  });

  it("renders the secondary CTA linked to /what-i-build", () => {
    render(<Hero />);
    const secondary = screen.getByRole("link", { name: /see what i build/i });
    expect(secondary).toHaveAttribute("href", "/what-i-build");
  });

  it("renders the placeholder image frame with the hero portrait label", () => {
    render(<Hero />);
    expect(screen.getByText("Hero portrait")).toBeInTheDocument();
    expect(
      screen.getByText(/Founder portrait — natural window light/i),
    ).toBeInTheDocument();
  });
});
