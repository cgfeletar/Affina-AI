import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";
import { SITE } from "@/lib/site";

describe("Footer", () => {
  it("renders as a footer landmark with the brand wordmark", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /affina ai home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the brand tagline", () => {
    render(<Footer />);
    expect(
      screen.getByText(/AI consulting for boutique businesses/i),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Portland, Oregon/i).length).toBeGreaterThan(0);
  });

  it("renders the four Explore links", () => {
    render(<Footer />);
    const explore = ["What I build", "Industries", "About", "Journal"];
    for (const label of explore) {
      const matches = screen.getAllByRole("link", { name: label });
      expect(matches.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders the four Industry links with correct hrefs", () => {
    render(<Footer />);
    const expected = [
      { name: "Med spas", href: "/industries/med-spas" },
      { name: "Beauty studios", href: "/industries/beauty" },
      { name: "Boutique fitness", href: "/industries/fitness" },
      { name: "Creatives", href: "/industries/creatives" },
    ];
    for (const { name, href } of expected) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  it("renders Connect column with contact email and Instagram", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: SITE.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${SITE.email}`);

    const instaLink = screen.getByRole("link", { name: /instagram/i });
    expect(instaLink).toHaveAttribute("href", SITE.instagram);
    expect(instaLink).toHaveAttribute("target", "_blank");
    expect(instaLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not target=_blank on the mailto link", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: SITE.email });
    expect(emailLink).not.toHaveAttribute("target");
  });

  it("renders the Book a call link", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /book a call/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders the current year and brand name in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} ${SITE.name}\\. All rights reserved\\.`)),
    ).toBeInTheDocument();
  });

  it("renders Portland, Oregon in the bottom row", () => {
    render(<Footer />);
    expect(screen.getByText("Portland, Oregon")).toBeInTheDocument();
  });

  it("uses three column headings", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: /explore/i, level: 4 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^industries$/i, level: 4 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /connect/i, level: 4 })).toBeInTheDocument();
  });
});
