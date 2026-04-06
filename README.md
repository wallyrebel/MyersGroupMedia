# Myers Group Media

The official website for **Myers Group Media** — a digital agency founded by Jon Ross Myers in 2008.

Built as a single repo containing:

1. **`/`** — The main marketing site (Astro + Tailwind v4 + React islands + WebGL hero)
2. **`/functions`** — Cloudflare Pages Functions (contact form handler)
3. **`/worker`** — Standalone Cloudflare Worker that auto-publishes a new blog post every Monday at 9am CST

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Astro 5 (static, zero-JS by default) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Interactivity | React 19 islands |
| Animation | GSAP, Lenis (smooth scroll), OGL (WebGL shader hero) |
| Content | MDX via `astro:content` |
| Hosting | Cloudflare Pages |
| Forms | Cloudflare Pages Functions + Resend |
| Auto-blog | Cloudflare Worker (cron) + OpenAI/Anthropic + Pexels + GitHub API |

---

## Local development

```bash
npm install
npm run dev
```

Site runs at <http://localhost:4321>.

### Useful commands

```bash
npm run build       # Production build → ./dist
npm run preview     # Preview the production build locally
```

---

## Deploying the website (Cloudflare Pages)

1. Push this repo to GitHub.
2. In the Cloudflare dashboard → Pages → **Create project** → connect the GitHub repo.
3. Set the build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Add the custom domain `myersgroupmedia.com` under **Custom domains**.
5. Cloudflare auto-renews SSL.

### Environment variables (Cloudflare Pages → Settings → Environment Variables)

Required for the contact form:

| Name | Description |
|---|---|
| `RESEND_API_KEY` | API key from <https://resend.com> |
| `CONTACT_TO` | Email address(es) that receive form submissions, comma-separated |
| `CONTACT_FROM` | (optional) From-address, e.g. `Myers Group Media <hello@myersgroupmedia.com>` |

---

## Auto-Blog System

The Worker in `/worker` runs on a cron schedule and publishes a new MDX blog post to this repo. Cloudflare Pages picks up the commit and auto-rebuilds the site.

### How it works

1. **Monday 9am CST** — Cloudflare cron triggers the Worker
2. Reads `src/content/journal/_topics-used.json` (the **topic ledger**)
3. Picks a category that hasn't been used in the last 4 posts
4. Picks a fresh topic angle from that category's pool
5. Sends a generation request to OpenAI (or Anthropic) with:
   - Jon's voice/system prompt
   - The last 20 posts' topics, angles, and hooks (so it never repeats)
6. Receives a JSON response with `title`, `slug`, `excerpt`, `tags`, `pexels_search_query`, and `body_mdx`
7. Searches Pexels for the featured image using the model's query
8. Commits the image to `public/blog/{slug}.jpg`
9. Commits the MDX file to `src/content/journal/{slug}.mdx`
10. Updates the ledger with the new post entry
11. Cloudflare Pages auto-rebuilds & deploys

### Draft mode (recommended for the first month)

In `worker/wrangler.toml`, leave `DRAFT_MODE = "true"`. New posts will be committed with `draft: true` in frontmatter, so they won't show on the live site until you flip them to `false` (or change `DRAFT_MODE` in wrangler).

Once you're happy with the quality (a month or so in), set `DRAFT_MODE = "false"` and posts will go live automatically every Monday.

### Kill switch

Set `AUTOPOST_ENABLED = "false"` in `wrangler.toml` (and redeploy) to stop the auto-blog without deleting it.

### Deploying the Worker

```bash
cd worker
npm install
npx wrangler login

# 1) Set the secrets:
npx wrangler secret put OPENAI_API_KEY        # or ANTHROPIC_API_KEY
npx wrangler secret put PEXELS_API_KEY
npx wrangler secret put GITHUB_TOKEN          # GitHub PAT with `repo` scope

# 2) Update wrangler.toml:
#    - GITHUB_OWNER  → your GitHub username/org
#    - GITHUB_REPO   → this repo's name
#    - GITHUB_BRANCH → usually "main"

# 3) Deploy:
npm run deploy
```

The cron trigger fires automatically once deployed.

### Manual trigger (test it)

```bash
curl -X POST https://mgm-autoblog.<your-subdomain>.workers.dev/__manual \
  -H "Authorization: Bearer <your GITHUB_TOKEN>"
```

You should see the JSON result, and within a minute a new MDX file in the repo + a new Pages deploy.

### Changing the schedule

Edit `worker/wrangler.toml`:

```toml
[triggers]
crons = ["0 14 * * 1"]   # Mondays 14:00 UTC = 9 AM CST / 8 AM CDT
```

Cron uses UTC. CST is UTC−6, CDT is UTC−5. To stay locked at 9 AM Central regardless of DST, use two triggers:

```toml
crons = ["0 14 * * 1", "0 15 * * 1"]   # both — but post will run twice; alternatively pick one and accept the DST drift
```

---

## Project structure

```
.
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── blog/                # auto-blog featured images live here
│   ├── favicon.svg
│   └── robots.txt
├── functions/
│   └── api/
│       └── contact.ts       # Pages Function — contact form
├── src/
│   ├── components/
│   │   ├── Cursor.astro     # custom cursor
│   │   ├── Footer.astro
│   │   ├── HeroCanvas.tsx   # WebGL animated background
│   │   ├── Marquee.astro
│   │   └── Nav.astro
│   ├── content/
│   │   └── journal/         # MDX blog posts + topic ledger
│   │       ├── _topics-used.json
│   │       └── *.mdx
│   ├── content.config.ts
│   ├── data/
│   │   └── site.ts          # central content (services, portfolio, nav, stats)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── process.astro
│   │   ├── work.astro
│   │   ├── journal/
│   │   │   ├── [...slug].astro
│   │   │   └── index.astro
│   │   └── services/
│   │       ├── [slug].astro
│   │       └── index.astro
│   └── styles/
│       └── global.css       # design tokens + base styles
└── worker/
    ├── package.json
    ├── tsconfig.json
    ├── wrangler.toml
    └── src/
        └── index.ts         # auto-blog Worker
```

---

## Editing site content

Most "static" content (services, portfolio, stats, nav, contact info) lives in **one file**:

```
src/data/site.ts
```

Edit there → push → site rebuilds. No CMS needed.

To add a blog post manually, drop a new `.mdx` file in `src/content/journal/` with the right frontmatter (see the existing posts as a template).

---

## What still needs API keys / config from you

When you're ready, send Jon the following and I'll wire them in:

1. **GitHub repo URL** — so I can update `worker/wrangler.toml` with `GITHUB_OWNER` and `GITHUB_REPO`.
2. **OpenAI API key** (or Anthropic) — for blog generation.
3. **Pexels API key** — free at <https://www.pexels.com/api/>.
4. **GitHub Personal Access Token** — fine-grained, with `Contents: read & write` on this repo only.
5. **Resend API key + recipient email** — for the contact form.
6. **DNS access for myersgroupmedia.com** — to point the domain at Cloudflare Pages.

---

## License

© Myers Group Media. All rights reserved.
