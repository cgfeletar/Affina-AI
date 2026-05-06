import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Scenarios } from "./Scenarios";

describe("Scenarios", () => {
  it("renders the eyebrow and headline", () => {
    render(<Scenarios />);
    expect(screen.getByText(/is this you\?/i)).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/Three kinds of stuck/i);
    expect(heading).toHaveTextContent(/over/i);
  });

  it("renders three scenarios with numbered indices and tags", () => {
    render(<Scenarios />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();

    expect(screen.getByText(/lead capture/i)).toBeInTheDocument();
    expect(screen.getByText(/client memory/i)).toBeInTheDocument();
    expect(screen.getByText(/marketing & content/i)).toBeInTheDocument();
  });

  it("renders the three scenario headings as h3", () => {
    render(<Scenarios />);
    expect(
      screen.getByRole("heading", { level: 3, name: /losing leads in your DMs/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /you know your clients, but your tools don't/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /marketing-on-top-of-everything-else thing isn't working/i,
      }),
    ).toBeInTheDocument();
  });
});
