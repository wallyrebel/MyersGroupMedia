# Myers Group Media

The website for **Myers Group Media** — web design, hosting, apps, IT, marketing, social media, graphic design and custom software for North Mississippi businesses.

- **Live site:** <https://myersgroupmedia.com>
- **Hosting:** Cloudflare Pages (builds automatically when `main` changes)
- **Stack:** Astro 5 (static HTML), Tailwind CSS v4, MDX for blog posts. No client-side framework — pages ship almost no JavaScript.

---

## Editing the site

Almost everything is driven by three data files. Edit, commit, push — the site rebuilds itself.

| To change… | Edit |
|---|---|
| Phone, email, hours, address, social links, stats, portfolio | `src/data/site.ts` |
| The eight services (text, what's included, FAQs) | `src/data/services.ts` |
| The towns and counties served, and the local copy for each | `src/data/locations.ts` |
| Blog posts | `src/content/journal/*.mdx` |

### Contact buttons

There is no contact form and nothing is sent to a server. Every **Email us** button is a `mailto:` link that opens the visitor's own email app addressed to the `email` in `src/data/site.ts`; every **Call** button dials `phone`. Both appear in the header, in the section above the footer, in the footer, and in a fixed bar at the bottom of the screen on phones. The contact page also has a short "write your question" box that opens the visitor's email with their message already filled in.

Change the address or number in `src/data/site.ts` and every button updates.

### Adding a service area

Add an entry to `locations` in `src/data/locations.ts` (copy an existing one) and an entry to `localIndustries` in the same file. That one addition creates the area page plus a local page for every service, and adds the area to the menus, footer and sitemap.

### Adding a blog post

Add a `.mdx` file to `src/content/journal/`:

```mdx
---
title: "Post title"
date: 2026-11-11
excerpt: "One or two sentences. Used as the search-result description."
tags: ["seo", "small-business"]
category: "SEO"
author: "Myers Group Media"
image: "/blog/my-image.jpg"   # optional — file goes in public/blog/
---

Post text in Markdown…
```

---

## How the site is organized for search

| URL | What it is |
|---|---|
| `/services/<service>/` | One page per service, targeting "‹service› North Mississippi" |
| `/services/<service>/<area>/` | One page per service per area (88 pages), e.g. `/services/web-design/corinth-ms/` |
| `/areas/<area>/` | One page per town/county, linking to every service there |
| `/journal/<post>/` | Blog posts |

Every page gets a unique title and description, a canonical URL, Open Graph tags, breadcrumbs, and JSON-LD structured data (`ProfessionalService` with phone, hours and all service areas; `Service`; `FAQPage`; `BreadcrumbList`; `BlogPosting`). The sitemap is generated at `/sitemap-index.xml`. Old URLs are redirected in `public/_redirects`.

The copy for each service-in-a-town page is written per pair in `locations.ts` (`angles`), so the local pages are not one template with the town name swapped.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build → ./dist
```

Requires Node 20 or newer (`.nvmrc` pins 22).

> **Windows note:** keep the project in a short folder path (for example `C:\sites\MyersGroupMedia`). Very long paths can push files inside `node_modules` past Windows' 260-character limit and break the build.

## Deploying (Cloudflare Pages)

- **Build command:** `npm run build`
- **Output directory:** `dist`
- Pushing to `main` deploys to production. Pushing any other branch creates a preview deployment with its own URL.

No environment variables are needed.

---

## Project structure

```
public/            static files: favicon, robots.txt, _redirects, _headers, blog images
src/
  assets/portfolio/  portfolio screenshots (optimized automatically at build)
  components/        Header, Footer, ContactBand, MobileBar, QuickEmail, cards, icons
  content/journal/   blog posts (MDX) + the auto-blog topic ledger
  data/              site.ts, services.ts, locations.ts  ← edit these
  layouts/           BaseLayout.astro (head tags, structured data, shared scripts)
  lib/               schema.ts (structured data), local.ts (local-page helpers)
  pages/             routes
  styles/global.css  design tokens and shared styles
worker/            optional Cloudflare Worker that drafts a weekly blog post
```

## Auto-blog worker (optional)

`/worker` is a separate Cloudflare Worker that, when deployed, writes a new MDX post to `src/content/journal/` every Monday and records it in `_topics-used.json` so topics are not repeated. It is not required for the site to run. To deploy it:

```bash
cd worker
npm install
npx wrangler login
npx wrangler secret put OPENAI_API_KEY     # or ANTHROPIC_API_KEY
npx wrangler secret put PEXELS_API_KEY
npx wrangler secret put GITHUB_TOKEN       # fine-grained token, Contents: read & write on this repo
npm run deploy
```

Settings live in `worker/wrangler.toml`. `DRAFT_MODE = "true"` keeps new posts hidden until you set `draft: false` in the post; `AUTOPOST_ENABLED = "false"` switches it off.

---

© Myers Group Media. All rights reserved.
