import { SITE } from "./site";

const METERS_PER_MILE = 1609.344;

export type SchemaObject = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE.url}#organization`;

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: SITE.city,
  addressRegion: SITE.region,
  addressCountry: SITE.country,
} as const;

const SERVICE_AREA = {
  "@type": "GeoCircle",
  geoMidpoint: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  geoRadius: Math.round(SITE.geo.radiusMiles * METERS_PER_MILE),
} as const;

export function organizationSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    sameAs: [SITE.instagram],
    address: POSTAL_ADDRESS,
    areaServed: SERVICE_AREA,
  };
}

/**
 * LocalBusiness schema for the home page. Uses the same @id as
 * organizationSchema so JSON-LD parsers merge them into a single
 * multi-typed entity (Organization + LocalBusiness) — Google reads this
 * as one Affina AI entity that's both a company and a service-area
 * business.
 */
export function localBusinessSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    sameAs: [SITE.instagram],
    address: POSTAL_ADDRESS,
    areaServed: SERVICE_AREA,
    priceRange: "$$$",
    knowsAbout: [
      "AI consulting",
      "Workflow automation",
      "Lead capture automation",
      "Client retention systems",
      "Med spa operations",
      "Beauty studio operations",
      "Boutique fitness operations",
    ],
  };
}
