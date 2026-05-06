import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marquee } from "./Marquee";

describe("Marquee", () => {
  it("renders ten verticals duplicated for seamless loop", () => {
    const { container } = render(<Marquee />);
    const verticalNames = [
      "Med spas",
      "Beauty salons",
      "Boutique fitness",
      "Stylists",
      "Florists",
      "Interior designers",
    ];
    for (const name of verticalNames) {
      const matches = Array.from(container.querySelectorAll("span")).filter(
        (el) => el.textContent === name,
      );
      expect(matches.length).toBe(2);
    }
  });

  it("is decorative (aria-hidden) so screen readers ignore the scroll", () => {
    const { container } = render(<Marquee />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the marquee scroll animation inline", () => {
    const { container } = render(<Marquee />);
    const track = container.querySelector('[aria-hidden="true"] > div');
    expect(track).not.toBeNull();
    const styleAttr = (track as HTMLElement).getAttribute("style") ?? "";
    expect(styleAttr).toContain("marqueeScroll");
    expect(styleAttr).toContain("45s");
    expect(styleAttr).toContain("linear");
    expect(styleAttr).toContain("infinite");
  });
});
