import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { JsonLd } from "./JsonLd";

describe("JsonLd", () => {
  it("renders a script tag with type application/ld+json", () => {
    const { container } = render(
      <JsonLd schema={{ "@context": "https://schema.org", "@type": "Thing" }} />,
    );
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeInTheDocument();
  });

  it("serializes the schema object as JSON in the script body", () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Affina AI",
    };
    const { container } = render(<JsonLd schema={schema} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    const parsed = JSON.parse((script as HTMLScriptElement).innerHTML);
    expect(parsed).toEqual(schema);
  });

  it("supports an array of schema objects (multi-entity graphs)", () => {
    const schemas = [
      { "@context": "https://schema.org", "@type": "Organization", name: "A" },
      { "@context": "https://schema.org", "@type": "Person", name: "B" },
    ];
    const { container } = render(<JsonLd schema={schemas} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    const parsed = JSON.parse((script as HTMLScriptElement).innerHTML);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(2);
    expect(parsed[1].name).toBe("B");
  });
});
