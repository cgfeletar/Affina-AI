import React from "react";
import { render, screen } from "@testing-library/react";
import { Container } from "./Container";
import { describe, it, expect } from "vitest";

describe("Container", () => {
  it("renders as a div by default", () => {
    render(
      <Container data-testid="container">Content</Container>,
    );
    const element = screen.getByTestId("container");
    expect(element.tagName).toBe("DIV");
  });

  it("renders with correct classes", () => {
    render(
      <Container data-testid="container">Content</Container>,
    );
    const element = screen.getByTestId("container");
    expect(element).toHaveClass(
      "mx-auto",
      "w-full",
      "max-w-content",
      "px-[var(--gutter)]",
    );
  });

  it("renders as different element when as prop is provided", () => {
    render(
      <Container as="section" data-testid="container">
        Content
      </Container>,
    );
    const element = screen.getByTestId("container");
    expect(element.tagName).toBe("SECTION");
  });

  it("merges custom className", () => {
    render(
      <Container className="custom-class" data-testid="container">
        Content
      </Container>,
    );
    const element = screen.getByTestId("container");
    expect(element).toHaveClass("custom-class");
    expect(element).toHaveClass("max-w-content");
  });

  it("accepts standard HTML attributes", () => {
    render(
      <Container
        id="my-container"
        role="main"
        data-testid="container"
        aria-label="Main container"
      >
        Content
      </Container>,
    );
    const element = screen.getByTestId("container");
    expect(element).toHaveAttribute("id", "my-container");
    expect(element).toHaveAttribute("role", "main");
    expect(element).toHaveAttribute("aria-label", "Main container");
  });

  it("renders children correctly", () => {
    render(
      <Container>
        <span data-testid="child">Child content</span>
      </Container>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toHaveTextContent("Child content");
  });
});
