/**
 * Cortelyou Road Radio - daily content builder
 * ------------------------------------------------------------------
 * Pulls fresh stories from public RSS feeds and updates ../content.json
 * for the redesigned site's four pools: music, chart, ditmas, brooklyn.
 *
 * Model: news AGGREGATION + station commentary. Each card shows a headline,
 * a short summary, a "via <Outlet>" credit, the outlet's own thumbnail, and
 * links to the original article. The story page carries a capped EXCERPT of
 * the outlet's text (never the full article, always credited and linked)
 * followed by an original Cortelyou Road Radio context paragraph, so a story
 * is a real 30-60 second read rather than a one-line snippet.
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

/* ------------------------------------------------------------------
   Story depth
   ------------------------------------------------------------------
   Story pages should be a real 30-60 second read (~150-250 words), not a
   single orphan sentence lifted from an RSS snippet. Two sources of length:

   1. A properly sized EXCERPT of the outlet's own text. Feeds vary — some
      publish a one-line snippet, some publish several paragraphs in
      content:encoded. We take up to EXCERPT_MAX_CHARS worth of whole
      paragraphs, always credited and always linked back. This stays an
      excerpt: we never take the full article, and the byline + link are
      rendered directly under the body.

   2. A CONTEXT paragraph written by Cortelyou Road Radio, chosen by topic.
      This is the station's own voice, and it is what makes the page worth
      opening rather than a reprint. It is original text, not sourced.
   ------------------------------------------------------------------ */
const EXCERPT_MAX_CHARS = 900;
const MIN_PARAGRAPH_CHARS = 60;

// Junk that shows up at the tail of syndicated feed HTML.
const BOILERPLATE = /^(share this|read more|continue reading|the post .+ appeared first|advertisement|related:|photo by|subscribe|sign up|listen below|watch below|see below|stream it below|check out|follow us|\[|©)/i;

function splitParagraphs(html = "") {
  return String(html)
    // Treat block-level breaks as paragraph breaks before stripping tags.
    .replace(/<\/(p|div|li|h[1-6]|blockquote)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .split(/\n\s*\n/)
    .map((chunk) => clean(chunk, 100000))
    .filter(Boolean);
}

/** Up to `maxChars` of the outlet's own text, kept as whole paragraphs. */
function excerptParagraphs(item, maxChars = EXCERPT_MAX_CHARS) {
  const source = item.contentEncoded || item.content || item.contentSnippet || "";
  const candidates = splitParagraphs(source).filter(
    (p) => p.length >= MIN_PARAGRAPH_CHARS && !BOILERPLATE.test(p),
  );
  const out = [];
  let used = 0;
  for (const p of candidates) {
    if (used && used + p.length > maxChars) break;
    out.push(used + p.length > maxChars ? clean(p, maxChars - used) : p);
    used += p.length;
    if (used >= maxChars) break;
  }
  if (out.length) return out;
  // Feed gave us almost nothing usable — fall back to the snippet.
  const snippet = clean(item.contentSnippet || item.content || "", 420);
  return snippet ? [snippet] : [];
}

/* Station-written context. Keyed by topic so the closing paragraph actually
   engages with the subject instead of repeating the same filler everywhere. */
const CONTEXT = [
  {
    match: /\b(tour|tour dates|on the road|residency|live dates|announces? .*(shows?|dates))\b/i,
    text: "Touring is where most of the actual money in music now sits, and it is also the least forgiving part of the business — routing, crew, freight, and insurance all rose sharply while ticket prices tried to keep up. Watch which rooms an artist books rather than how many: a run of mid-size venues that sell out is a healthier signal than a handful of arenas propped up by discounting, and it is usually the better show.",
  },
  {
    match: /\b(album|LP|record|project)\b.*\b(announce|due|out|arrives?|release)/i,
    text: "Album announcements now arrive months ahead of the record, which is a marketing structure rather than a creative one — the lead single has to carry attention across a gap that used to be weeks. It is worth noting what an artist chooses to lead with, because the first song released is almost always the most conventional thing on the album. The interesting material tends to sit at track five and beyond.",
  },
  {
    match: /\b(new (song|single|track)|listen to|shares?|drops?|premieres?|unveils?)\b/i,
    text: "A single is an audition now, not an event. It has a few seconds to establish itself before a skip, which is why intros have shortened and hooks keep moving earlier in the arrangement. The question worth asking on a first listen is whether the record still has something to give at ninety seconds — that is the part the format does not reward, and it is the part that determines whether anything is still playing it next year.",
  },
  {
    match: /\b(chart|billboard|hot 100|number one|no\. 1|debuts? at)\b/i,
    text: "Chart positions blend three different behaviors — streaming, radio airplay, and sales — into one number, so two records at the same rank can be doing completely different things. A streaming-heavy hit usually means a concentrated, very online audience. An airplay-heavy one means the song has crossed into general circulation. The second is less dramatic and far more likely to still be around in a year.",
  },
  {
    match: /\b(rap|hip.?hop|drill|MC|verse|freestyle)\b/i,
    text: "Hip-hop's centre of gravity keeps moving regionally, and it moves faster than national coverage tracks it. Brooklyn has been through several distinct eras of this, and the current one is audible on Flatbush and Church Avenue long before it reaches a playlist. The records that last are rarely the ones that chase the prevailing sound; they are the ones that sound like a specific place with a specific rhythm behind them.",
  },
  {
    match: /\b(festival|lineup|headliner|fest\b)/i,
    text: "Festival lineups are the clearest annual read on where the industry thinks the money is, because they are booked far ahead and the bets are public. Look past the headliners: the mid-afternoon slots are where promoters place artists they expect to be bigger next year, and the undercard is usually a more accurate forecast than any of the marketing around the top of the poster.",
  },
  {
    match: /\b(streaming|spotify|royalt|label|catalog|acquisition|lawsuit|copyright|AI)\b/i,
    text: "The economics underneath all of this are worth keeping in view. Recorded music revenue is dominated by streaming, but the per-play rate is small enough that scale is the only route to meaningful income, which pushes artists toward volume, features, and constant release. Every structural story about royalties, catalog sales, or rights is really a story about which artists can afford to keep making records.",
  },
  {
    match: /\b(dies|died|death|obituar|passed away|remembering|tribute)\b/i,
    text: "A catalog changes character when an artist is gone. The records stop being a career in progress and become a fixed body of work, and listening shifts accordingly — people go back to the early material, and the songs that were overlooked at the time frequently turn out to be the ones that lasted. It is a good moment to play something other than the obvious three.",
  },
  {
    match: /\b(film|movie|trailer|series|documentary|soundtrack|TV\b|Netflix|HBO)\b/i,
    text: "Screen placement has become one of the most powerful engines in music, capable of returning a decades-old record to the charts overnight. That gives sync licensing outsized influence over what gets heard, and it rewards a particular kind of song — clear, emotionally legible, and easy to drop under a scene. Worth noticing when a revival is a real re-evaluation and when it is simply a very effective placement.",
  },
  {
    match: /\b(restaurant|pizza|bakery|cafe|bar opens|opening|menu|chef|food)\b/i,
    text: "Food openings read as small news and function as neighborhood infrastructure. A room that stays open late and lets people linger does the same work as a public space, and in a borough with more commercial third places than free ones, that matters more than the menu. The measure of a new place is usually whether people who live within a few blocks end up there on an ordinary Tuesday.",
  },
  {
    match: /\b(rent|housing|development|rezoning|landlord|eviction|affordable)\b/i,
    text: "Housing pressure is the quiet variable behind most cultural change in Brooklyn. Venues, record stores, studios, and rehearsal space all depend on cheap-enough square footage, and when that goes the scene relocates rather than adapts — which is why the borough's musical centre of gravity has moved repeatedly over the past thirty years. Any story about rent is eventually a story about who still gets to make things here.",
  },
  {
    match: /\b(subway|MTA|train|bus|service change|Q line|commute|transit)\b/i,
    text: "Around here the daily rhythm is set by the Q. The Cortelyou Road stop sits on the old Brighton Line, which has been moving people between Flatbush and downtown Brooklyn since the nineteenth century, and almost everything about the avenue's timing follows that schedule — when the coffee line forms, when the sidewalk fills again, which storefronts stay open late.",
  },
  {
    match: /\b(park|prospect park|waterfront|garden|outdoor|greenmarket)\b/i,
    text: "Prospect Park is the organizing fact of a weekend for this part of Brooklyn. Olmsted and Vaux designed it after Central Park and generally thought it the better of the two, and its five hundred-odd acres sit within walking distance of Ditmas Park, Flatbush, Windsor Terrace, and Crown Heights — which is why it works as a shared backyard rather than any one neighborhood's.",
  },
  {
    match: /\b(museum|gallery|exhibition|art|library|BPL|theater|theatre)\b/i,
    text: "Brooklyn's cultural institutions matter most when they are porous — when the late nights and the free programming pull in the people who were already on the block rather than importing a separate audience for the evening. Branch libraries do more of this work than they get credit for, functioning as de facto community centers with meeting rooms, wifi, and staff who actually know the neighborhood.",
  },
  {
    match: /\b(school|community board|volunteer|nonprofit|health|resources|mutual aid)\b/i,
    text: "Ditmas Park sits in Brooklyn Community District 14, and a surprising amount of what visibly changes a neighborhood — street closures, liquor licenses, land use, budget priorities — passes through rooms that are rarely full. Attendance is most of the influence. It is one of the few remaining places where showing up genuinely counts for more than posting about it.",
  },
];

const DEFAULT_CONTEXT = {
  music: "Cortelyou Road Radio covers this the way a station has to: not by ranking everything, but by asking whether a record could actually live in a rotation — whether it survives being followed by something twenty years older, and whether there is a second listen in it. Most releases do not clear that bar, which is exactly why the ones that do are worth naming.",
  ditmas: "This is the layer of neighborhood life a local station is actually for. Not events so much as recognition, repeated — the coffee line, the storefront that has been papered over for months, the block that sounds different in July than it does in February. Ditmas Park was laid out around 1900 as freestanding houses with porches, and that original plan is still why conversation happens on the sidewalk here.",
  brooklyn: "Brooklyn is roughly seventy square miles and about two and a half million people, organized as neighborhoods that do not always feel connected — the subway runs north-south toward Manhattan, so crosstown travel is the weak link. That makes distance a real editorial factor: a recommendation that ignores travel time is aspirational rather than usable, which is why this page stays short and stays close.",
};

function contextParagraph(item, pool) {
  const hay = `${item.title || ""} ${item.contentSnippet || ""} ${item.categories?.join(" ") || ""}`;
  const hit = CONTEXT.find((c) => c.match.test(hay));
  return hit ? hit.text : DEFAULT_CONTEXT[pool] || DEFAULT_CONTEXT.music;
}
function imageFrom(item) {
  const mc = item.mediaContent?.[0]?.$?.url || item.mediaContent?.[0]?.url;
  const mt = item.mediaThumbnail?.[0]?.$?.url || item.mediaThumbnail?.[0]?.url;
  const enc = item.enclosure?.url;
  const inline = (item.contentEncoded || item.content || "").match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  const src = mc || mt || enc || inline;
  return src ? { src, alt: clean(item.title || "", 120), credit: null } : null;
}
function normalize(item, tag, source, pool) {
  // Outlet excerpt (credited + linked) followed by the station's own context.
  const excerpt = excerptParagraphs(item);
  const bodyParagraphs = [...excerpt, contextParagraph(item, pool)];
  return {
    tag,
    title: clean(item.title || "Untitled", 160),
    summary: clean(item.contentSnippet || item.content || "", 200),
    // `body` stays for any older consumer; `bodyParagraphs` is what the story
    // page renders.
    body: bodyParagraphs.join("\n\n"),
    bodyParagraphs,
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

async function pull(group, pool) {
  const results = await Promise.allSettled(group.feeds.map((f) => withTimeout(parser.parseURL(f.url), 12000).then((feed) => ({ feed, source: f.source }))));
  let items = [];
  for (const r of results) {
    if (r.status === "fulfilled" && r.value.feed?.items?.length) {
      items.push(...r.value.feed.items.map((it) => normalize(it, group.tag, r.value.source, pool)));
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
      const items = await pull(group, pool);
      if (items.length) {
        content[pool] = items;
        const avg = Math.round(
          items.reduce((n, it) => n + it.bodyParagraphs.join(" ").split(/\s+/).length, 0) / items.length,
        );
        console.log(`  ${items.length} fresh items (avg ${avg} words / ~${Math.round((avg / 230) * 60)}s read)`);
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
