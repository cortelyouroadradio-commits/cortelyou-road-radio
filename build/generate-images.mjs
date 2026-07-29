/**
 * Cortelyou Road Radio — automatic artwork for Today in Music History
 * ------------------------------------------------------------------
 * Looks at the next N days. For any day that has no image yet, it generates
 * one from that entry's prompt and saves it as assets/history/MM-DD.jpg.
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

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "assets", "history");
const PROMPTS = join(__dirname, "history", "image-prompts.csv");

const DAYS_AHEAD = Number(process.env.DAYS_AHEAD || 7);
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

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const rows = parseCSV(await readFile(PROMPTS, "utf8"));
  const byDate = Object.fromEntries(rows.map(r => [r.date, r]));

  let made = 0, skipped = 0, failed = 0;
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const key = keyFor(i);
    const row = byDate[key];
    if (!row) { console.log(`· ${key}  no prompt on file`); continue; }

    const already = (await Promise.all(
      ["jpg", "jpeg", "png", "webp"].map(x => exists(join(OUT_DIR, `${key}.${x}`)))
    )).some(Boolean);
    if (already) { console.log(`· ${key}  already has art`); skipped++; continue; }

    const seed = [...key].reduce((a, c) => a + c.charCodeAt(0), 0) * 7 + i;
    process.stdout.write(`▸ ${key}  generating… `);
    try {
      const buf = await generate(row.prompt, seed);
      await writeFile(join(OUT_DIR, `${key}.jpg`), buf);
      console.log(`ok (${Math.round(buf.length / 1024)} KB) — ${row.title.slice(0, 52)}`);
      made++;
      await sleep(4000);            // be a good neighbour to a free service
    } catch (e) {
      console.log("failed: " + e.message + "  (scene artwork will be used)");
      failed++;
    }
  }
  console.log(`\nDone. created=${made} existing=${skipped} failed=${failed}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(0); });
