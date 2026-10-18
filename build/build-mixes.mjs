#!/usr/bin/env node
/**
 * build-mixes.mjs — one data file, every mix surface.
 *
 * Reads build/mixes.json and regenerates:
 *   - mixes.html            the cards (between MIXES:START/END) + ItemList JSON-LD
 *   - mix/<slug>.html       one SEO page per mix: player, tracklist, facts,
 *                           VideoObject + key-moment Clip + Breadcrumb schema
 *   - index.html            the "Latest mixes" strip and the ticker
 *   - sitemap.xml           mix pages added, /mixes lastmod bumped
 *
 * To add a mix: put a new object at the TOP of mixes.json and run
 *   node build/build-mixes.mjs
 * Netlify also runs it on every deploy (see build/package.json).
 * It never touches anything outside the marked regions.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://cortelyouroadradio.com";
const LOGO = `${SITE}/assets/logo-512.jpg`;
const data = JSON.parse(readFileSync(join(ROOT, "build", "mixes.json"), "utf8"));
const mixes = data.mixes;
const CHANNEL = data.channel;
const bySlug = Object.fromEntries(mixes.map((m) => [m.slug, m]));

/* ---------------- helpers ---------------- */
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const isoDur = (s) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return `PT${h ? h + "H" : ""}${m}M${x}S`; };
const clock = (s) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = String(s % 60).padStart(2, "0"); return h ? `${h}:${String(m).padStart(2, "0")}:${x}` : `${m}:${x}`; };
const toSec = (t) => t.split(":").map(Number).reduce((a, n) => a * 60 + n, 0);
const minutesWord = (s) => {
  const n = Math.round(s / 60);
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy"];
  if (n < 20) return ones[n];
  return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "");
};
const niceDate = (iso) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" });
const ymd = (iso) => new Date(iso).toISOString().slice(0, 10);
const thumb = (id, q = "maxresdefault") => `https://i.ytimg.com/vi/${id}/${q}.jpg`;
const watch = (id, t) => `https://www.youtube.com/watch?v=${id}${t ? `&t=${t}s` : ""}`;
const pageUrl = (m) => `${SITE}/mix/${m.slug}`;
const posterImg = (m, cls, lazy = true) =>
  `<img class="${cls}" src="${thumb(m.id)}" onerror="this.onerror=null;this.src='${thumb(m.id, "hqdefault")}';" alt="${esc(m.alt)}"${lazy ? ' loading="lazy"' : ""} width="1280" height="720" />`;
const playSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const json = (o) => JSON.stringify(o, null, 2).replace(/</g, "\\u003c");

function replaceRegion(html, name, inner, file) {
  const re = new RegExp(`(<!-- ${name}:START[^>]*-->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!re.test(html)) throw new Error(`${file}: missing <!-- ${name}:START --> / <!-- ${name}:END --> markers`);
  return html.replace(re, `$1\n${inner}\n$2`);
}

/* ---------------- shared building blocks ---------------- */
function mixPlayer(m, { badge = false, lazy = true } = {}) {
  return `<div class="mix-player"
           data-yt="${m.id}"
           data-mix-title="${esc(m.title)} — Cortelyou Road Radio">
        ${badge ? '<span class="mix-badge">New Drop</span>\n        ' : ""}${posterImg(m, "mix-poster", lazy)}
        <span class="mix-shade"></span>
        <button class="mix-play" aria-label="Play the ${esc(m.title)} mix">
          ${playSvg}
        </button>
        <span class="mix-dur">${esc(m.dur)}</span>
      </div>`;
}

/** Small card used on the homepage strip and in "Listen next". */
function mixCard(m, label) {
  const flag = label ? `<span class="mx-flag">${esc(label)}</span>` : "";
  return `<a class="mx-card" href="/mix/${m.slug}">
      <span class="mx-thumb">${posterImg(m, "mx-img")}<span class="mx-play" aria-hidden="true">${playSvg}</span><span class="mix-dur">${esc(m.dur)}</span>${flag}</span>
      <span class="mx-body">
        <span class="kicker">${esc(m.genre)}</span>
        <span class="mx-title">${esc(m.title)}</span>
        <span class="mx-artists">${esc(m.chips.slice(0, 3).join(" · "))}</span>
      </span>
    </a>`;
}

function videoObject(m, withParts) {
  const o = {
    "@type": "VideoObject",
    "@id": `${pageUrl(m)}#video`,
    name: m.title,
    description: m.blurb,
    thumbnailUrl: [thumb(m.id), thumb(m.id, "hqdefault")],
    uploadDate: m.uploadDate,
    duration: isoDur(m.lengthSeconds),
    embedUrl: `https://www.youtube.com/embed/${m.id}`,
    contentUrl: watch(m.id),
    url: pageUrl(m),
    genre: m.genre,
    keywords: (m.keywords || []).join(", "),
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "Cortelyou Road Radio", url: SITE, logo: { "@type": "ImageObject", url: LOGO } },
  };
  if (withParts && m.tracklist.length) {
    o.hasPart = m.tracklist.map((t, i) => {
      const start = toSec(t.t);
      const end = i + 1 < m.tracklist.length ? toSec(m.tracklist[i + 1].t) : m.lengthSeconds;
      return {
        "@type": "Clip",
        name: t.artist ? `${t.artist} – ${t.title}` : t.title,
        startOffset: start,
        endOffset: end,
        url: watch(m.id, start),
      };
    });
  }
  return o;
}

/* ---------------- 1. mixes.html ---------------- */
function buildMixesPage() {
  const file = join(ROOT, "mixes.html");
  let html = readFileSync(file, "utf8");

  const cards = mixes.map((m, i) => {
    const newest = i === 0;
    return `  <!-- ${esc(m.title)} -->
  <div class="mix-feature${i % 2 ? " rev" : ""} reveal" id="${m.slug}">
    <div class="mix-stage">
      ${mixPlayer(m, { badge: newest })}
    </div>
    <div class="mix-meta">
      <span class="kicker genre">${esc(m.genre)}${newest ? " · Latest mix" : m.featured ? ` · ${esc(m.featured)}` : ""}</span>
      <h2><a href="/mix/${m.slug}">${esc(m.title)}</a></h2>
      <p>${esc(m.blurb)}</p>
      <div class="mix-chips">
${m.chips.map((c) => `        <span class="mix-chip">${esc(c)}</span>`).join("\n")}
      </div>
      <div class="mix-actions">
        <a class="btn-live" href="/mix/${m.slug}">${m.tracklist.length ? "Tracklist &amp; details" : "Mix details"}</a>
        <a class="btn-ghost" href="${watch(m.id)}" target="_blank" rel="noopener">Watch on YouTube</a>
      </div>
    </div>
  </div>`;
  }).join("\n\n");
  html = replaceRegion(html, "MIXES", cards, "mixes.html");

  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cortelyou Road Radio — DJ Mixes",
    description: "Long-play DJ mixes from Cortelyou Road Radio, curated in Ditmas Park, Brooklyn.",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: mixes.length,
    itemListElement: mixes.map((m, i) => ({ "@type": "ListItem", position: i + 1, url: pageUrl(m), item: videoObject(m, false) })),
  };
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${json(ld)}\n</script>`);

  const genres = [...new Set(mixes.map((m) => m.genre.split(/\s*\/\s*/)[0]))].slice(0, 6).join(", ");
  const desc = `${mixes.length} long-play DJ mixes from Cortelyou Road Radio in Ditmas Park, Brooklyn — ${genres} and more. Full tracklists, free to stream.`;
  html = html
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/<title>[^<]*<\/title>/, "<title>DJ Mixes: Funk, Hip-Hop, R&amp;B, Reggae &amp; More | Cortelyou Road Radio</title>")
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${thumb(mixes[0].id)}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${thumb(mixes[0].id)}$2`);
  writeFileSync(file, html);
}

/* ---------------- 2. one page per mix ---------------- */
function shell() {
  // Header, footer and sticky player come from mixes.html so nav edits there
  // flow into every mix page on the next build.
  const src = readFileSync(join(ROOT, "mixes.html"), "utf8");
  const header = src.match(/<header>[\s\S]*?<\/header>/)[0];
  const tail = src.match(/<footer class="site">[\s\S]*<\/html>/)[0];
  const fonts = src.match(/<link rel="preconnect"[\s\S]*?<link rel="stylesheet" href="\/styles.css" \/>/)[0];
  return { header, tail, fonts };
}

function buildMixPage(m, i, sh) {
  const runtimeWords = minutesWord(m.lengthSeconds);
  const n = m.tracklist.length;
  const first = m.tracklist[0], last = m.tracklist[n - 1];
  const name = (t) => (t.artist ? `${t.artist}'s “${t.title}”` : `“${t.title}”`);
  const about = n
    ? `${m.title} is a ${runtimeWords}-minute ${m.genre.toLowerCase()} DJ mix from Cortelyou Road Radio, mixed in Ditmas Park, Brooklyn. It runs ${n} tracks nonstop, opening with ${name(first)} and closing on ${name(last)}, with no talking over the records.`
    : `${m.title} is a ${runtimeWords}-minute ${m.genre.toLowerCase()} DJ mix from Cortelyou Road Radio, mixed in Ditmas Park, Brooklyn, and blended nonstop with no talking over the records.`;
  const related = (m.related || []).map((s) => bySlug[s]).filter(Boolean);
  const prev = mixes[i + 1], next = mixes[i - 1];
  const title = `${m.seoTitle} | Cortelyou Road Radio`;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      videoObject(m, true),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Mixes", item: `${SITE}/mixes` },
          { "@type": "ListItem", position: 3, name: m.title, item: pageUrl(m) },
        ],
      },
    ],
  };

  const tracks = n
    ? `<section class="block wrap mix-tracks" aria-labelledby="tl-h">
  <div class="head-row">
    <div><span class="kicker">${n} tracks · ${esc(m.dur)}</span><h2 class="display" id="tl-h">Full tracklist</h2></div>
    <a class="see" href="${watch(m.id)}" target="_blank" rel="noopener">Open on YouTube →</a>
  </div>
  <ol class="tracklist">
${m.tracklist.map((t) => {
      const s = toSec(t.t);
      return `    <li><a class="tl-time" href="${esc(watch(m.id, s))}" target="_blank" rel="noopener" aria-label="Play from ${esc(t.t)}">${esc(t.t)}</a><span class="tl-artist">${esc(t.artist || "—")}</span><span class="tl-song">${esc(t.title)}</span></li>`;
    }).join("\n")}
  </ol>
  <p class="tl-note">Tap a timestamp to jump straight to that record on YouTube. All music belongs to its respective rights holders.</p>
</section>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(m.seoDescription)}" />
<meta name="keywords" content="${esc((m.keywords || []).join(", "))}" />
<meta name="theme-color" content="#0b0a09" />
<link rel="canonical" href="${pageUrl(m)}" />
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
<meta property="og:site_name" content="Cortelyou Road Radio" />
<meta property="og:type" content="video.other" />
<meta property="og:title" content="${esc(m.seoTitle)}" />
<meta property="og:description" content="${esc(m.seoDescription)}" />
<meta property="og:url" content="${pageUrl(m)}" />
<meta property="og:image" content="${thumb(m.id)}" />
<meta property="og:image:width" content="1280" />
<meta property="og:image:height" content="720" />
<meta property="og:video" content="https://www.youtube.com/embed/${m.id}" />
<meta property="video:duration" content="${m.lengthSeconds}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(m.seoTitle)}" />
<meta name="twitter:description" content="${esc(m.seoDescription)}" />
<meta name="twitter:image" content="${thumb(m.id)}" />
${sh.fonts}
<script type="application/ld+json">
${json(ld)}
</script>
</head>
<body data-page="section" data-section="mix">

${sh.header}

<div class="page-hero mix-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/mixes">Mixes</a><span aria-hidden="true">/</span><span aria-current="page">${esc(m.title)}</span></nav>
    <div class="mix-feature mix-solo">
      <div class="mix-stage">
        ${mixPlayer(m, { badge: i === 0, lazy: false })}
      </div>
      <div class="mix-meta">
        <span class="kicker genre">${esc(m.genre)}${i === 0 ? " · Latest mix" : m.featured ? ` · ${esc(m.featured)}` : ""}</span>
        <h1>${esc(m.title)}</h1>
        <p>${esc(m.blurb)}</p>
        <div class="mix-chips">
${m.chips.map((c) => `          <span class="mix-chip">${esc(c)}</span>`).join("\n")}
        </div>
        <div class="mix-actions">
          <a class="btn-live" href="${watch(m.id)}" target="_blank" rel="noopener">Watch on YouTube</a>
          <a class="btn-ghost" href="${CHANNEL}?sub_confirmation=1" target="_blank" rel="noopener">Subscribe</a>
        </div>
      </div>
    </div>
  </div>
</div>

<section class="block wrap mix-about" style="padding-top:8px;">
  <div class="mix-about-grid">
    <div>
      <span class="kicker">About this mix</span>
      <p class="mix-about-text">${esc(about)}</p>
    </div>
    <dl class="mix-facts">
      <div><dt>Runtime</dt><dd>${esc(m.dur)}</dd></div>
      <div><dt>Tracks</dt><dd>${n || "Nonstop"}</dd></div>
      <div><dt>Released</dt><dd><time datetime="${ymd(m.uploadDate)}">${niceDate(m.uploadDate)}</time></dd></div>
      <div><dt>Mixed in</dt><dd>Ditmas Park, Brooklyn</dd></div>
    </dl>
  </div>
</section>

${tracks}

<section class="block wrap" style="padding-top:0;">
  <div class="head-row">
    <div><span class="kicker">Keep it going</span><h2 class="display">Listen next</h2></div>
    <a class="see" href="/mixes">All mixes →</a>
  </div>
  <div class="mx-grid mx-grid-3">
${related.map((r) => "    " + mixCard(r, r.featured)).join("\n")}
  </div>
  <nav class="mix-pager" aria-label="More mixes">
    ${prev ? `<a href="/mix/${prev.slug}"><span>← Older</span><b>${esc(prev.title)}</b></a>` : "<span></span>"}
    ${next ? `<a class="next" href="/mix/${next.slug}"><span>Newer →</span><b>${esc(next.title)}</b></a>` : "<span></span>"}
  </nav>
</section>

<section class="mix-cta">
  <div class="block wrap">
    <div class="panel">
      <div>
        <span class="kicker">New mix every week</span>
        <h3 class="display">Never miss a drop</h3>
        <p style="margin-bottom:0;">Subscribe on YouTube for every new Cortelyou Road Radio mix, or tune in to the live stream right now.</p>
      </div>
      <div class="mix-actions">
        <a class="btn-live" href="${CHANNEL}?sub_confirmation=1" target="_blank" rel="noopener">Subscribe on YouTube</a>
        <a class="btn-ghost" href="/listen-live">Listen live</a>
      </div>
    </div>
  </div>
</section>

${sh.tail}
`;
  mkdirSync(join(ROOT, "mix"), { recursive: true });
  writeFileSync(join(ROOT, "mix", `${m.slug}.html`), html);
}

/* ---------------- 3. homepage strip + ticker ---------------- */
function buildHome() {
  const file = join(ROOT, "index.html");
  let html = readFileSync(file, "utf8");
  const featured = mixes.find((m) => m.featured);
  const picks = mixes.slice(0, 3);
  if (featured && !picks.includes(featured)) picks.push(featured);
  else if (mixes[3]) picks.push(mixes[3]);

  const strip = `<section class="block wrap home-mixes">
  <div class="head-row">
    <div><span class="kicker">Fresh off the decks</span><h2 class="display">Latest DJ mixes</h2></div>
    <div class="head-meta">
      <a class="see" href="${CHANNEL}?sub_confirmation=1" target="_blank" rel="noopener">Subscribe</a>
      <a class="see" href="/mixes">All ${mixes.length} mixes →</a>
    </div>
  </div>
  <div class="mx-grid mx-grid-4">
${picks.map((m, i) => "    " + mixCard(m, i === 0 ? "New drop" : m.featured)).join("\n")}
  </div>
</section>`;
  html = replaceRegion(html, "LATEST-MIXES", strip, "index.html");

  // The ticker used to be hand-typed event listings that went stale within a
  // week. Now it is generated from the mix catalog, so it is always current.
  const latest = mixes[0];
  const items = [
    `<a href="/mix/${latest.slug}"><b>New mix:</b> ${esc(latest.title)} — ${esc(latest.chips.slice(0, 3).join(", "))}</a>`,
    featured ? `<a href="/mix/${featured.slug}"><b>Most played:</b> ${esc(featured.title)}</a>` : "",
    ...mixes.slice(1, 3).map((m) => `<a href="/mix/${m.slug}"><b>${esc(m.title)}</b> — ${esc(m.dur)} nonstop</a>`),
    `<a href="/music-history"><b>Today in Music History</b> — a new story every morning</a>`,
    `<a href="/ditmas-park#playlist-call"><b>Your block on air</b> — send us a Ditmas playlist</a>`,
  ].filter(Boolean);
  const ticker = [
    ...items.map((s) => `        <span>${s}</span>`),
    ...items.map((s) => `        <span aria-hidden="true">${s.replace("<a ", '<a tabindex="-1" ')}</span>`),
  ].join("\n");
  html = replaceRegion(html, "TICKER", ticker, "index.html");
  writeFileSync(file, html);
}

/* ---------------- 4. sitemap ---------------- */
function buildSitemap() {
  const file = join(ROOT, "sitemap.xml");
  let xml = readFileSync(file, "utf8");
  // Drop previously generated mix entries, then re-add.
  xml = xml.replace(/\s*<url>\s*<loc>https:\/\/cortelyouroadradio\.com\/mix\/[\s\S]*?<\/url>/g, "");
  const newest = ymd(mixes[0].uploadDate);
  xml = xml.replace(/(<loc>https:\/\/cortelyouroadradio\.com\/mixes<\/loc>\s*<lastmod>)[^<]*/, `$1${newest}`);
  const entries = mixes.map((m) => `  <url>
    <loc>${pageUrl(m)}</loc>
    <lastmod>${ymd(m.uploadDate)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <video:video>
      <video:thumbnail_loc>${thumb(m.id)}</video:thumbnail_loc>
      <video:title>${esc(m.title)}</video:title>
      <video:description>${esc(m.seoDescription)}</video:description>
      <video:player_loc>https://www.youtube.com/embed/${m.id}</video:player_loc>
      <video:duration>${m.lengthSeconds}</video:duration>
      <video:publication_date>${m.uploadDate}</video:publication_date>
    </video:video>
  </url>`).join("\n");
  if (!xml.includes('xmlns:video=')) xml = xml.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">');
  xml = xml.replace(/\s*<\/urlset>\s*$/, `\n${entries}\n</urlset>\n`);
  writeFileSync(file, xml);
}

/* ---------------- run ---------------- */
for (const m of mixes) {
  for (const k of ["id", "slug", "title", "genre", "blurb", "chips", "alt", "dur", "lengthSeconds", "uploadDate"]) {
    if (m[k] === undefined || m[k] === "") throw new Error(`mixes.json: "${m.title || m.id}" is missing "${k}"`);
  }
  if (m.chips.length !== 4) throw new Error(`mixes.json: "${m.title}" needs exactly 4 chips`);
}
buildMixesPage();
const sh = shell();
mixes.forEach((m, i) => buildMixPage(m, i, sh));
buildHome();
buildSitemap();
console.log(`build-mixes: ${mixes.length} mixes → mixes.html, ${mixes.length} mix pages, homepage strip, ticker, sitemap.`);
