import React from "react";
import { render, screen } from "@testing-library/react";
import { Wordmark } from "./Wordmark";
import { describe, it, expect } from "vitest";

describe("Wordmark", () => {
  it("renders as an anchor by default", () => {
    render(<Wordmark data-testid="wordmark" />);
    const element = screen.getByTestId("wordmark");
    expect(element.tagName).toBe("A");
  });

  it("defaults to href='/'", () => {
    render(<Wordmark data-testid="wordmark" />);
    const element = screen.getByTestId("wordmark") as HTMLAnchorElement;
    expect(element.href).toContain("/");
  });

  it("renders as span when as='span'", () => {
    render(
      <Wordmark as="span" data-testid="wordmark" />,
    );
    const element = screen.getByTestId("wordmark");
    expect(element.tagName).toBe("SPAN");
  });

  it("renders 'Affina' and 'AI' text", () => {
    render(<Wordmark />);
    expect(screen.getByText("Affina")).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders AI in italic with rose color", () => {
    const { container } = render(<Wordmark />);
    const aiSpan = Array.from(container.querySelectorAll("span")).find(
      (el) => el.textContent === "AI",
    );
    expect(aiSpan).toHaveClass("italic", "text-rose");
  });

  it("applies wordmark font class", () => {
    render(<Wordmark data-testid="wordmark" />);
    const element = screen.getByTestId("wordmark");
    expect(element).toHaveClass("font-wordmark");
  });

  it("applies default size class", () => {
    render(<Wordmark data-testid="wordmark" />);
    const element = screen.getByTestId("wordmark");
    expect(element).toHaveClass("text-2xl", "font-medium");
  });

  it("accepts custom href", () => {
    render(<Wordmark href="/home" data-testid="wordmark" />);
    const element = screen.getByTestId("wordmark") as HTMLAnchorElement;
    expect(element.href).toContain("/home");
  });

  it("merges custom className", () => {
    render(
      <Wordmark className="custom-size" data-testid="wordmark" />,
    );
    const element = screen.getByTestId("wordmark");
    expect(element).toHaveClass("custom-size", "font-wordmark");
  });

  it("accepts standard HTML attributes on anchor", () => {
    render(
      <Wordmark
        id="site-wordmark"
        aria-label="Affina AI home"
        data-testid="wordmark"
      />,
    );
    const element = screen.getByTestId("wordmark");
    expect(element).toHaveAttribute("id", "site-wordmark");
    expect(element).toHaveAttribute("aria-label", "Affina AI home");
  });
});
