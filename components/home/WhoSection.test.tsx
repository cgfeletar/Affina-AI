import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WhoSection } from "./WhoSection";

describe("WhoSection", () => {
  it("renders the eyebrow and headline", () => {
    render(<WhoSection />);
    expect(screen.getByText(/who this is for/i)).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/Built for owner-operators/i);
    expect(heading).toHaveTextContent(/how/i);
    expect(heading).toHaveTextContent(/the work/i);
  });

  it("renders the lede paragraph", () => {
    render(<WhoSection />);
    expect(
      screen.getByText(/Most AI tools are built for tech companies/i),
    ).toBeInTheDocument();
  });

  it("renders four verticals with their titles and roman numerals", () => {
    render(<WhoSection />);
    const titles = ["Med spas", "Beauty studios", "Boutique fitness", "Adjacent crafts"];
    for (const title of titles) {
      expect(
        screen.getByRole("heading", { name: title, level: 3 }),
      ).toBeInTheDocument();
    }
    for (const numeral of ["i.", "ii.", "iii.", "iv."]) {
      expect(screen.getByText(numeral)).toBeInTheDocument();
    }
  });

  it("renders descriptive copy for each vertical", () => {
    render(<WhoSection />);
    expect(screen.getByText(/Aesthetics practices/i)).toBeInTheDocument();
    expect(screen.getByText(/Blowdry bars, nail and lash studios/i)).toBeInTheDocument();
    expect(screen.getByText(/Pilates, barre, yoga/i)).toBeInTheDocument();
    expect(screen.getByText(/Stylists, florists, interior designers/i)).toBeInTheDocument();
  });
});
