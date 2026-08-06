/**
 * Cortelyou Road Radio — automatic artwork for Today in Music History
 * ------------------------------------------------------------------
 * Looks at the next N days. For any day that has no image yet, it generates
 * one for that entry and saves it as assets/history/MM-DD.jpg.
 *
 * The prompt is built at generation time by history/prompt-builder.mjs from the
 * entry's own title and story, so the artwork depicts that day's actual moment.
 * The `prompt` column in image-prompts.csv is legacy: it was derived from only
 * the year and a stock scene keyword, which is why the art used to be generic.
 * It is ignored unless PROMPT_SOURCE=csv is set.
 *
 * Uses Pollinations.ai: free, no account, no API key, no billing.
 * If a generation fails the day is simply skipped — the site falls back to its
 * animated illustrated scene, so nothing ever breaks or shows a blank box.
 *
 * Optional: set POLLINATIONS_TOKEN in the environment for higher rate limits.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildPrompt } from "./history/prompt-builder.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "assets", "history");
const PROMPTS = join(__dirname, "history", "image-prompts.csv");

const DAYS_AHEAD = Number(process.env.DAYS_AHEAD || 7);
// FILL_ALL=1 walks the whole 366-day calendar and fills every date that has no
// art yet, oldest gap first. Use it to backfill the archive; the daily job
// leaves it unset and only looks at the next DAYS_AHEAD days.
const FILL_ALL = process.env.FILL_ALL === "1";
// Cap per run so a backfill can be done in sessions and never hammers a free
// service for hours unattended. Set MAX_PER_RUN=0 for no cap.
const MAX_PER_RUN = process.env.MAX_PER_RUN === undefined ? 40 : Number(process.env.MAX_PER_RUN);
const RETRIES = Number(process.env.RETRIES || 2);
// "builder" (default) derives the prompt from the entry's title and story.
// "csv" restores the old year+keyword prompts, kept only as an escape hatch.
const PROMPT_SOURCE = process.env.PROMPT_SOURCE || "builder";
const WIDTH = 1600, HEIGHT = 900;
const MIN_BYTES = 20000;

/* --- tiny CSV reader (handles quoted fields) --- */
function parseCSV(text) {
  const rows = []; let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  const head = rows.shift();
  return rows.filter(r => r.length === head.length).map(r =>
    Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

const exists = (p) => access(p).then(() => true).catch(() => false);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function keyFor(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

async function generate(prompt, seed) {
  const base = "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt);
  const url = `${base}?width=${WIDTH}&height=${HEIGHT}&model=flux&nologo=true&seed=${seed}`;
  const headers = { "User-Agent": "CortelyouRoadRadio/1.0 (+https://cortelyouroadradio.com)" };
  if (process.env.POLLINATIONS_TOKEN) headers.Authorization = `Bearer ${process.env.POLLINATIONS_TOKEN}`;

  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 180000);
  try {
    const res = await fetch(url, { headers, signal: ctl.signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const type = res.headers.get("content-type") || "";
    if (!type.startsWith("image/")) throw new Error("not an image (" + type + ")");
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < MIN_BYTES) throw new Error("suspiciously small (" + buf.length + "b)");
    return buf;
  } finally { clearTimeout(timer); }
}

const hasArt = async (key) => (await Promise.all(
  ["jpg", "jpeg", "png", "webp"].map(x => exists(join(OUT_DIR, `${key}.${x}`)))
)).some(Boolean);

/** Dates to consider, in order: the next N days, or the whole calendar. */
function targetKeys(byDate) {
  if (!FILL_ALL) return Array.from({ length: DAYS_AHEAD }, (_, i) => keyFor(i));
  // Start from today so the soonest gaps are filled first, then wrap around.
  const all = Object.keys(byDate).sort();
  const today = keyFor(0);
  const at = all.findIndex(k => k >= today);
  const start = at === -1 ? 0 : at;
  return [...all.slice(start), ...all.slice(0, start)];
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const rows = parseCSV(await readFile(PROMPTS, "utf8"));
  const byDate = Object.fromEntries(rows.map(r => [r.date, r]));

  const keys = targetKeys(byDate);
  let made = 0, skipped = 0, failed = 0;

  for (const key of keys) {
    if (MAX_PER_RUN && made >= MAX_PER_RUN) {
      console.log(`\nReached MAX_PER_RUN=${MAX_PER_RUN}; stopping. Run again to continue.`);
      break;
    }
    const row = byDate[key];
    if (!row) { console.log(`· ${key}  no prompt on file`); continue; }
    if (await hasArt(key)) { skipped++; if (!FILL_ALL) console.log(`· ${key}  already has art`); continue; }

    const baseSeed = [...key].reduce((a, c) => a + c.charCodeAt(0), 0) * 7;
    // Derived from the entry's own subject; see history/prompt-builder.mjs.
    const prompt = PROMPT_SOURCE === "csv" ? row.prompt : buildPrompt(row);
    process.stdout.write(`▸ ${key}  generating… `);

    let ok = false;
    for (let attempt = 0; attempt <= RETRIES && !ok; attempt++) {
      try {
        const buf = await generate(prompt, baseSeed + attempt);
        await writeFile(join(OUT_DIR, `${key}.jpg`), buf);
        console.log(`ok (${Math.round(buf.length / 1024)} KB) — ${row.title.slice(0, 52)}`);
        made++; ok = true;
        await sleep(4000);          // be a good neighbour to a free service
      } catch (e) {
        if (attempt < RETRIES) {
          process.stdout.write(`retry ${attempt + 1}… `);
          await sleep(8000 * (attempt + 1));   // back off before trying again
        } else {
          console.log("failed: " + e.message + "  (scene artwork will be used)");
          failed++;
        }
      }
    }
  }

  const remaining = FILL_ALL
    ? (await Promise.all(Object.keys(byDate).map(async k => (await hasArt(k)) ? 0 : 1))).reduce((a, b) => a + b, 0)
    : null;
  console.log(`\nDone. created=${made} existing=${skipped} failed=${failed}`);
  if (remaining !== null) console.log(`Calendar days still without art: ${remaining}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(0); });
