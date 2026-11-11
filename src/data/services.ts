/**
 * The eight services. Each one powers:
 *   /services/<slug>/                 — the main service page
 *   /services/<slug>/<location>/      — one local page per service area
 */
export type ServiceSlug =
  | "web-design"
  | "web-hosting"
  | "app-development"
  | "it-services"
  | "digital-marketing"
  | "social-media-marketing"
  | "graphic-design"
  | "custom-software";

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: ServiceSlug;
  /** Display name, e.g. "Web Design" */
  name: string;
  /** Lower-case phrase for sentences, e.g. "web design" */
  keyword: string;
  /** Who does it, e.g. "web designer" */
  provider: string;
  icon: string;
  /** One line for cards and menus */
  short: string;
  /** Headline on the main service page */
  headline: string;
  /** Meta description for the main service page */
  meta: string;
  intro: string[];
  includes: { title: string; text: string }[];
  goodFit: string[];
  faqs: Faq[];
  related: ServiceSlug[];
}

export const services: Service[] = [
  {
    slug: "web-design",
    name: "Web Design",
    keyword: "web design",
    provider: "web designer",
    icon: "browser",
    short: "Fast, mobile-friendly websites built to bring in calls and customers.",
    headline: "Websites that bring North Mississippi businesses more calls and customers",
    meta: "Custom web design for North Mississippi businesses. Fast, mobile-friendly, search-optimized websites built by Myers Group Media. Call (662) 576-1554.",
    intro: [
      "Your website is the first place most customers meet your business. If it is slow, hard to use on a phone, or missing from Google, they move on to the next result. We design and build websites that load fast, look sharp on every screen, and make it obvious how to call, book or buy.",
      "Every site we build is custom to your business — no cookie-cutter templates — and comes with the search engine groundwork already done, so you are set up to be found from day one.",
    ],
    includes: [
      { title: "Custom design", text: "A look built around your brand and your customers, not a recycled theme." },
      { title: "Mobile-first build", text: "Most local searches happen on a phone. Your site is designed there first." },
      { title: "Local SEO foundation", text: "Clean code, fast load times, proper titles, and the structured data Google uses to understand your business." },
      { title: "Clear calls to action", text: "Tap-to-call buttons, email links and quote requests placed where people actually look." },
      { title: "Easy updates", text: "Change your own hours, photos and text — or hand it to us and we will handle it." },
      { title: "Launch and support", text: "We handle the domain, hosting and launch, then stay available after the site goes live." },
    ],
    goodFit: [
      "You do not have a website yet, or the one you have looks dated",
      "Your site does not show up when people search for what you do",
      "Customers tell you they could not find your phone number or hours",
      "You are paying monthly for a site builder and getting very little from it",
    ],
    faqs: [
      { q: "How much does a website cost?", a: "It depends on the size of the site and what it needs to do. A straightforward small-business site costs far less than an online store or a custom web application. Tell us what you need and we will give you a clear written price before any work starts." },
      { q: "How long does it take to build a website?", a: "Most small-business websites take a few weeks from kickoff to launch. Larger sites with many pages, online ordering or custom features take longer. You get a timeline up front." },
      { q: "Will my website show up on Google?", a: "Every site we build includes the technical SEO foundation — speed, mobile-friendliness, page titles, structured data and a sitemap. For competitive searches we also offer ongoing SEO and marketing." },
      { q: "Can you redesign my existing website?", a: "Yes. We can rebuild your current site with a modern design, keep the content that works, and carry over your existing search rankings with proper redirects." },
      { q: "Do I own my website?", a: "Yes. Your domain, your content and your website are yours." },
    ],
    related: ["web-hosting", "digital-marketing", "graphic-design"],
  },
  {
    slug: "web-hosting",
    name: "Web Hosting",
    keyword: "web hosting",
    provider: "web hosting company",
    icon: "server",
    short: "Fast, secure, managed hosting with a real person to call.",
    headline: "Fast, secure website hosting with a real person to call",
    meta: "Managed web hosting for North Mississippi businesses. Fast, secure hosting with SSL, backups, updates and local support from Myers Group Media.",
    intro: [
      "Hosting is the part of your website nobody thinks about until something breaks. With us you get fast, secure hosting that is looked after by the same people who can actually fix your site — not an overseas call center and a ticket number.",
      "We handle the technical side — SSL certificates, backups, updates, domain and DNS settings — so your site stays online, stays fast and stays secure.",
    ],
    includes: [
      { title: "Fast load times", text: "Modern hosting and a global content network so pages load quickly for every visitor." },
      { title: "SSL security", text: "The padlock in the address bar, set up and renewed for you." },
      { title: "Backups", text: "Regular backups, so a mistake or an attack does not mean starting over." },
      { title: "Updates handled", text: "Software and security updates applied for you, before they become a problem." },
      { title: "Domain and DNS help", text: "We register, renew, transfer and point domains so you do not have to learn how." },
      { title: "Local support", text: "Call or email someone who knows your site by name." },
    ],
    goodFit: [
      "Your current host is slow, or impossible to reach when something goes wrong",
      "Your site has been hacked or gone down and you are not sure why",
      "You do not know who controls your domain name",
      "You would rather not think about hosting at all",
    ],
    faqs: [
      { q: "Can you move my existing website to your hosting?", a: "Yes. We handle the whole migration — files, database, domain settings and SSL — and plan the switch so your site stays online throughout." },
      { q: "Do you host websites you did not build?", a: "In most cases, yes. We will take a look at how the site was built and tell you plainly whether it is a good fit." },
      { q: "What happens if my site goes down?", a: "Call or email us. You reach a person who can look at the problem directly instead of waiting in a support queue." },
      { q: "Can you help with my domain name?", a: "Yes. We can register a new domain, renew or transfer an existing one, and sort out who actually has control of it if that has been lost over the years." },
    ],
    related: ["web-design", "it-services", "custom-software"],
  },
  {
    slug: "app-development",
    name: "App Development",
    keyword: "app development",
    provider: "app developer",
    icon: "phone",
    short: "iPhone, Android and web apps your customers will actually use.",
    headline: "Mobile apps and web apps built for the way your customers really work",
    meta: "Mobile app development in North Mississippi. iPhone, Android and web apps designed and built by Myers Group Media. Call (662) 576-1554.",
    intro: [
      "A good app puts your business one tap away on your customer's phone. We design and build iPhone, Android and web apps — from the first sketch to the App Store listing — with a focus on being simple, fast and genuinely useful.",
      "We will also tell you honestly when you do not need an app. Sometimes a well-built mobile website does the job for a fraction of the cost, and we would rather you spend your money where it pays back.",
    ],
    includes: [
      { title: "Planning and design", text: "We map out what the app needs to do and design screens people understand without instructions." },
      { title: "iPhone and Android", text: "Apps built for both platforms, so no customer is left out." },
      { title: "Web apps", text: "Apps that run in any browser — nothing to download, nothing to update." },
      { title: "Back-end and data", text: "The accounts, databases and integrations that make the app work behind the scenes." },
      { title: "App Store launch", text: "We handle submission to the Apple App Store and Google Play." },
      { title: "Ongoing updates", text: "New features, fixes and compatibility updates as phones and operating systems change." },
    ],
    goodFit: [
      "Your customers order, book or check in with you again and again",
      "You want to send updates or alerts straight to people's phones",
      "Your team needs a tool they can use in the field",
      "You have an app idea and need a team that can take it from idea to launch",
    ],
    faqs: [
      { q: "How much does it cost to build an app?", a: "It depends on what the app does. A simple app costs far less than one with accounts, payments and live data. We will talk through your idea and give you a clear written estimate first." },
      { q: "Do I need an app or just a mobile-friendly website?", a: "Often a mobile-friendly website or web app is enough, and it costs less to build and maintain. We will give you an honest recommendation either way." },
      { q: "Do you build for both iPhone and Android?", a: "Yes. We build for both, and we handle publishing to the Apple App Store and Google Play." },
      { q: "How long does app development take?", a: "A focused first version typically takes a few months from planning to launch. We scope the first release tightly so you can get in front of real users sooner." },
    ],
    related: ["custom-software", "web-design", "digital-marketing"],
  },
  {
    slug: "it-services",
    name: "IT Services",
    keyword: "IT services",
    provider: "IT company",
    icon: "shield",
    short: "Computers, networks, email and security — set up right and kept running.",
    headline: "IT support that keeps your business running",
    meta: "IT services and support for North Mississippi businesses. Computers, networks, Wi-Fi, email, backups and security from Myers Group Media. Call (662) 576-1554.",
    intro: [
      "When the computers, the Wi-Fi or the email go down, your business stops. We set up and look after the technology small businesses depend on, so problems get fixed fast — and most of them never happen in the first place.",
      "You get a local team you can call, who explains things in plain English and treats your business like it matters. Because it does.",
    ],
    includes: [
      { title: "Help when things break", text: "Remote and on-site support for computers, printers, software and everything in between." },
      { title: "Networks and Wi-Fi", text: "Reliable, secure internet and Wi-Fi for your office, shop or building." },
      { title: "Business email", text: "Professional email at your own domain, set up on every device and kept working." },
      { title: "Backups", text: "Your files and records backed up, so a failed hard drive is an annoyance and not a disaster." },
      { title: "Security", text: "Protection against viruses, ransomware and scam emails, plus sensible password practices." },
      { title: "New setups and moves", text: "New computers, new employees, new locations — set up correctly from the start." },
    ],
    goodFit: [
      "There is no IT person on staff, and the job falls to whoever is closest",
      "The same problems keep coming back",
      "You are not sure your files are really being backed up",
      "You are opening a new office or adding staff and want it done right",
    ],
    faqs: [
      { q: "Do you offer on-site IT support?", a: "Yes. Many problems can be fixed remotely in minutes, which is usually fastest. When something needs hands on it, we schedule an on-site visit." },
      { q: "Do you work with small businesses?", a: "Yes — small and mid-sized businesses are who we work with most. You do not need a big office to deserve technology that works." },
      { q: "Can you set up email at our own domain name?", a: "Yes. We set up professional business email at your domain, move your existing mail over, and get it working on every computer and phone." },
      { q: "Can you help after a virus or a hacked account?", a: "Yes. Call us. We will help you contain the problem, recover what can be recovered, and put protections in place so it is less likely to happen again." },
      { q: "Do you offer ongoing IT support or just one-time fixes?", a: "Both. We can fix a single problem, or look after your technology on an ongoing basis so issues are caught early." },
    ],
    related: ["web-hosting", "custom-software", "web-design"],
  },
  {
    slug: "digital-marketing",
    name: "Marketing & SEO",
    keyword: "marketing",
    provider: "marketing agency",
    icon: "chart",
    short: "SEO, Google Ads and local marketing that turns searches into customers.",
    headline: "Marketing that puts your business in front of local customers",
    meta: "Marketing services for North Mississippi businesses. Local SEO, Google Ads, email and digital marketing from Myers Group Media. Call (662) 576-1554.",
    intro: [
      "People in your town are searching right now for what you sell. Marketing is how you make sure they find you and not your competitor. We have been doing search engine optimization and online marketing since 2008, and we focus on the things that actually bring in customers.",
      "No mystery reports and no long contracts built on buzzwords. You get a clear plan, honest numbers and one team that handles your SEO, your ads and your website together.",
    ],
    includes: [
      { title: "Local SEO", text: "Show up when nearby customers search for what you do — in Google results and on the map." },
      { title: "Google Business Profile", text: "Your Google listing set up, filled out and kept current so it earns calls and reviews." },
      { title: "Google and Facebook ads", text: "Paid campaigns built to turn your budget into phone calls and sales." },
      { title: "Content and blogging", text: "Helpful pages and articles that answer what your customers are searching for." },
      { title: "Email marketing", text: "Stay in front of past customers and bring them back." },
      { title: "Plain-English reporting", text: "What we did, what it cost and what it brought in. No fluff." },
    ],
    goodFit: [
      "Competitors show up on Google ahead of you",
      "You have tried ads before and could not tell whether they worked",
      "Most of your business comes from word of mouth and you want more",
      "You want one team handling marketing instead of three vendors pointing at each other",
    ],
    faqs: [
      { q: "How long does SEO take to work?", a: "SEO is a long game. Most businesses start to see movement within a few months, and results build from there. Ads can bring in calls much sooner, which is why we often run both together." },
      { q: "How much should I spend on marketing?", a: "It depends on your goals, your market and how competitive your industry is. We will recommend a budget that makes sense for your business and show you what it is producing." },
      { q: "Can you help my business show up on Google Maps?", a: "Yes. Local SEO and Google Business Profile management are a core part of what we do for local businesses." },
      { q: "Do you require long-term contracts?", a: "We would rather keep clients because the work is paying off. We will explain the terms plainly before you commit to anything." },
      { q: "What kind of marketing works best for a local business?", a: "For most local businesses the essentials are a fast website, a complete Google Business Profile, steady reviews and local SEO. Ads and social media build on that foundation." },
    ],
    related: ["social-media-marketing", "web-design", "graphic-design"],
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    keyword: "social media marketing",
    provider: "social media agency",
    icon: "megaphone",
    short: "Content, posting and ads that build a real local following.",
    headline: "Social media that builds a real following — and real customers",
    meta: "Social media marketing for North Mississippi businesses. Content, posting, video and ads on Facebook, Instagram and TikTok from Myers Group Media.",
    intro: [
      "Posting once in a while and hoping is not a strategy. We plan, create and publish social media content that gets seen by the people in your community — and gives them a reason to call, visit or buy.",
      "We have built brands to more than a million combined followers and over 100 million views a month. We know what gets attention, and we know how to turn that attention into customers.",
    ],
    includes: [
      { title: "Content planning", text: "A posting plan built around your business, your seasons and your customers." },
      { title: "Posts created for you", text: "Photos, graphics, captions and short videos made and published on a steady schedule." },
      { title: "Short-form video", text: "Reels, TikToks and Shorts — the content today's platforms push hardest." },
      { title: "Page management", text: "Comments and messages watched, so customers are not left waiting." },
      { title: "Social media ads", text: "Paid campaigns aimed at the exact towns and customers you want to reach." },
      { title: "Monthly reporting", text: "See what was posted, who saw it and what it led to." },
    ],
    goodFit: [
      "Your page has not been posted to in weeks — or months",
      "You post regularly but nobody seems to see it",
      "You do not have the time to keep up with social media",
      "You want social media to bring in customers, not just likes",
    ],
    faqs: [
      { q: "Which social media platforms should my business be on?", a: "It depends on who your customers are. For most local businesses Facebook and Instagram come first, with TikTok and YouTube growing fast. We will recommend where your time and money go furthest." },
      { q: "Do you create the posts for us?", a: "Yes. We plan, create and publish the content. You approve it and get back to running your business." },
      { q: "How often will you post?", a: "We build a schedule that fits your business and your budget. Steady and consistent beats occasional bursts." },
      { q: "Do you run Facebook and Instagram ads?", a: "Yes. We build and manage paid campaigns aimed at specific towns, ages and interests, and report on what they produce." },
    ],
    related: ["digital-marketing", "graphic-design", "web-design"],
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    keyword: "graphic design",
    provider: "graphic designer",
    icon: "pen",
    short: "Logos, branding, print and signage that make you look established.",
    headline: "Logos, branding and design that make your business look as good as it is",
    meta: "Graphic design for North Mississippi businesses. Logos, branding, print, signage and social media graphics from Myers Group Media. Call (662) 576-1554.",
    intro: [
      "People judge a business in seconds, and they judge it by how it looks. A sharp logo, consistent colors and clean printed pieces tell customers you are established and trustworthy before you say a word.",
      "We design logos, brand identities, print materials and digital graphics that work together — on your sign, your truck, your website and your Facebook page.",
    ],
    includes: [
      { title: "Logo design", text: "A logo that is distinctive, readable at any size and delivered in every file format you will ever need." },
      { title: "Brand identity", text: "Colors, fonts and guidelines so everything you put out looks like it came from the same business." },
      { title: "Print design", text: "Business cards, flyers, brochures, menus, mailers and banners, ready for the printer." },
      { title: "Signs and vehicles", text: "Artwork prepared for signs, storefronts and vehicle graphics." },
      { title: "Social media graphics", text: "Templates and graphics that keep your pages looking consistent and professional." },
      { title: "Ad and event materials", text: "Designs for ads, promotions, sponsorships and community events." },
    ],
    goodFit: [
      "You are starting a new business and need a logo and a look",
      "Your logo is dated, or only exists as a blurry image file",
      "Your printed materials do not match your website or your sign",
      "You need professional design without hiring a full-time designer",
    ],
    faqs: [
      { q: "How much does a logo cost?", a: "It depends on how much is involved — a logo on its own costs less than a full brand identity with guidelines and printed materials. We will quote it up front." },
      { q: "What files do I get with my logo?", a: "You get your logo in the formats needed for print, web, signs and embroidery, in color and single-color versions. They are yours to keep and use anywhere." },
      { q: "Can you redraw or update my existing logo?", a: "Yes. We can clean up, modernize or fully recreate an existing logo as a crisp, scalable file." },
      { q: "Do you handle printing too?", a: "We prepare print-ready artwork and can help coordinate with a printer so the finished piece matches the design." },
    ],
    related: ["web-design", "social-media-marketing", "digital-marketing"],
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    keyword: "custom software",
    provider: "software developer",
    icon: "code",
    short: "Dashboards, portals and automation built around how you work.",
    headline: "Custom software built around the way your business actually works",
    meta: "Custom software development in North Mississippi. Web apps, dashboards, customer portals, integrations and automation from Myers Group Media.",
    intro: [
      "When spreadsheets, paper forms and software that almost fits are slowing your team down, custom software can give that time back. We build web applications, dashboards, customer portals and automations designed around your actual process.",
      "We have built publishing platforms, sports apps and business tools that run every day. We will also tell you when an off-the-shelf product would serve you better — we would rather build the right thing than the biggest thing.",
    ],
    includes: [
      { title: "Web applications", text: "Secure, browser-based tools your team can use from the office, the truck or home." },
      { title: "Dashboards and reporting", text: "The numbers that matter to your business, in one place and up to date." },
      { title: "Customer portals", text: "Let customers log in to order, pay, book or check the status of their job." },
      { title: "Integrations", text: "Connect the software you already use so data moves without retyping." },
      { title: "Automation", text: "Hand the repetitive tasks to software — reminders, reports, data entry and follow-ups." },
      { title: "Support and maintenance", text: "We keep what we build running, secure and up to date." },
    ],
    goodFit: [
      "Your team re-enters the same information in more than one place",
      "You have outgrown spreadsheets",
      "No off-the-shelf software fits how your business really works",
      "You inherited a custom system and need someone who can maintain it",
    ],
    faqs: [
      { q: "How do I know if I need custom software?", a: "If an existing product does most of what you need, use it. Custom software makes sense when your process is truly unique, or when workarounds are costing you real time and money. We will help you work out which it is before you spend anything." },
      { q: "How much does custom software cost?", a: "It depends on the scope. We start with a planning conversation, define the smallest version that solves the problem, and give you a clear written estimate." },
      { q: "Can you connect the software we already use?", a: "Often, yes. Many business tools can be integrated so information flows between them automatically." },
      { q: "Who owns the software you build for us?", a: "We spell out ownership clearly in writing before work begins, so there are no surprises later." },
      { q: "Can you take over software another developer built?", a: "In many cases, yes. We will review what you have and tell you honestly whether it should be maintained, improved or replaced." },
    ],
    related: ["app-development", "it-services", "web-hosting"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)!;
