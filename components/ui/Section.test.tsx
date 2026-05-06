import React from "react";
import { render, screen } from "@testing-library/react";
import { Section } from "./Section";
import { describe, it, expect } from "vitest";

describe("Section", () => {
  it("renders as a section element", () => {
    render(<Section data-testid="section">Content</Section>);
    const element = screen.getByTestId("section");
    expect(element.tagName).toBe("SECTION");
  });

  it("applies default tone styles", () => {
    render(<Section data-testid="section">Content</Section>);
    const element = screen.getByTestId("section");
    expect(element).toHaveClass("bg-bg", "text-ink");
  });

  it("applies deep tone styles", () => {
    render(
      <Section tone="deep" data-testid="section">
        Content
      </Section>,
    );
    const element = screen.getByTestId("section");
    expect(element).toHaveClass("bg-bg-deep", "text-ink");
  });

  it("applies ink tone styles", () => {
    render(
      <Section tone="ink" data-testid="section">
        Content
      </Section>,
    );
    const element = screen.getByTestId("section");
    expect(element).toHaveClass("bg-ink", "text-bg");
  });

  it("includes vertical padding class", () => {
    render(<Section data-testid="section">Content</Section>);
    const element = screen.getByTestId("section");
    expect(element).toHaveClass("py-[var(--section-y)]");
  });

  it("includes full width class", () => {
    render(<Section data-testid="section">Content</Section>);
    const element = screen.getByTestId("section");
    expect(element).toHaveClass("w-full");
  });

  it("merges custom className with tone styles", () => {
    render(
      <Section tone="deep" className="custom-class" data-testid="section">
        Content
      </Section>,
    );
    const element = screen.getByTestId("section");
    expect(element).toHaveClass("custom-class", "bg-bg-deep");
  });

  it("accepts standard HTML attributes", () => {
    render(
      <Section id="hero-section" aria-label="Hero" data-testid="section">
        Content
      </Section>,
    );
    const element = screen.getByTestId("section");
    expect(element).toHaveAttribute("id", "hero-section");
    expect(element).toHaveAttribute("aria-label", "Hero");
  });

  it("renders children correctly", () => {
    render(
      <Section>
        <p data-testid="child">Section content</p>
      </Section>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
