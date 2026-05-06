import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Approach } from "./Approach";

describe("Approach", () => {
  it("renders the eyebrow and headline", () => {
    render(<Approach />);
    expect(screen.getByText("The approach")).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/AI that/i);
    expect(heading).toHaveTextContent(/disappears/i);
    expect(heading).toHaveTextContent(/into the way you already work/i);
  });

  it("renders the lede and body paragraphs", () => {
    render(<Approach />);
    expect(screen.getByText(/I don't sell software/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Every build is shaped around your actual bottleneck/i),
    ).toBeInTheDocument();
  });

  it("renders the lifestyle-shot image frame", () => {
    render(<Approach />);
    expect(screen.getByText("Lifestyle shot")).toBeInTheDocument();
    expect(
      screen.getByText(/Working environment — laptop on a wooden desk/i),
    ).toBeInTheDocument();
  });

  it("renders the More about the approach link to /about", () => {
    render(<Approach />);
    const link = screen.getByRole("link", { name: /more about the approach/i });
    expect(link).toHaveAttribute("href", "/about");
  });
});
