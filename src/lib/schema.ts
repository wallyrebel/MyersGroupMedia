/**
 * Structured data (JSON-LD) helpers. This is what tells Google who we are,
 * what we do and which towns we serve.
 */
import { site } from "@/data/site";
import { services, type Service, type Faq } from "@/data/services";
import { locations, type Location } from "@/data/locations";

export const BUSINESS_ID = `${site.url}/#business`;
const abs = (path: string) => new URL(path, site.url).toString();

function placeFor(loc: Location) {
  if (loc.kind === "region") {
    return { "@type": "AdministrativeArea", name: "North Mississippi" };
  }
  if (loc.kind === "county") {
    return {
      "@type": "AdministrativeArea",
      name: loc.long,
      containedInPlace: { "@type": "State", name: "Mississippi" },
    };
  }
  return {
    "@type": "City",
    name: loc.name,
    containedInPlace: { "@type": "AdministrativeArea", name: `${loc.county}, Mississippi` },
  };
}

export function businessSchema() {
  const sameAs = Object.values(site.social).filter(Boolean);
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: site.name,
    url: site.url + "/",
    logo: abs("/logo.png"),
    image: abs("/og.jpg"),
    description: site.description,
    telephone: site.phoneE164,
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.founder },
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      ...(a.street ? { streetAddress: a.street } : {}),
      ...(a.city ? { addressLocality: a.city } : {}),
      addressRegion: a.state,
      ...(a.zip ? { postalCode: a.zip } : {}),
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneE164,
      contactType: "customer service",
      areaServed: "US-MS",
      availableLanguage: "English",
    },
    areaServed: locations.map(placeFor),
    knowsAbout: services.map((s) => s.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: abs(`/services/${s.slug}/`) },
      })),
    },
    ...(site.social.googleBusiness ? { hasMap: site.social.googleBusiness } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url + "/",
    name: site.name,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}

export function serviceSchema(service: Service, loc: Location | null, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(path) + "#service",
    name: loc ? `${service.name} in ${loc.full}` : service.name,
    serviceType: service.name,
    description,
    url: abs(path),
    provider: { "@id": BUSINESS_ID },
    areaServed: loc ? placeFor(loc) : locations.map(placeFor),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
