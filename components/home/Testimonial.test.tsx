import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Testimonial } from "./Testimonial";

describe("Testimonial", () => {
  it("renders the placeholder quote", () => {
    render(<Testimonial />);
    expect(
      screen.getByText(/A real client quote will live here/i),
    ).toBeInTheDocument();
  });

  it("renders the placeholder attribution", () => {
    render(<Testimonial />);
    expect(
      screen.getByText(/Client name · Studio name, Portland/i),
    ).toBeInTheDocument();
  });

  it("renders the case-study-coming-soon note", () => {
    render(<Testimonial />);
    expect(
      screen.getByText(/Case study coming soon. First build in progress with a Portland med spa/i),
    ).toBeInTheDocument();
  });
});
