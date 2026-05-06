import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Scenarios } from "./Scenarios";

describe("Scenarios", () => {
  it("renders the eyebrow and headline", () => {
    render(<Scenarios />);
    expect(screen.getByText(/is this you\?/i)).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/Where boutique businesses get stretched/i);
    expect(heading).toHaveTextContent(/thin/i);
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
});
