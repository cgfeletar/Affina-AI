import React from "react";
import { render, screen } from "@testing-library/react";
import { Eyebrow } from "./Eyebrow";
import { describe, it, expect } from "vitest";

describe("Eyebrow", () => {
  it("renders as a span element", () => {
    render(<Eyebrow data-testid="eyebrow">Label</Eyebrow>);
    const element = screen.getByTestId("eyebrow");
    expect(element.tagName).toBe("SPAN");
  });

  it("applies correct typography classes", () => {
    render(<Eyebrow data-testid="eyebrow">Label</Eyebrow>);
    const element = screen.getByTestId("eyebrow");
    expect(element).toHaveClass(
      "text-xs",
      "uppercase",
      "tracking-eyebrow",
      "text-ink-mute",
    );
  });

  it("renders text content", () => {
    render(<Eyebrow>Eyebrow text</Eyebrow>);
    expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
  });

  it("renders dot when dot prop is true", () => {
    const { container } = render(<Eyebrow dot>With dot</Eyebrow>);
    const dot = container.querySelector(".bg-rose");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass("h-1.5", "w-1.5", "rounded-full");
  });

  it("does not render dot by default", () => {
    const { container } = render(<Eyebrow>No dot</Eyebrow>);
    const dot = container.querySelector(".bg-rose");
    expect(dot).not.toBeInTheDocument();
  });

  it("positions dot before text", () => {
    render(
      <Eyebrow dot data-testid="eyebrow">
        Text
      </Eyebrow>,
    );
    const eyebrow = screen.getByTestId("eyebrow");
    const children = Array.from(eyebrow.childNodes);
    expect(children[0]).toHaveClass("bg-rose");
  });

  it("merges custom className", () => {
    render(
      <Eyebrow className="custom-class" data-testid="eyebrow">
        Label
      </Eyebrow>,
    );
    const element = screen.getByTestId("eyebrow");
    expect(element).toHaveClass("custom-class", "text-xs", "uppercase");
  });

  it("accepts standard HTML attributes", () => {
    render(
      <Eyebrow id="eyebrow-label" data-testid="eyebrow">
        Label
      </Eyebrow>,
    );
    const element = screen.getByTestId("eyebrow");
    expect(element).toHaveAttribute("id", "eyebrow-label");
  });
});
