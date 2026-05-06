import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ImageFrame } from "./ImageFrame";

type MockNextImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
};

vi.mock("next/image", () => ({
  default: ({ src, alt, fill, priority, className }: MockNextImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element -- Test stub for next/image; jsdom can't run the real loader.
    <img
      src={src}
      alt={alt}
      data-testid="next-image"
      data-fill={fill}
      data-priority={priority}
      className={className}
    />
  ),
}));

describe("ImageFrame", () => {
  it("renders placeholder content correctly", () => {
    render(
      <ImageFrame
        kind="placeholder"
        label="Hero portrait"
        description="Founder portrait"
      />,
    );
    expect(screen.getByText("Hero portrait")).toBeInTheDocument();
    expect(screen.getByText("Founder portrait")).toBeInTheDocument();
  });

  it("applies placeholder label styles", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description"
      />,
    );
    const labelSpan = container.querySelector(".text-xs");
    expect(labelSpan).toHaveClass(
      "text-xs",
      "uppercase",
      "tracking-eyebrow",
      "text-ink-mute",
    );
  });

  it("applies placeholder description styles", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description text"
      />,
    );
    const description = container.querySelector(".font-display");
    expect(description).toHaveClass("font-display", "italic", "text-ink-soft");
  });

  it("renders image when kind='image'", () => {
    render(
      <ImageFrame
        kind="image"
        src="/test.jpg"
        alt="Test image"
      />,
    );
    const image = screen.getByTestId("next-image");
    expect(image).toHaveAttribute("src", "/test.jpg");
    expect(image).toHaveAttribute("alt", "Test image");
  });

  it("applies base frame styles", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description"
      />,
    );
    const frame = container.firstChild as HTMLElement;
    expect(frame).toHaveClass(
      "relative",
      "flex",
      "items-center",
      "justify-center",
      "overflow-hidden",
      "border",
      "border-line",
      "bg-bg-deep",
    );
  });

  it("applies default aspect ratio", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description"
      />,
    );
    const frame = container.firstChild as HTMLElement;
    expect(frame).toHaveStyle({ aspectRatio: "4 / 5" });
  });

  it("applies custom aspect ratio", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description"
        aspectRatio="16 / 9"
      />,
    );
    const frame = container.firstChild as HTMLElement;
    expect(frame).toHaveStyle({ aspectRatio: "16 / 9" });
  });

  it("renders sage accent decoration when accent='sage'", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description"
        accent="sage"
      />,
    );
    const accent = container.querySelector(".bg-sage");
    expect(accent).toBeInTheDocument();
  });

  it("applies accent positioning and styling", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description"
        accent="sage"
      />,
    );
    const accent = container.querySelector(".bg-sage");
    expect(accent).toHaveClass("absolute", "bg-sage", "opacity-15");
    expect(accent).toBeInTheDocument();
  });

  it("does not render accent when not provided", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description"
      />,
    );
    const accent = container.querySelector(".bg-sage");
    expect(accent).not.toBeInTheDocument();
  });

  it("passes priority to next/image", () => {
    render(
      <ImageFrame
        kind="image"
        src="/hero.jpg"
        alt="Hero image"
        priority
      />,
    );
    const image = screen.getByTestId("next-image");
    expect(image).toHaveAttribute("data-priority", "true");
  });

  it("defaults priority to false", () => {
    render(
      <ImageFrame
        kind="image"
        src="/normal.jpg"
        alt="Normal image"
      />,
    );
    const image = screen.getByTestId("next-image");
    expect(image).toHaveAttribute("data-priority", "false");
  });

  it("merges custom className", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description"
        className="custom-frame"
      />,
    );
    const frame = container.querySelector("[class*='custom-frame']");
    expect(frame).toHaveClass("custom-frame", "relative", "flex");
  });

  it("renders content in correct z-index layer", () => {
    const { container } = render(
      <ImageFrame
        kind="placeholder"
        label="Label"
        description="Description"
        accent="sage"
      />,
    );
    const contentLayer = container.querySelector(".z-10");
    expect(contentLayer).toBeInTheDocument();
    expect(contentLayer).toHaveClass("relative", "z-10");
  });
});
