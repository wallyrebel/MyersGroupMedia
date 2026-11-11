/**
 * Central business info. Edit here → every page, the header, the footer,
 * the contact buttons and the search-engine structured data update together.
 */
import type { ImageMetadata } from "astro";
import imgNewsGroup from "@/assets/portfolio/mississippinewsgroup.jpg";
import imgSportsApp from "@/assets/portfolio/mississippisportsapp.jpg";
import imgRctv from "@/assets/portfolio/rctv19.jpg";
import imgCardinal from "@/assets/portfolio/cardinalripley.jpg";
import imgHarrell from "@/assets/portfolio/harrellgaragedoors.jpg";
import imgSealcoating from "@/assets/portfolio/mississippisealcoating.jpg";
import imgPorch from "@/assets/portfolio/gatheringporchripley.jpg";

export const site = {
  name: "Myers Group Media",
  shortName: "MGM",
  url: "https://myersgroupmedia.com",
  domain: "myersgroupmedia.com",
  founder: "Jon Ross Myers",
  founded: 2008,
  tagline: "Web design, IT & marketing for North Mississippi",
  description:
    "Myers Group Media is a North Mississippi web design, IT and marketing company. Websites, hosting, apps, custom software, social media and graphic design for local businesses since 2008.",

  // ── Contact ────────────────────────────────────────────────────────────
  // Every "Email us" button on the site opens the visitor's email app
  // addressed to this inbox.
  email: "myersgrouponline@gmail.com",
  phone: "(662) 576-1554",
  phoneHref: "tel:+16625761554",
  phoneE164: "+16625761554",
  hours: "Mon – Fri, 9am – 6pm CT",
  region: "North Mississippi",

  // Shown in the footer and contact page, and in the structured data Google
  // reads. Keep this EXACTLY the same as the Google Business Profile.
  address: {
    street: "112 E Jefferson St",
    city: "Ripley",
    state: "MS",
    zip: "38663",
  },
  // Leave any of these blank to hide it.
  social: {
    facebook: "https://www.facebook.com/TheMyersGroupLlc",
    instagram: "",
    linkedin: "",
    googleBusiness: "https://www.google.com/maps?cid=608276033408870578",
  },

  stats: [
    { value: "2008", label: "Serving Mississippi since" },
    { value: "200+", label: "Brands launched" },
    { value: "1M+", label: "Social followers built" },
    { value: "100M+", label: "Monthly views generated" },
  ],
};

/** Builds a mailto: link that opens the visitor's email app, pre-addressed. */
export function mailto(subject = "Question for Myers Group Media", body = "") {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.email}?${params.join("&")}`;
}

export interface PortfolioItem {
  name: string;
  url: string;
  domain: string;
  category: string;
  image: ImageMetadata;
  services: string[];
  description: string;
}

export const portfolio: PortfolioItem[] = [
  {
    name: "Harrell Garage Doors",
    url: "https://harrellgaragedoors.com",
    domain: "harrellgaragedoors.com",
    category: "Local service business",
    image: imgHarrell,
    services: ["Web Design", "Local SEO", "Ads"],
    description: "A lead-generating website for a North Mississippi garage door company, built to rank in local search and make the phone ring.",
  },
  {
    name: "Mississippi News Group",
    url: "https://mississippinewsgroup.com",
    domain: "mississippinewsgroup.com",
    category: "News & media",
    image: imgNewsGroup,
    services: ["Web Design", "Custom Software", "SEO"],
    description: "A statewide news network platform built to publish, syndicate and grow an audience across Mississippi.",
  },
  {
    name: "Mississippi Sports App",
    url: "https://mississippisportsapp.com",
    domain: "mississippisportsapp.com",
    category: "Mobile app",
    image: imgSportsApp,
    services: ["App Development", "Web Design", "Marketing"],
    description: "A mobile-first sports coverage and scores hub for fans across the state.",
  },
  {
    name: "RCTV19",
    url: "https://rctv19.com",
    domain: "rctv19.com",
    category: "Broadcast",
    image: imgRctv,
    services: ["Web Design", "Live Streaming", "SEO"],
    description: "A local television station's online home, with live streaming and on-demand programming.",
  },
  {
    name: "Mississippi Sealcoating",
    url: "https://mississippisealcoating.com",
    domain: "mississippisealcoating.com",
    category: "Local service business",
    image: imgSealcoating,
    services: ["Web Design", "Local SEO", "Ads"],
    description: "A service brand site built around trust signals and quote requests.",
  },
  {
    name: "Cardinal Ripley",
    url: "https://cardinalripley.com",
    domain: "cardinalripley.com",
    category: "Community",
    image: imgCardinal,
    services: ["Web Design", "Graphic Design"],
    description: "A community-driven publication celebrating Ripley, Mississippi.",
  },
  {
    name: "The Gathering Porch",
    url: "https://gatheringporchripley.com",
    domain: "gatheringporchripley.com",
    category: "Hospitality",
    image: imgPorch,
    services: ["Web Design", "Graphic Design", "Social Media"],
    description: "A welcoming digital home for a well-loved Ripley gathering spot.",
  },
];

export const processSteps = [
  {
    title: "Talk it through",
    text: "Call or email and tell us what you need. We ask a few plain questions about your business, your customers and your budget. No jargon, no pressure.",
  },
  {
    title: "Get a clear plan",
    text: "You get a written scope, a timeline and a price before any work starts — so you know exactly what you are getting and when.",
  },
  {
    title: "We build, you review",
    text: "We do the work and show you progress along the way. You see it, react to it, and we adjust until it is right.",
  },
  {
    title: "Launch and keep growing",
    text: "We launch, make sure everything works, and stay on as your team for updates, support and the next thing you need.",
  },
];
