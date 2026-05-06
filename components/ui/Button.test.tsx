import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { describe, it, expect } from "vitest";

describe("Button", () => {
  it("renders as button by default", () => {
    render(<Button data-testid="button">Click me</Button>);
    const element = screen.getByTestId("button");
    expect(element.tagName).toBe("BUTTON");
  });

  it("defaults to type submit", () => {
    render(<Button data-testid="button">Submit</Button>);
    const element = screen.getByTestId("button") as HTMLButtonElement;
    expect(element.type).toBe("submit");
  });

  it("renders as anchor when href is provided", () => {
    render(
      <Button href="/contact" data-testid="button">
        Link
      </Button>,
    );
    const element = screen.getByTestId("button");
    expect(element.tagName).toBe("A");
  });

  it("sets href when provided", () => {
    render(
      <Button href="/about" data-testid="button">
        About
      </Button>,
    );
    const element = screen.getByTestId("button") as HTMLAnchorElement;
    expect(element.href).toContain("/about");
  });

  it("applies primary variant styles by default", () => {
    render(<Button data-testid="button">Primary</Button>);
    const element = screen.getByTestId("button");
    expect(element).toHaveClass(
      "bg-ink",
      "text-bg",
      "rounded-full",
      "px-7",
      "py-4",
    );
  });

  it("applies text variant styles", () => {
    render(
      <Button variant="text" data-testid="button">
        Text button
      </Button>,
    );
    const element = screen.getByTestId("button");
    expect(element).toHaveClass("text-ink", "border-b", "border-ink");
  });

  it("includes hover states in primary variant", () => {
    render(<Button data-testid="button">Primary</Button>);
    const element = screen.getByTestId("button");
    expect(element).toHaveClass("hover:bg-rose-deep", "hover:translate-y-[-1px]");
  });

  it("includes hover states in text variant", () => {
    render(
      <Button variant="text" data-testid="button">
        Text
      </Button>,
    );
    const element = screen.getByTestId("button");
    expect(element).toHaveClass("hover:text-rose-deep", "hover:border-rose-deep");
  });

  it("includes focus ring styles", () => {
    render(<Button data-testid="button">Focus</Button>);
    const element = screen.getByTestId("button");
    expect(element).toHaveClass("focus-visible:ring-2", "focus-visible:ring-ink");
  });

  it("renders arrow icon in primary variant", () => {
    const { container } = render(<Button>Primary</Button>);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("does not render arrow icon in text variant", () => {
    const { container } = render(<Button variant="text">Text</Button>);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeInTheDocument();
  });

  it("renders button text content", () => {
    render(<Button>Click here</Button>);
    expect(screen.getByText("Click here")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(
      <Button className="custom-class" data-testid="button">
        Custom
      </Button>,
    );
    const element = screen.getByTestId("button");
    expect(element).toHaveClass("custom-class", "bg-ink");
  });

  it("accepts standard button attributes", () => {
    render(
      <Button id="submit-btn" name="action" data-testid="button">
        Submit
      </Button>,
    );
    const element = screen.getByTestId("button");
    expect(element).toHaveAttribute("id", "submit-btn");
    expect(element).toHaveAttribute("name", "action");
  });

  it("accepts standard anchor attributes when href is provided", () => {
    render(
      <Button href="/help" target="_blank" data-testid="button">
        Help
      </Button>,
    );
    const element = screen.getByTestId("button") as HTMLAnchorElement;
    expect(element).toHaveAttribute("target", "_blank");
  });
});
