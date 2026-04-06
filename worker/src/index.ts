/**
 * MGM Auto-Blog Worker
 * ====================
 * Runs every Monday 9am CST. Generates a new blog post via LLM,
 * fetches a featured image from Pexels, and commits the MDX file
 * + image to GitHub. Cloudflare Pages auto-rebuilds and deploys.
 *
 * Triggers:
 *  - Cron (production)         — see wrangler.toml
 *  - HTTP POST /__manual       — for on-demand generation
 *
 * Required secrets:
 *  - OPENAI_API_KEY (or ANTHROPIC_API_KEY)
 *  - PEXELS_API_KEY
 *  - GITHUB_TOKEN (PAT with repo scope)
 *
 * Required vars (wrangler.toml):
 *  - GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH
 *  - BLOG_DIR, LEDGER_PATH, IMAGE_DIR
 *  - AUTHOR, AUTOPOST_ENABLED, DRAFT_MODE, LLM_PROVIDER
 */

interface Env {
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  PEXELS_API_KEY: string;
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  GITHUB_BRANCH: string;
  BLOG_DIR: string;
  LEDGER_PATH: string;
  IMAGE_DIR: string;
  AUTHOR: string;
  AUTOPOST_ENABLED: string;
  DRAFT_MODE: string;
  LLM_PROVIDER: string;
}

// ============================================================
// Topic pool — rotated to ensure category diversity
// ============================================================
const TOPIC_POOL = [
  { category: "Web Design", topics: [
    "site speed and conversion rates",
    "what makes a homepage actually convert",
    "mobile-first design in 2026",
    "the death of the template website",
    "designing trust into a small business website",
    "why your CMS choice matters more than you think",
  ]},
  { category: "SEO", topics: [
    "local SEO for service businesses",
    "content depth as a ranking factor",
    "AI overviews and how to win them",
    "schema markup that actually moves the needle",
    "the new rules of link building",
    "why most small business SEO fails",
  ]},
  { category: "Social Media", topics: [
    "short-form video that doesn't feel cringe",
    "building a content engine instead of chasing trends",
    "why engagement rate beats follower count",
    "community management that actually scales",
    "creator collaborations for local brands",
    "the right cadence for each platform",
  ]},
  { category: "Digital Advertising", topics: [
    "the offer-funnel-signal framework",
    "creative testing that doesn't waste budget",
    "retargeting strategies that respect the customer",
    "Google Performance Max for service businesses",
    "Meta vs Google for local lead gen",
    "TikTok ads for non-Gen-Z brands",
  ]},
  { category: "Branding", topics: [
    "brand voice as a competitive moat",
    "naming a business in 2026",
    "visual identity systems for small teams",
    "brand consistency across channels",
    "the rebrand decision tree",
  ]},
  { category: "Marketing Strategy", topics: [
    "the 80/20 of marketing budgets under $10k/month",
    "marketing for businesses with no marketing team",
    "annual planning when everything changes monthly",
    "in-house vs agency in 2026",
    "marketing measurement when nothing is trackable",
  ]},
  { category: "Email & CRM", topics: [
    "email lists are still the best ROI in marketing",
    "lead nurture sequences that don't feel automated",
    "segmentation for small businesses",
    "writing subject lines that get opened",
  ]},
  { category: "AI & Tech", topics: [
    "where AI actually helps a marketing team",
    "the marketing tools we ditched this year",
    "automation traps to avoid",
    "what AI can't replace in agency work",
  ]},
];

// ============================================================
// Entrypoints
// ============================================================
export default {
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runJob(env, "scheduled"));
  },
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/__manual" && request.method === "POST") {
      const auth = request.headers.get("authorization");
      if (auth !== `Bearer ${env.GITHUB_TOKEN}`) {
        return new Response("Unauthorized", { status: 401 });
      }
      const result = await runJob(env, "manual");
      return new Response(JSON.stringify(result, null, 2), {
        headers: { "content-type": "application/json" },
      });
    }
    if (url.pathname === "/__health") {
      return new Response("ok");
    }
    return new Response("MGM Auto-Blog Worker — POST /__manual to trigger", { status: 200 });
  },
};

// ============================================================
// Main job
// ============================================================
async function runJob(env: Env, source: "scheduled" | "manual") {
  if (env.AUTOPOST_ENABLED !== "true") {
    return { ok: false, reason: "AUTOPOST_ENABLED is not 'true'" };
  }

  console.log(`[autoblog] Starting job (source=${source})`);

  // 1. Read existing ledger from GitHub
  const ledger = await getLedger(env);
  const recentTopics = ledger.posts.slice(-20);

  // 2. Pick a category we haven't used recently
  const recentCategories = recentTopics.slice(-4).map((p) => p.category);
  const eligible = TOPIC_POOL.filter((c) => !recentCategories.includes(c.category));
  const categoryGroup = eligible[Math.floor(Math.random() * eligible.length)] || TOPIC_POOL[0];

  // 3. Pick a specific topic angle inside that category
  const usedTopics = recentTopics.map((p) => p.topic.toLowerCase());
  const freshTopics = categoryGroup.topics.filter((t) => !usedTopics.some((u) => similarity(u, t) > 0.6));
  const topic = freshTopics[Math.floor(Math.random() * freshTopics.length)] || categoryGroup.topics[0];

  console.log(`[autoblog] Selected: ${categoryGroup.category} / "${topic}"`);

  // 4. Generate the post
  const post = await generatePost(env, categoryGroup.category, topic, recentTopics);
  console.log(`[autoblog] Generated: "${post.title}"`);

  // 5. Fetch the featured image from Pexels
  const image = await fetchPexelsImage(env, post.pexels_search_query);
  console.log(`[autoblog] Image: ${image?.url ?? "none"}`);

  // 6. Commit image + MDX to GitHub
  const slug = post.slug;
  const today = new Date().toISOString().slice(0, 10);
  const isDraft = env.DRAFT_MODE === "true";

  let imagePath = "";
  if (image) {
    imagePath = `${env.IMAGE_DIR}/${slug}.jpg`;
    const imgBytes = await fetch(image.url).then((r) => r.arrayBuffer());
    await commitFile(env, imagePath, base64FromArrayBuffer(imgBytes), `chore(blog): image for ${slug}`, true);
  }

  const mdx = buildMdx({
    title: post.title,
    date: today,
    excerpt: post.excerpt,
    tags: post.tags,
    category: categoryGroup.category,
    author: env.AUTHOR,
    image: imagePath ? `/${imagePath.replace(/^public\//, "")}` : undefined,
    imageCredit: image ? `Photo by ${image.photographer} on Pexels` : undefined,
    imageCreditUrl: image?.photographer_url,
    draft: isDraft,
    body: post.body_mdx,
  });

  const mdxPath = `${env.BLOG_DIR}/${slug}.mdx`;
  await commitFile(env, mdxPath, base64FromString(mdx), `feat(blog): ${post.title}`, false);

  // 7. Update the ledger
  ledger.posts.push({
    slug,
    date: today,
    category: categoryGroup.category,
    topic,
    angle: post.angle || "",
    hooks: [post.title.slice(0, 60)],
    examples: post.tags,
    tags: post.tags,
  });
  await commitFile(
    env,
    env.LEDGER_PATH,
    base64FromString(JSON.stringify(ledger, null, 2) + "\n"),
    `chore(blog): update topic ledger`,
    false
  );

  console.log(`[autoblog] Done. Published: ${slug} (draft=${isDraft})`);
  return { ok: true, slug, title: post.title, draft: isDraft, image: imagePath };
}

// ============================================================
// LLM generation
// ============================================================
interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  pexels_search_query: string;
  angle?: string;
  body_mdx: string;
}

async function generatePost(
  env: Env,
  category: string,
  topic: string,
  recent: any[]
): Promise<GeneratedPost> {
  const recentSummary = recent
    .map((p) => `- "${p.topic}" (${p.category}) — angle: ${p.angle}`)
    .join("\n");

  const systemPrompt = `You are Jon Ross Myers, founder of Myers Group Media — a digital agency founded in 2008 with 1M+ social followers and 100M+ monthly views built across client brands.

Voice: confident, practical, no fluff, agency-expert tone. First-person ("I", "we"). Plain words. Short sentences mixed with longer ones. Strong opinions, backed by experience. Never corporate-speak. Never AI-sounding hedging like "in today's fast-paced digital landscape".

Format: 700–950 word blog post in MDX. Use ## and ### headings. Use lists where helpful. Include at least one blockquote. End with a "What to do this week/month" practical action section.

Constraint: Do NOT repeat topics, angles, examples, opening hooks, or framings from these recent posts:
${recentSummary}`;

  const userPrompt = `Write a new blog post for the Myers Group Media journal.

Category: ${category}
Topic: ${topic}

Pick a specific, opinionated angle on this topic that we haven't covered before. The post should feel like it was written by an operator who has actually done the work — not a marketer summarizing best practices.

Return ONLY a valid JSON object (no markdown, no code fences) with this exact shape:
{
  "title": "Headline (specific, no listicle clichés, under 80 chars)",
  "slug": "url-safe-slug-with-hyphens",
  "excerpt": "1-2 sentence summary, ~25 words max",
  "tags": ["tag1", "tag2", "tag3"],
  "pexels_search_query": "2-4 word search query for a featured photo that matches the post mood",
  "angle": "one sentence describing the unique angle this post takes (for the ledger)",
  "body_mdx": "the full post body in markdown, starting with an opening hook paragraph (no h1 — title is in frontmatter)"
}`;

  const provider = env.LLM_PROVIDER || "openai";
  let raw = "";

  if (provider === "anthropic" && env.ANTHROPIC_API_KEY) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });
    if (!res.ok) throw new Error(`Anthropic error: ${await res.text()}`);
    const data = await res.json<any>();
    raw = data.content?.[0]?.text || "";
  } else {
    if (!env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY missing");
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0.8,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`OpenAI error: ${await res.text()}`);
    const data = await res.json<any>();
    raw = data.choices?.[0]?.message?.content || "";
  }

  // Strip code fences if any
  raw = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const parsed = JSON.parse(raw) as GeneratedPost;
  if (!parsed.title || !parsed.slug || !parsed.body_mdx) {
    throw new Error("LLM returned incomplete post: " + raw.slice(0, 200));
  }
  parsed.slug = parsed.slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return parsed;
}

// ============================================================
// Pexels
// ============================================================
async function fetchPexelsImage(env: Env, query: string) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape`,
    { headers: { Authorization: env.PEXELS_API_KEY } }
  );
  if (!res.ok) {
    console.error("Pexels error:", await res.text());
    return null;
  }
  const data = await res.json<any>();
  const photo = data.photos?.[Math.floor(Math.random() * Math.min(5, data.photos?.length || 0))];
  if (!photo) return null;
  return {
    url: photo.src.large2x as string,
    photographer: photo.photographer as string,
    photographer_url: photo.photographer_url as string,
  };
}

// ============================================================
// GitHub
// ============================================================
async function gh(env: Env, path: string, init?: RequestInit) {
  const url = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
      "Accept": "application/vnd.github+json",
      "User-Agent": "mgm-autoblog",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${path} ${res.status}: ${await res.text()}`);
  return res;
}

async function getLedger(env: Env): Promise<{ posts: any[]; _comment?: string }> {
  try {
    const res = await gh(env, `/contents/${env.LEDGER_PATH}?ref=${env.GITHUB_BRANCH}`);
    const data = await res.json<any>();
    const decoded = atob(data.content.replace(/\n/g, ""));
    return JSON.parse(decoded);
  } catch (e) {
    console.warn("[ledger] missing or unreadable, starting fresh");
    return { posts: [] };
  }
}

async function commitFile(
  env: Env,
  path: string,
  contentBase64: string,
  message: string,
  isBinary: boolean
) {
  // Get existing SHA if file exists (needed for updates)
  let sha: string | undefined;
  try {
    const existing = await gh(env, `/contents/${path}?ref=${env.GITHUB_BRANCH}`);
    const data = await existing.json<any>();
    sha = data.sha;
  } catch {
    // file does not exist — that's fine
  }

  await gh(env, `/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: env.GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
      committer: {
        name: "MGM Autoblog",
        email: "autoblog@myersgroupmedia.com",
      },
    }),
  });
}

// ============================================================
// MDX builder
// ============================================================
function buildMdx(opts: {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  author: string;
  image?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
  draft?: boolean;
  body: string;
}): string {
  const fm: string[] = ["---"];
  fm.push(`title: ${JSON.stringify(opts.title)}`);
  fm.push(`date: ${opts.date}`);
  fm.push(`excerpt: ${JSON.stringify(opts.excerpt)}`);
  fm.push(`tags: [${opts.tags.map((t) => JSON.stringify(t)).join(", ")}]`);
  fm.push(`category: ${JSON.stringify(opts.category)}`);
  fm.push(`author: ${JSON.stringify(opts.author)}`);
  if (opts.image) fm.push(`image: ${JSON.stringify(opts.image)}`);
  if (opts.imageCredit) fm.push(`imageCredit: ${JSON.stringify(opts.imageCredit)}`);
  if (opts.imageCreditUrl) fm.push(`imageCreditUrl: ${JSON.stringify(opts.imageCreditUrl)}`);
  fm.push(`generated: true`);
  if (opts.draft) fm.push(`draft: true`);
  fm.push("---", "");
  return fm.join("\n") + "\n" + opts.body.trim() + "\n";
}

// ============================================================
// Helpers
// ============================================================
function base64FromString(s: string): string {
  // btoa with utf-8 safety
  return btoa(unescape(encodeURIComponent(s)));
}

function base64FromArrayBuffer(buf: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}

function similarity(a: string, b: string): number {
  // Trivial token-overlap similarity for dedup
  const ta = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
  const tb = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));
  const inter = [...ta].filter((t) => tb.has(t)).length;
  return inter / Math.max(ta.size, tb.size, 1);
}
