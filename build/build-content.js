/**
 * Cortelyou Road Radio - daily content builder
 * ------------------------------------------------------------------
 * Pulls fresh stories from public RSS feeds and updates ../content.json
 * for the redesigned site's four pools: music, chart, ditmas, brooklyn.
 *
 * Model: news AGGREGATION. Each card shows a headline, a short summary,
 * a "via <Outlet>" credit, the outlet's own thumbnail, and links to the
 * original article. It does not copy full articles.
 *
 * The script MERGES: it refreshes the feed-driven pools (music, ditmas,
 * brooklyn) and preserves any hand-curated pools already in content.json
 * (e.g. chart, which has no reliable free feed). If a feed group returns
 * nothing, that pool is left untouched so the site never goes blank.
 *
 * Run:  npm install && npm run build   (writes ../content.json)
 */
import Parser from "rss-parser";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "..", "content.json");

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "CortelyouRoadRadioBot/1.0 (+https://cortelyouroadradio.com)" },
  customFields: { item: [["media:content", "mediaContent", { keepArray: true }], ["media:thumbnail", "mediaThumbnail", { keepArray: true }], ["content:encoded", "contentEncoded"]] },
});

/* Feed groups -> site pools. Edit freely. */
const GROUPS = {
  music: {
    tag: "Music News",
    feeds: [
      { url: "https://www.stereogum.com/feed/", source: "Stereogum" },
      { url: "https://consequence.net/feed/", source: "Consequence" },
      { url: "https://pitchfork.com/rss/news/", source: "Pitchfork" },
    ],
    count: 5,
  },
  ditmas: {
    tag: "Neighborhood",
    feeds: [
      { url: "https://www.brooklynpaper.com/category/neighborhoods/ditmas-park/feed/", source: "Brooklyn Paper" },
      { url: "https://www.brooklynpaper.com/category/neighborhoods/flatbush/feed/", source: "Brooklyn Paper" },
      { url: "https://bklyner.com/feed/", source: "Bklyner" },
    ],
    count: 3,
  },
  brooklyn: {
    tag: "Brooklyn",
    feeds: [
      { url: "https://www.brooklynpaper.com/feed/", source: "Brooklyn Paper" },
      { url: "https://www.amny.com/feed/", source: "amNewYork" },
    ],
    count: 4,
  },
};

function clean(text = "", max = 220) {
  const s = String(text).replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
  return s.length <= max ? s : s.slice(0, max).replace(/\s+\S*$/, "") + "…";
}
function imageFrom(item) {
  const mc = item.mediaContent?.[0]?.$?.url || item.mediaContent?.[0]?.url;
  const mt = item.mediaThumbnail?.[0]?.$?.url || item.mediaThumbnail?.[0]?.url;
  const enc = item.enclosure?.url;
  const inline = (item.contentEncoded || item.content || "").match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  const src = mc || mt || enc || inline;
  return src ? { src, alt: clean(item.title || "", 120), credit: null } : null;
}
function normalize(item, tag, source) {
  return {
    tag,
    title: clean(item.title || "Untitled", 160),
    summary: clean(item.contentSnippet || item.content || "", 200),
    body: clean(item.contentSnippet || item.content || item.contentEncoded || "", 620),
    source,
    sourceUrl: item.link || null,
    image: imageFrom(item) ? { ...imageFrom(item), credit: source } : null,
    publishedAt: item.isoDate || item.pubDate || null,
  };
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("feed timeout")), ms)),
  ]);
}

async function pull(group) {
  const results = await Promise.allSettled(group.feeds.map((f) => withTimeout(parser.parseURL(f.url), 12000).then((feed) => ({ feed, source: f.source }))));
  let items = [];
  for (const r of results) {
    if (r.status === "fulfilled" && r.value.feed?.items?.length) {
      items.push(...r.value.feed.items.map((it) => normalize(it, group.tag, r.value.source)));
    } else if (r.status === "rejected") {
      console.warn("  ! feed failed:", r.reason?.message || r.reason);
    }
  }
  const seen = new Set();
  items = items
    .filter((it) => it.image && !seen.has(it.title.toLowerCase()) && seen.add(it.title.toLowerCase()))
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
    .slice(0, group.count);
  return items;
}

async function main() {
  let content = {};
  try { content = JSON.parse(await readFile(OUTPUT, "utf8")); } catch { content = {}; }

  for (const [pool, group] of Object.entries(GROUPS)) {
    console.log(`Pulling ${pool}...`);
    try {
      const items = await pull(group);
      if (items.length) {
        content[pool] = items;
        console.log(`  ${items.length} fresh items`);
      } else {
        console.warn(`  (no items; keeping existing ${pool})`);
      }
    } catch (e) {
      console.warn(`  ${pool} failed: ${e.message}; keeping existing`);
    }
  }

  content.generatedAt = new Date().toISOString();
  await writeFile(OUTPUT, JSON.stringify(content, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${OUTPUT} — pools: ${Object.keys(content).filter((k) => k !== "generatedAt").join(", ")}`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
