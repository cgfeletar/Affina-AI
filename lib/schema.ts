import { SITE } from "./site";

const METERS_PER_MILE = 1609.344;

export type SchemaObject = Record<string, unknown>;

export function organizationSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}#organization`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    sameAs: [SITE.instagram],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: SITE.geo.latitude,
        longitude: SITE.geo.longitude,
      },
      geoRadius: Math.round(SITE.geo.radiusMiles * METERS_PER_MILE),
    },
  };
}
