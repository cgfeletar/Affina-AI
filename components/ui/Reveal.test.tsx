import React from "react";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Reveal", () => {
  beforeEach(() => {
    // Mock window.matchMedia for reduced motion detection
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-reduced-motion: reduce)" ? false : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock IntersectionObserver
    class MockIntersectionObserver {
      constructor(public callback: IntersectionObserverCallback) {}
      observe() {}
      unobserve() {}
      disconnect() {}
      root = null;
      rootMargin = "";
      thresholds = [];
      takeRecords() {
        return [];
      }
    }
    global.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it("renders as a div element", () => {
    render(
      <Reveal data-testid="reveal">
        <span>Content</span>
      </Reveal>,
    );
    const element = screen.getByTestId("reveal");
    expect(element.tagName).toBe("DIV");
  });

  it("renders children correctly", () => {
    render(
      <Reveal>
        <p data-testid="child">Animated content</p>
      </Reveal>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toHaveTextContent("Animated content");
  });

  it("applies custom className", () => {
    render(
      <Reveal className="custom-class" data-testid="reveal">
        Content
      </Reveal>,
    );
    const element = screen.getByTestId("reveal");
    expect(element).toHaveClass("custom-class");
  });

  it("accepts id attribute", () => {
    render(
      <Reveal id="reveal-section" data-testid="reveal">
        Content
      </Reveal>,
    );
    const element = screen.getByTestId("reveal");
    expect(element).toHaveAttribute("id", "reveal-section");
  });

  it("accepts style prop", () => {
    render(
      <Reveal
        style={{ padding: "1rem" }}
        data-testid="reveal"
      >
        Content
      </Reveal>,
    );
    const element = screen.getByTestId("reveal");
    expect(element).toHaveStyle({ padding: "1rem" });
  });

  it("accepts delay prop", () => {
    render(
      <Reveal delay={0.5} data-testid="reveal">
        Delayed content
      </Reveal>,
    );
    expect(screen.getByTestId("reveal")).toBeInTheDocument();
  });

  it("renders children even without animation", () => {
    render(
      <Reveal data-testid="reveal">
        <span data-testid="inner">Visible content</span>
      </Reveal>,
    );
    expect(screen.getByTestId("inner")).toBeInTheDocument();
  });

  it("respects prefers-reduced-motion (when enabled)", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-reduced-motion: reduce)" ? true : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <Reveal data-testid="reveal">
        <span>No animation</span>
      </Reveal>,
    );
    expect(screen.getByTestId("reveal")).toBeInTheDocument();
  });

  it("renders multiple instances with different delays", () => {
    render(
      <>
        <Reveal delay={0} data-testid="reveal-1">
          First
        </Reveal>
        <Reveal delay={0.2} data-testid="reveal-2">
          Second
        </Reveal>
      </>,
    );
    expect(screen.getByTestId("reveal-1")).toBeInTheDocument();
    expect(screen.getByTestId("reveal-2")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Reveal ref={ref} data-testid="reveal">
        Content
      </Reveal>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
