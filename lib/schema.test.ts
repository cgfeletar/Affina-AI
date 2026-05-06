import { describe, it, expect } from "vitest";
import { organizationSchema } from "./schema";
import { SITE } from "./site";

describe("organizationSchema", () => {
  const schema = organizationSchema();

  it("declares the schema.org context and Organization type", () => {
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
  });

  it("includes a stable @id derived from the site url", () => {
    expect(schema["@id"]).toBe(`${SITE.url}#organization`);
  });

  it("includes core identity fields from SITE constants", () => {
    expect(schema.name).toBe(SITE.name);
    expect(schema.url).toBe(SITE.url);
    expect(schema.description).toBe(SITE.description);
    expect(schema.email).toBe(SITE.email);
    expect(schema.sameAs).toEqual([SITE.instagram]);
  });

  it("includes a PostalAddress with locality, region, and country", () => {
    const address = schema.address as Record<string, unknown>;
    expect(address["@type"]).toBe("PostalAddress");
    expect(address.addressLocality).toBe(SITE.city);
    expect(address.addressRegion).toBe(SITE.region);
    expect(address.addressCountry).toBe(SITE.country);
  });

  it("expresses areaServed as a 50-mile GeoCircle around Portland (in meters)", () => {
    const areaServed = schema.areaServed as Record<string, unknown>;
    expect(areaServed["@type"]).toBe("GeoCircle");
    const midpoint = areaServed.geoMidpoint as Record<string, unknown>;
    expect(midpoint["@type"]).toBe("GeoCoordinates");
    expect(midpoint.latitude).toBe(SITE.geo.latitude);
    expect(midpoint.longitude).toBe(SITE.geo.longitude);

    const expectedMeters = Math.round(SITE.geo.radiusMiles * 1609.344);
    expect(areaServed.geoRadius).toBe(expectedMeters);
    // 50 miles ≈ 80467 meters; sanity-check the math
    expect(areaServed.geoRadius).toBe(80467);
  });

  it("serializes to valid JSON (no functions, no undefined)", () => {
    const json = JSON.stringify(schema);
    expect(() => JSON.parse(json)).not.toThrow();
  });
});
