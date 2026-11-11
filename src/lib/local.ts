/**
 * Helpers for the local ("service in town") pages: URLs, titles,
 * descriptions and the location-specific FAQs.
 */
import { site, portfolio } from "@/data/site";
import type { Service, ServiceSlug, Faq } from "@/data/services";
import type { Location } from "@/data/locations";

/**
 * Search-friendly service name used in the H1 and the start of the page title,
 * e.g. "Website Design in Ripley, MS".
 */
export const localTitle: Record<ServiceSlug, string> = {
  "web-design": "Website Design",
  "web-hosting": "Web Hosting",
  "app-development": "App Development",
  "it-services": "IT Services & Support",
  "digital-marketing": "Marketing & SEO Services",
  "social-media-marketing": "Social Media Marketing",
  "graphic-design": "Graphic Design",
  "custom-software": "Custom Software Development",
};

/**
 * Second half of the page title — the other way people search for the same
 * service. "Website Design in Ripley, MS | Web Design Company" covers both
 * "website design" and "web design" searches.
 */
export const titleTail: Record<ServiceSlug, string> = {
  "web-design": "Web Design Company",
  "web-hosting": "Website Hosting & Domains",
  "app-development": "Mobile App Developers",
  "it-services": "IT Support & Managed IT",
  "digital-marketing": "Digital Marketing Agency",
  "social-media-marketing": "Social Media Management",
  "graphic-design": "Logo Design & Branding",
  "custom-software": "Software Developers",
};

/** Page title for a service in a place: "<service> in <place> | <other search phrase>". */
export function localPageTitle(slug: ServiceSlug, place: string) {
  // Shorter lead for the three longest names, so the whole title fits in a search result.
  const lead: Partial<Record<ServiceSlug, string>> = {
    "it-services": "IT Services",
    "digital-marketing": "Marketing & SEO",
    "custom-software": "Custom Software",
  };
  return `${lead[slug] ?? localTitle[slug]} in ${place} | ${titleTail[slug]}`;
}

/**
 * One plain sentence per service that works in the other phrases people type
 * into Google ("web designer", "IT support", "logo design"…), so each page
 * matches those searches too. `place` is a town, a county or "North Mississippi".
 */
export function searchSentence(slug: ServiceSlug, place: string, area: string): string {
  const sentences: Record<ServiceSlug, string> = {
    "web-design": `Looking for a web designer in ${place}? We handle website design, website development and redesigns for ${area} businesses, from a simple five-page site to a full online store.`,
    "web-hosting": `We provide website hosting, domain names and SSL for ${place} businesses, and we can move your existing site over from another web hosting company with the switch planned so it stays online.`,
    "app-development": `We are app developers for ${place} businesses and organizations: mobile app development for iPhone and Android, plus web apps that run in any browser.`,
    "it-services": `Need IT support in ${place}? We offer one-time fixes and ongoing managed IT services — computer and network support, business email, backups and security — for ${area} offices.`,
    "digital-marketing": `We are a digital marketing agency serving ${place}: search engine optimization (SEO), Google Business Profile management, Google Ads and Facebook ads that put ${area} businesses in front of local customers.`,
    "social-media-marketing": `Our social media management for ${place} businesses covers Facebook, Instagram and TikTok — content, posting, page management and ads — so you get a social media manager without hiring one.`,
    "graphic-design": `Need a graphic designer in ${place}? We do logo design, branding, business cards, signs, flyers and social media graphics for ${area} businesses.`,
    "custom-software": `We are software developers for ${place} businesses: custom software development, web applications, dashboards, customer portals and integrations built around how you work.`,
  };
  return sentences[slug];
}

/** Words that match portfolio tags to a service, for "related work". */
const workTags: Record<ServiceSlug, string[]> = {
  "web-design": ["Web Design"],
  "web-hosting": ["Web Design"],
  "app-development": ["App Development", "Custom Software"],
  "it-services": [],
  "digital-marketing": ["Local SEO", "SEO", "Ads", "Marketing"],
  "social-media-marketing": ["Social Media", "Marketing", "Ads"],
  "graphic-design": ["Graphic Design"],
  "custom-software": ["Custom Software", "App Development", "Live Streaming"],
};

/**
 * The region-wide entry has no separate "service in North Mississippi" page —
 * the main service page already is that page.
 */
export function localHref(service: Service, loc: Location) {
  return loc.kind === "region" ? `/services/${service.slug}/` : `/services/${service.slug}/${loc.slug}/`;
}

export function relatedWork(slug: ServiceSlug, count = 3) {
  const tags = workTags[slug];
  const matches = portfolio.filter((p) => p.services.some((s) => tags.includes(s)));
  const rest = portfolio.filter((p) => !matches.includes(p));
  return [...matches, ...rest].slice(0, count);
}

/** Work to feature for an area — projects from that area first. */
export function areaWork(loc: Location, count = 3) {
  const isTippah = loc.slug === "ripley-ms" || loc.slug === "tippah-county-ms";
  const local = isTippah ? portfolio.filter((p) => /ripley|rctv/i.test(p.domain)) : [];
  const rest = portfolio.filter((p) => !local.includes(p));
  return [...local, ...rest].slice(0, count);
}

const listOf = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export function nearby(loc: Location, count = 4) {
  return listOf(loc.communities.slice(0, count));
}

export function localMeta(service: Service, loc: Location) {
  const where = loc.kind === "city" ? `${loc.name} and ${loc.county}` : loc.name;
  const base = `${localTitle[service.slug]} in ${loc.full} from ${site.name}. ${service.short}`;
  const full = `${base} Serving ${where}. Call ${site.phone}.`;
  return full.length <= 160 ? full : `${base} Call ${site.phone}.`;
}

/** Rotate a list so different towns lead with different items. */
export function rotate<T>(items: T[], by: number): T[] {
  if (!items.length) return items;
  const n = ((by % items.length) + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

export function localFaqs(service: Service, loc: Location): Faq[] {
  const area = loc.kind === "city" ? `${loc.name} and across ${loc.county}` : `across ${loc.name}`;
  const onSite =
    service.slug === "it-services"
      ? `Many IT problems can be fixed remotely within minutes, which is usually the fastest route. When something needs hands on it, we schedule an on-site visit to your ${loc.name} location.`
      : `Most projects are handled by phone, email and video call, so you never have to leave your business. When it helps to sit down in person, we will set up a time that works for you.`;
  return [
    {
      q: `Do you offer ${service.keyword} in ${loc.full}?`,
      a: `Yes. ${site.name} provides ${service.keyword} for businesses in ${area}, including ${nearby(loc)}. Call ${site.phone} or email us to get started.`,
    },
    {
      q: service.slug === "it-services" ? `Do you come on-site in ${loc.name}?` : `Do we need to meet in person?`,
      a: onSite,
    },
    {
      q: `How do I get a quote for ${service.keyword} in ${loc.name}?`,
      a: `Call ${site.phone} or click any “Email us” button on this page. Tell us a little about your business and what you need, and we will reply — usually within one business day — with a few questions or a clear written quote.`,
    },
  ];
}

export function areaFaqs(loc: Location): Faq[] {
  const where = loc.kind === "city" ? `${loc.name} and the rest of ${loc.county}` : loc.name;
  return [
    {
      q: `What services do you offer in ${loc.full}?`,
      a: `We offer web design, web hosting, app development, IT services, marketing and SEO, social media marketing, graphic design and custom software for businesses in ${where}.`,
    },
    {
      q: `Which communities near ${loc.name} do you serve?`,
      a: `We work with businesses throughout ${loc.kind === "region" ? "the region" : loc.county}, including ${nearby(loc, 6)}, and across the rest of North Mississippi.`,
    },
    {
      q: `How do I get started?`,
      a: `Call ${site.phone} or click “Email us” — it opens your email with our address filled in. Tell us what you need and we will reply, usually within one business day.`,
    },
    {
      q: `Do you work with small businesses in ${loc.name}?`,
      a: `Yes. Most of our clients are small and mid-sized local businesses. We give you a clear written price before any work starts, so there are no surprises.`,
    },
  ];
}
