/* ============================================================
   Cortelyou Road Radio — player + content engine
   ============================================================ */
const RADIO_STATUS = "https://public.radio.co/stations/s82969a5e0/status";
const ART = (name) => `./assets/${name}.svg`;

/* ---------- Content pools (fallback / built-in) ---------- */
const pools = {
  music: [
    { tag: "Cover Story", title: "Why the cleanest read on the week still comes from the songs people replay", summary: "Three artists, three temperatures, and a better sense of what listeners carry from one day into the next.", body: "The point of a daily music front page isn't just to name what's big. It's to show why certain artists hold attention and why some releases keep living past the first rush.", art: "editorial-music-pulse" },
    { tag: "Artist Watch", title: "The records landing now feel lighter on their feet than the headlines suggest", summary: "More playable in a daily station mix than the louder release-cycle noise implies.", body: "That mix of familiarity and ease is exactly why some artists stay useful to a station page. They still create moments that sound right in sequence.", art: "editorial-artist" },
    { tag: "On Air", title: "What a good transition sounds like when a station trusts its room", summary: "The small art of moving from groove to groove without losing the room.", body: "Transitions are where radio shows its hand — whether someone is really listening, and whether they understand the emotional shape of the next track.", art: "editorial-station" },
    { tag: "Scene Notes", title: "The quieter songs that still carry enough shape to stop the scroll", summary: "Texture and immediacy tend to outlast a fast viral spike.", body: "Not everything on a music page needs to shout. Some things just keep sounding better on the second play.", art: "editorial-music-business" },
    { tag: "Artist Radar", title: "The artists people want to argue about and replay at the same time", summary: "Volatility, presence, and repeat-listen curiosity — exactly what a daily desk rewards.", body: "The strongest artist coverage gives a reader a sense of momentum: not just who is visible, but who feels alive enough to pull people back in.", art: "editorial-music-pulse" },
  ],
  chart: [
    { tag: "Chart Pulse", title: "The record still popping up in group chats, car rides, and quick replays", summary: "A tighter read on what feels biggest right now, without losing the station's taste.", body: "The records that keep floating back into daily use usually have more staying power than the charts alone can explain.", art: "editorial-music-pulse" },
    { tag: "Popular Now", title: "Familiar enough to hit fast, strong enough to keep the station moving", summary: "There's a difference between overexposed and genuinely replayable.", body: "This slot is for tracks people actually put back on, not just the ones everyone has heard.", art: "editorial-artist" },
    { tag: "High Rotation", title: "The tracks holding on because they keep sounding better in context", summary: "What continues to work once the first spike of attention passes.", body: "A chart rail on a local station should still have standards. These are the songs earning their spins.", art: "editorial-music-business" },
    { tag: "Street Temperature", title: "Where broad attention and local curiosity overlap", summary: "The records that feel both current and socially useful.", body: "Some artists become visible everywhere. The more interesting question is which ones sound right on a neighborhood station.", art: "editorial-station" },
  ],
  newReleases: [
    { tag: "Fresh Drop", title: "New releases built for repeat listens, not just reaction", summary: "Not every release deserves a slot; these feel like they could live on the station.", body: "The best new-release coverage is selective — playable, memorable, and image-led enough to anchor the day.", art: "editorial-music-business" },
    { tag: "Release Radar", title: "The songs worth leaving on long enough to understand", summary: "New music should feel like discovery rather than inventory.", body: "This module is meant to slow you down a little and reward a full listen instead of a quick skip.", art: "editorial-music-pulse" },
    { tag: "Album Cut", title: "The cuts that sound better once the release-cycle noise dies down", summary: "Fresh songs that hold up away from launch-day hype.", body: "A useful local station can filter the release rush and point listeners toward songs that keep growing.", art: "editorial-artist" },
    { tag: "First Listen", title: "Immediate, cleaner than expected, and easy to put back on", summary: "A more human version of new-music discovery.", body: "It's not about completeness. It's about curation, context, and what actually deserves a repeat spin.", art: "editorial-rewind" },
  ],
  artist: [
    { tag: "Brooklyn Artist Watch", title: "The most visually alive artist in the room right now", summary: "Work rooted enough to feel nearby, polished enough to travel.", body: "Artist Watch works best when the energy is legible. The artist has to look like someone worth opening.", art: "editorial-artist" },
    { tag: "Brooklyn Artist Watch", title: "An artist with room to travel block to block", summary: "A local radar rail with actual editorial intent.", body: "This section supports the station's role as a cultural filter — artists whose records still sound human in sequence.", art: "editorial-music-pulse" },
    { tag: "Brooklyn Artist Watch", title: "Knows how to make a polished image feel useful", summary: "Artists who still sound like they know where they're from.", body: "The point is to make the site feel like a place where music culture is watched, not simply mentioned.", art: "editorial-station" },
  ],
  ditmas: [
    { tag: "Neighborhood", title: "Avenue coffee lines, stoop chatter, and the early pulse on Cortelyou", summary: "The neighborhood is at its best when small routines become shared atmosphere.", body: "A useful local station pays attention to this layer of life: the coffee line, the corner hello, the store window people keep glancing at.", art: "editorial-ditmas-neighborhood" },
    { tag: "Community Board", title: "The week ahead in Ditmas Park feels especially full of local energy", summary: "School events, live sets, and sidewalk conversations that spill into the evening.", body: "The value here is relevance, not volume — enough signal to know what matters without drowning the reader in clutter.", art: "editorial-public-space" },
    { tag: "Street Rhythm", title: "What people are talking about between Stratford and Marlborough", summary: "Transit timing, store windows, and neighborhood plans shape the mood before breakfast ends.", body: "When local media works, it captures the emotional weather of a place as much as the facts.", art: "editorial-ditmas-neighborhood" },
    { tag: "Local Voices", title: "Neighbors keep asking for more shared cultural space", summary: "Playlist calls, events, and shout-outs are becoming part of the local rhythm.", body: "That's the loop a hometown platform should create: the station reflects the neighborhood, and the neighborhood hears itself reflected back.", art: "editorial-station" },
  ],
  brooklyn: [
    { tag: "Featured Event", title: "Tonight's borough calendar leans intimate, local, and low-friction", summary: "Small rooms and neighborhood stages are carrying the city's best energy right now.", body: "The strongest borough-wide picks aren't always the loudest — they're the ones that still feel human in scale and close to the station's taste.", art: "editorial-brooklyn-culture" },
    { tag: "Brooklyn Notes", title: "What feels worth crossing the parkway for this week", summary: "A short list of happenings aligned with the station's taste and pace.", body: "The idea isn't to become a giant events calendar. It's to give listeners a few well-chosen reasons to go out.", art: "editorial-public-space" },
    { tag: "Community Culture", title: "Brooklyn's best public moments still happen at human scale", summary: "Often it's not the biggest event that sticks — it's the one closest to home.", body: "That instinct keeps the site from feeling generic and supports a more shareable kind of local recommendation.", art: "editorial-brooklyn-culture" },
    { tag: "Weekend Ahead", title: "The event mix is strongest when music and neighborhood life overlap", summary: "Markets, park gatherings, and sets with personality are what people remember.", body: "The best local planning advice suggests where atmosphere, convenience, and personality intersect.", art: "editorial-public-space" },
  ],
  weekend: [
    { tag: "Weekend Pick", title: "A low-friction night out that still feels worth leaving home for", summary: "A small room, a good crowd, and enough atmosphere to make the trip count.", body: "Weekend coverage works best when it's selective and emotionally legible — help listeners make one or two good decisions quickly.", art: "editorial-brooklyn-culture" },
    { tag: "Weekend Pick", title: "One borough plan that feels social without feeling overpacked", summary: "A cultural pick with the station's pacing and mood in mind.", body: "Some of the most effective picks are simply the ones that feel easy to join and easy to remember.", art: "editorial-public-space" },
    { tag: "Weekend Pick", title: "A music-first pick that still leaves room for the rest of the day", summary: "A recommendation designed around real life, not a full-day commitment.", body: "The lower the friction and the stronger the fit, the more the audience trusts the next recommendation.", art: "editorial-music-pulse" },
  ],
  nowSpinning: [
    { tag: "Fresh Drop", title: "New releases built for repeat listens, not reaction", summary: "Selective by design — playable and memorable.", body: "The rail foregrounds tracks that feel like they could actually live on the station.", art: "editorial-music-pulse" },
    { tag: "Throwback", title: "Vote: which rewind should hit the station harder today?", summary: "A little memory, a little participation.", body: "Throwbacks are one of the easiest ways to make a station feel social — recognition, shared taste, a reason to tap back in tomorrow.", art: "editorial-rewind" },
    { tag: "Decade Favorite", title: "90s favorites that still carry a whole room", summary: "The records that remain instantly communal.", body: "Decade rails let the station organize memory without flattening it — songs that still feel lived-in and generous.", art: "editorial-rewind" },
  ],
  history: [
    { tag: "Daily Fact", title: "Radio DJs once broke records block by block before charts caught up", summary: "Local stations moved songs through neighborhoods long before national momentum formed.", body: "It's a reminder that local taste has always shaped larger music culture, and that geography is part of what makes community radio memorable.", art: "editorial-station" },
    { tag: "Daily Fact", title: "Neighborhood record stores used to work like live editorial feeds", summary: "New arrivals, staff picks, and requests created a real-time cultural signal.", body: "Cortelyou Road Radio borrows that idea: selection with a point of view. Good local music media helps listeners make sense of a place through sound.", art: "editorial-rewind" },
  ],
};

const briefing = {
  intro: "Today starts with live radio up front, neighborhood notes in the middle, and a few reasons to step out before the day hardens into routine.",
  bullets: [
    ["Music", "the mood stays warm, rhythmic, and listener-first."],
    ["Ditmas Park", "keep an eye on local conversations, storefronts, and community buzz."],
    ["Brooklyn", "there's enough happening tonight to make checking back worth it."],
    ["Station note", "we're looking for playlists from neighbors, shops, and local institutions."],
  ],
};

const fallbackRecent = [
  ["Young and Alive", "Bazzi"], ["Thank You", "Dido"],
  ["Redbone", "Childish Gambino"], ["Consider Me", "Allen Stone"], ["Underdog", "Alicia Keys"],
];

/* ---------- Daily rotation + live override ---------- */
const liveMeta = { generatedAt: null };

async function loadLiveContent() {
  try {
    const res = await fetch("./content.json", { cache: "no-store" });
    if (!res.ok) return;
    const live = await res.json();
    Object.keys(live).forEach((k) => {
      if (Array.isArray(live[k]) && live[k].length) pools[k] = live[k];
    });
    liveMeta.generatedAt = live.generatedAt || null;
  } catch (e) { /* keep built-in pools */ }
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function dayOffset() {
  return todayKey().split("-").reduce((s, n) => s + Number(n), 0);
}

function itemAt(poolName, index) {
  const pool = pools[poolName] || [];
  if (!pool.length) return null;
  const it = pool[(((dayOffset() + index) % pool.length) + pool.length) % pool.length];
  return { ...it, poolName, index, artSrc: it.image?.src || ART(it.art || "editorial-station"), artAlt: it.image?.alt || it.title, artCredit: it.image?.credit || null };
}

function storyHref(poolName, index) {
  return `./story.html?section=${encodeURIComponent(poolName)}&index=${index}`;
}

/* ---------- Card rendering ---------- */
function metaLine(item) {
  const via = item.source ? ` <span class="c-via">via ${item.source}</span>` : "";
  return `<div class="c-tag">${item.tag}${via}</div>`;
}
function thumbHTML(item) {
  const cred = item.artCredit ? `<span class="c-credit">${item.artCredit}</span>` : "";
  return `<div class="c-thumb"><img src="${item.artSrc}" alt="${item.artAlt}" loading="lazy" />${cred}</div>`;
}
function cardHTML(item, variant) {
  const href = item.externalUrl || storyHref(item.poolName, item.index);
  const ext = item.externalUrl ? 'target="_blank" rel="noreferrer"' : "";
  if (variant === "story") {
    return `<a class="c-story" href="${href}" ${ext}>${metaLine(item)}<h4>${item.title}</h4><p>${item.summary}</p></a>`;
  }
  if (variant === "mini") {
    return `<a class="c-mini" href="${href}" ${ext}>${thumbHTML(item)}<div>${metaLine(item)}<h4>${item.title}</h4></div></a>`;
  }
  const feat = variant === "feature" ? " c-feature" : "";
  return `<a class="c-card${feat}" href="${href}" ${ext}>${thumbHTML(item)}<div class="c-body">${metaLine(item)}<h3>${item.title}</h3><p>${item.summary}</p></div></a>`;
}

function renderPools() {
  document.querySelectorAll("[data-pool]").forEach((el) => {
    const name = el.dataset.pool;
    const count = Number(el.dataset.count || 1);
    const offset = Number(el.dataset.offset || 0);
    const variant = el.dataset.variant || "card";
    let html = "";
    for (let i = 0; i < count; i += 1) {
      const item = itemAt(name, offset + i);
      if (item) html += cardHTML(item, variant);
    }
    el.innerHTML = html;
  });
}

function renderBriefing() {
  const el = document.getElementById("briefing");
  if (!el) return;
  el.innerHTML = `<p style="color:var(--muted);margin-bottom:12px">${briefing.intro}</p>` +
    briefing.bullets.map(([k, v]) => `<p style="margin-bottom:6px"><strong style="color:var(--text)">${k}:</strong> <span style="color:var(--muted)">${v}</span></p>`).join("");
}

/* ---------- Live player ---------- */
const PROMO = /cortelyouroadradio|cortelyou road radio|crradio|dot com|\bid\b|stager|stinger|sweeper|jingle|liner|promo|samhsa|psa/i;
const isPromo = (t) => !t || PROMO.test(t);
function splitTrack(raw) {
  const t = String(raw || "").replace(/\s+/g, " ").trim();
  const i = t.indexOf(" - ");
  return i === -1 ? { artist: "", title: t } : { artist: t.slice(0, i).trim(), title: t.slice(i + 3).trim() };
}

const audio = document.getElementById("radioStream");
let playing = false;

function setPlaying(on) {
  playing = on;
  document.querySelectorAll(".js-listen-label").forEach((s) => { s.textContent = on ? "Pause" : "Listen Live"; });
  document.querySelectorAll(".eq").forEach((e) => e.classList.toggle("paused", !on));
  const st = document.getElementById("stickyStatus");
  if (st) st.textContent = on ? "Playing" : "Paused";
  const sp = document.getElementById("stickyPlayer");
  if (sp) sp.hidden = false;
}

async function togglePlay() {
  if (!audio) return;
  if (playing) { audio.pause(); return; }
  try { await audio.play(); } catch (e) { setPlaying(false); }
}

async function fetchMeta() {
  try {
    const res = await fetch(RADIO_STATUS, { mode: "cors" });
    if (!res.ok) throw new Error("meta");
    const data = await res.json();
    const raw = data.current_track?.title || "";
    const cur = isPromo(raw) ? { title: "Live on Cortelyou", artist: "Cortelyou Road Radio" } : splitTrack(raw);
    setText("npTitle", cur.title); setText("npArtist", cur.artist);
    setText("stickyTitle", cur.title); setText("stickyArtist", cur.artist);
    setText("heroNow", cur.artist ? `${cur.title} — ${cur.artist}` : cur.title);

    const hist = (data.history || [])
      .map((t) => t.title)
      .filter((raw) => !isPromo(raw))
      .map(splitTrack)
      .slice(0, 5);
    renderRecent(hist.length ? hist.map((t) => [t.title, t.artist]) : fallbackRecent);
  } catch (e) {
    renderRecent(fallbackRecent);
  }
}

function renderRecent(list) {
  const el = document.getElementById("recentList");
  if (!el) return;
  el.innerHTML = list.map(([title, artist]) => `<li><b>${title}</b><span>${artist || "On air"}</span></li>`).join("");
}

function setText(id, txt) { const el = document.getElementById(id); if (el && txt != null) el.textContent = txt; }
function setHTML(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }

/* ---------- Story page ---------- */
function renderStory() {
  const p = new URLSearchParams(location.search);
  const name = p.get("section") || "music";
  const index = Number(p.get("index") || 0);
  // Use the same daily rotation the cards use, so a card always opens its own story.
  const item = itemAt(name, index);
  if (!item) return;
  const src = item.image?.src || ART(item.art || "editorial-station");
  setHTML("storyHero", `<img src="${src}" alt="${item.image?.alt || item.title}" />`);
  setText("storyTag", item.tag);
  setText("storyTitle", item.title);
  document.title = `${item.title} | Cortelyou Road Radio`;
  setText("storyDeck", item.summary);
  const credit = item.source
    ? `<p class="a-credit">Reporting by ${item.sourceUrl ? `<a href="${item.sourceUrl}" target="_blank" rel="noreferrer">${item.source}</a>` : item.source}. Summary written by Cortelyou Road Radio.</p>`
    : "";
  const photoCredit = item.image?.credit ? `<p class="a-credit">Photo: ${item.image.credit}.</p>` : "";

  // Reading time + share row + related stories keep readers on the page.
  const words = String(item.body || item.summary || "").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  setText("storyRead", `${mins} min read`);

  const share = shareHTML(location.href, `${item.title} — Cortelyou Road Radio`);
  setHTML("storyBody", `<p>${item.body || item.summary}</p>${credit}${photoCredit}${share}`);

  // Related: other items from the same pool.
  const rel = document.getElementById("storyRelated");
  if (rel) {
    const out = [];
    for (let i = 1; i <= 3; i++) {
      const other = itemAt(name, index + i);
      if (other && other.title !== item.title) out.push(cardHTML(other, "card"));
    }
    rel.innerHTML = out.join("");
  }
  setupReveal();
}

/* ============================================================
   Today in Music History
   ============================================================ */
let HISTORY = null;

function histKey(d) {
  const dt = d || new Date();
  return String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
}
function histLongDate(key) {
  const M = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [m, d] = key.split("-").map(Number);
  return M[m - 1] + " " + d;
}
async function loadHistory() {
  if (HISTORY) return HISTORY;
  const res = await fetch("./music-history.json", { cache: "no-cache" });
  HISTORY = await res.json();
  return HISTORY;
}
function histEntry(key) {
  if (!HISTORY || !HISTORY.calendar) return null;
  return HISTORY.calendar[key] || null;
}

/* --- Cinematic animated artwork: every entry gets its own scene --- */
function histHue(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}
function histStill() {
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function histArt(theme, seed) {
  const s = seed || theme || "crr";
  const h = histHue(s);
  const u = "x" + Math.abs((h * 7919) % 99991).toString(36) + (s.length % 89).toString(36) + (s.charCodeAt(0) % 61).toString(36);
  const P  = `hsl(${h},88%,64%)`;
  const P2 = `hsl(${h},70%,44%)`;
  const S  = `hsl(${(h + 40) % 360},92%,58%)`;
  const D  = `hsl(${(h + 14) % 360},58%,13%)`;
  const EM = "#ff4d2b";
  const still = histStill();
  const AN = (x) => (still ? "" : x);
  const spin = (dur, cx, cy) => AN(`<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>`);
  const pulse = (attr, a, b, dur, begin) => AN(`<animate attributeName="${attr}" values="${a};${b};${a}" dur="${dur}s" begin="${begin || 0}s" repeatCount="indefinite"/>`);

  // equalizer bars used by several scenes
  const eqBars = (x0, y0, n, w, gap, maxH) =>
    Array.from({ length: n }, (_, i) => {
      const lo = 14 + ((i * 37) % Math.max(18, maxH - 30));
      const hi = 30 + ((i * 61) % maxH);
      const c = i % 4 === 0 ? EM : (i % 3 === 0 ? S : P);
      return `<rect x="${x0 + i * (w + gap)}" y="${y0 - lo}" width="${w}" height="${lo}" rx="${w / 2}" fill="${c}" opacity=".9">
        ${AN(`<animate attributeName="height" values="${lo};${hi};${Math.round(hi * 0.45)};${lo}" dur="${(1.1 + (i % 5) * 0.19).toFixed(2)}s" repeatCount="indefinite"/>`)}
        ${AN(`<animate attributeName="y" values="${y0 - lo};${y0 - hi};${y0 - Math.round(hi * 0.45)};${y0 - lo}" dur="${(1.1 + (i % 5) * 0.19).toFixed(2)}s" repeatCount="indefinite"/>`)}
      </rect>`;
    }).join("");

  const grooves = Array.from({ length: 13 }, (_, i) =>
    `<circle r="${68 + i * 7}" fill="none" stroke="#fff" stroke-opacity="${0.05 + (i % 3) * 0.018}" stroke-width="1"/>`).join("");

  const SCENES = {
    /* Spinning record with tonearm and a specular light sweep */
    vinyl: `
      <g transform="translate(430,258)">
        <ellipse cx="0" cy="186" rx="196" ry="20" fill="#000" opacity=".5"/>
        <circle r="176" fill="#0a0908" stroke="${P}" stroke-opacity=".22"/>
        <g>${spin(7, 0, 0)}
          <circle r="168" fill="#131111"/>
          ${grooves}
          <circle r="54" fill="${EM}"/>
          <path d="M-54 0 A54 54 0 0 1 54 0 Z" fill="#fff" opacity=".10"/>
          <circle r="7" fill="#070605"/>
          <rect x="-2" y="-168" width="4" height="26" fill="#fff" opacity=".18"/>
        </g>
        <path d="M-176 -40 A176 176 0 0 1 40 -172" fill="none" stroke="url(#sh${u})" stroke-width="34" opacity=".5">
          ${pulse("opacity", ".18", ".55", 3.6)}
        </path>
      </g>
      <g transform="translate(742,96)">
        <g>${AN(`<animateTransform attributeName="transform" attributeType="XML" type="rotate" values="-6;2;-6" dur="9s" repeatCount="indefinite"/>`)}
          <rect x="-9" y="-9" width="18" height="18" rx="4" fill="${P2}"/>
          <rect x="-4" y="0" width="8" height="212" rx="4" fill="#c9c2b8"/>
          <rect x="-16" y="206" width="32" height="24" rx="6" fill="${S}"/>
        </g>
      </g>`,

    /* DJ setup: platter, tonearm, moving crossfader */
    turntable: `
      <rect x="120" y="120" width="660" height="290" rx="22" fill="#111010" stroke="${P}" stroke-opacity=".2"/>
      <g transform="translate(320,266)">
        <circle r="118" fill="#0b0a09" stroke="${P}" stroke-opacity=".3"/>
        <g>${spin(4.5, 0, 0)}
          <circle r="110" fill="#161313"/>${grooves}
          <circle r="34" fill="${EM}"/><circle r="5" fill="#070605"/>
          <rect x="-1.5" y="-110" width="3" height="20" fill="#fff" opacity=".2"/>
        </g>
      </g>
      ${Array.from({length:12},(_,i)=>`<circle cx="${320+112*Math.cos(i*Math.PI/6)}" cy="${266+112*Math.sin(i*Math.PI/6)}" r="2.4" fill="${S}" opacity=".8"/>`).join("")}
      <g transform="translate(452,168)">
        <g>${AN(`<animateTransform attributeName="transform" attributeType="XML" type="rotate" values="14;24;14" dur="3.2s" repeatCount="indefinite"/>`)}
          <circle r="11" fill="${P2}"/><rect x="-3" y="0" width="6" height="150" rx="3" fill="#cfc8be"/>
          <rect x="-11" y="146" width="22" height="18" rx="5" fill="${EM}"/>
        </g>
      </g>
      <rect x="560" y="180" width="180" height="180" rx="12" fill="#0d0c0b" stroke="${P}" stroke-opacity=".18"/>
      ${eqBars(578, 330, 7, 14, 9, 110)}
      <rect x="560" y="372" width="180" height="12" rx="6" fill="#221e1b"/>
      <rect x="592" y="366" width="34" height="24" rx="6" fill="${EM}">
        ${AN(`<animate attributeName="x" values="574;676;574" dur="2.4s" repeatCount="indefinite"/>`)}
      </rect>`,

    /* Reel-to-reel tape machine */
    tape: `
      <rect x="110" y="96" width="680" height="318" rx="20" fill="#100f0e" stroke="${P}" stroke-opacity=".2"/>
      <path d="M300 300 C 380 372, 520 372, 600 300" fill="none" stroke="#e8e2d8" stroke-opacity=".5" stroke-width="5"/>
      ${[[300,242,96,6],[600,242,74,4.6]].map(([cx,cy,r,dur])=>`
        <g transform="translate(${cx},${cy})">
          <circle r="${r}" fill="#0b0a09" stroke="${P}" stroke-opacity=".35" stroke-width="2"/>
          <g>${spin(dur,0,0)}
            <circle r="${r-10}" fill="none" stroke="#3a332e" stroke-width="${r*0.5}"/>
            ${Array.from({length:6},(_,i)=>`<rect x="-3" y="-${r-6}" width="6" height="${r-24}" rx="3" fill="${i%2?S:P}" opacity=".85" transform="rotate(${i*60})"/>`).join("")}
            <circle r="12" fill="${EM}"/>
          </g>
        </g>`).join("")}
      <rect x="404" y="330" width="92" height="34" rx="7" fill="#070605" stroke="${P}" stroke-opacity=".3"/>
      ${eqBars(414, 358, 5, 10, 7, 26)}
      <circle cx="700" cy="360" r="9" fill="${EM}">${pulse("opacity",".35","1",1.6)}</circle>`,

    /* Mixing console with live meters */
    mixer: `
      <rect x="96" y="86" width="708" height="338" rx="18" fill="#100e0d" stroke="${P}" stroke-opacity=".2"/>
      ${Array.from({length:6},(_,i)=>{const x=150+i*106;const k=`<circle cx="${x}" cy="140" r="17" fill="#1b1815" stroke="${i%2?S:P}" stroke-width="2.5"/><rect x="${x-1.5}" y="126" width="3" height="12" rx="1.5" fill="#fff" opacity=".8" transform="rotate(${-40+i*22} ${x} 140)"/>`;
        return k+`<line x1="${x}" y1="186" x2="${x}" y2="372" stroke="#2a2521" stroke-width="4" stroke-linecap="round"/>
        <rect x="${x-17}" y="${230+((i*47)%110)}" width="34" height="17" rx="5" fill="${i%3===0?EM:"#d8d1c7"}">
          ${AN(`<animate attributeName="y" values="${230+((i*47)%110)};${196+((i*29)%150)};${230+((i*47)%110)}" dur="${(3.4+i*0.42).toFixed(1)}s" repeatCount="indefinite"/>`)}
        </rect>`;}).join("")}
      <rect x="700" y="186" width="72" height="186" rx="8" fill="#0a0908" stroke="${P}" stroke-opacity=".2"/>
      ${eqBars(712, 360, 3, 14, 10, 150)}`,

    /* Synth with animated oscilloscope */
    synth: `
      <rect x="110" y="110" width="680" height="286" rx="18" fill="#100f0e" stroke="${P}" stroke-opacity=".2"/>
      <rect x="140" y="140" width="380" height="122" rx="10" fill="#070c09" stroke="${S}" stroke-opacity=".35"/>
      <path fill="none" stroke="${S}" stroke-width="3.5" stroke-linecap="round" d="M150 201 Q 190 141 230 201 T 310 201 T 390 201 T 470 201 T 510 201">
        ${AN(`<animate attributeName="d" dur="2.6s" repeatCount="indefinite" values="
          M150 201 Q 190 141 230 201 T 310 201 T 390 201 T 470 201 T 510 201;
          M150 201 Q 190 246 230 201 T 310 201 T 390 201 T 470 201 T 510 201;
          M150 201 Q 190 161 230 201 T 310 201 T 390 201 T 470 201 T 510 201;
          M150 201 Q 190 141 230 201 T 310 201 T 390 201 T 470 201 T 510 201"/>`)}
      </path>
      ${Array.from({length:8},(_,i)=>`<circle cx="${566+ (i%4)*58}" cy="${164+Math.floor(i/4)*56}" r="18" fill="#1b1714" stroke="${i%3?P:EM}" stroke-width="2.5"/>
        <rect x="${564+(i%4)*58}" y="${150+Math.floor(i/4)*56}" width="3" height="12" rx="1.5" fill="#fff" opacity=".75" transform="rotate(${(i*47)%300} ${566+(i%4)*58} ${164+Math.floor(i/4)*56})"/>`).join("")}
      ${Array.from({length:18},(_,i)=>{const w=(i%7===2||i%7===4||i%7===6)?0:1;return w?`<rect x="${142+i*20}" y="288" width="18" height="92" rx="4" fill="#efe9df"/>`:`<rect x="${150+i*20}" y="288" width="12" height="58" rx="3" fill="#0d0b0a"/>`}).join("")}
      <circle cx="746" cy="356" r="7" fill="${EM}">${pulse("opacity",".3","1",1.1)}</circle>`,

    /* Studio condenser mic with expanding halo */
    mic: `
      <g transform="translate(450,236)">
        ${AN(`<circle r="96" fill="none" stroke="${P}" stroke-width="2" opacity=".5"><animate attributeName="r" values="96;188" dur="3.4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;0" dur="3.4s" repeatCount="indefinite"/></circle>`)}
        ${AN(`<circle r="96" fill="none" stroke="${S}" stroke-width="2" opacity=".4"><animate attributeName="r" values="96;188" dur="3.4s" begin="1.7s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;0" dur="3.4s" begin="1.7s" repeatCount="indefinite"/></circle>`)}
        <ellipse cx="0" cy="168" rx="86" ry="13" fill="#000" opacity=".5"/>
        <rect x="-46" y="-116" width="92" height="176" rx="46" fill="#191614" stroke="${P}" stroke-width="3"/>
        <rect x="-34" y="-104" width="68" height="150" rx="34" fill="none" stroke="${P2}" stroke-width="1.6" opacity=".8"/>
        ${Array.from({length:9},(_,i)=>`<line x1="-34" y1="${-98+i*17}" x2="34" y2="${-98+i*17}" stroke="${P}" stroke-opacity=".35" stroke-width="2"/>`).join("")}
        <rect x="-13" y="60" width="26" height="48" rx="6" fill="#2a2420"/>
        <rect x="-40" y="108" width="80" height="14" rx="7" fill="${EM}"/>
        <rect x="-6" y="122" width="12" height="46" rx="5" fill="#39312c"/>
      </g>
      ${Array.from({length:9},(_,i)=>`<circle cx="${130+i*82}" cy="${90+((i*53)%300)}" r="${1.6+(i%3)}" fill="${i%2?P:S}" opacity=".55">${AN(`<animate attributeName="cy" values="${90+((i*53)%300)};${60+((i*53)%300)};${90+((i*53)%300)}" dur="${(5+i*0.6).toFixed(1)}s" repeatCount="indefinite"/>`)}</circle>`).join("")}`,

    /* Drum kit with impact rings on the beat */
    drums: `
      <g transform="translate(320,300)">
        <circle r="112" fill="#141110" stroke="${P}" stroke-width="4"/>
        <circle r="86" fill="none" stroke="${P2}" stroke-opacity=".55" stroke-width="2"/>
        <circle r="30" fill="${EM}"/>
        ${AN(`<circle r="112" fill="none" stroke="${EM}" stroke-width="3" opacity=".7"><animate attributeName="r" values="112;196" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0" dur="1.5s" repeatCount="indefinite"/></circle>`)}
      </g>
      <g transform="translate(556,214)">
        <ellipse rx="86" ry="16" fill="#241f1b"/>
        <ellipse rx="86" ry="16" fill="none" stroke="${S}" stroke-width="3"/>
        ${AN(`<animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -7; 0 0" dur="0.9s" repeatCount="indefinite" additive="sum"/>`)}
      </g>
      <g transform="translate(672,330)">
        <circle r="62" fill="#141110" stroke="${P}" stroke-width="3.5"/>
        <circle r="42" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="1.6"/>
      </g>
      ${eqBars(120, 452, 24, 9, 8, 80)}`,

    /* Piano keys with a travelling light */
    piano: `
      <g transform="translate(96,168)">
        <rect x="-6" y="-22" width="716" height="20" rx="8" fill="${EM}"/>
        ${Array.from({length:17},(_,i)=>`<rect x="${i*42}" y="0" width="38" height="196" rx="6" fill="#f3ede3"/>`).join("")}
        ${Array.from({length:17},(_,i)=>((i%7===2||i%7===6)?"":`<rect x="${i*42+27}" y="0" width="24" height="120" rx="4" fill="#0b0a09"/>`)).join("")}
        <rect x="0" y="0" width="120" height="196" fill="url(#sh${u})" opacity=".85">
          ${AN(`<animate attributeName="x" values="-120;716;-120" dur="6.5s" repeatCount="indefinite"/>`)}
        </rect>
      </g>
      ${Array.from({length:7},(_,i)=>`<g opacity=".85" transform="translate(${170+i*88},${420})"><path d="M0 0 v-26 a7 7 0 1 0 5 6 v-24 l14 -5 v22 a7 7 0 1 0 5 6 v-34 z" fill="${i%3===0?EM:(i%2?P:S)}"/>
        ${AN(`<animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -70; 0 0" dur="${(4.2+i*0.55).toFixed(1)}s" repeatCount="indefinite" additive="sum"/>`)}
        ${pulse("opacity",".2",".95",(4.2+i*0.55))}</g>`).join("")}`,

    /* Guitar with vibrating strings */
    guitar: `
      <g transform="translate(70,60)">
        <path d="M244 300 q-92 -14 -92 -92 t92 -92 q54 0 70 42 l190 -142" fill="none" stroke="${P}" stroke-width="9" stroke-linecap="round"/>
        <circle cx="244" cy="208" r="44" fill="#0a0908" stroke="${EM}" stroke-width="6"/>
        <circle cx="244" cy="208" r="60" fill="none" stroke="${P2}" stroke-opacity=".45" stroke-width="2"/>
        <path d="M504 16 l72 -44" stroke="${S}" stroke-width="14" stroke-linecap="round" fill="none"/>
        ${Array.from({length:5},(_,i)=>`<path d="M196 ${186+i*11} L 520 ${44+i*9}" stroke="#e8e2d8" stroke-opacity=".75" stroke-width="1.6">
          ${AN(`<animate attributeName="stroke-opacity" values=".75;.25;.75" dur="${(0.5+i*0.13).toFixed(2)}s" repeatCount="indefinite"/>`)}</path>`).join("")}
      </g>
      ${eqBars(120, 462, 22, 9, 9, 70)}`,

    /* Trumpet with radiating sound arcs */
    horn: `
      <g transform="translate(120,150)">
        <path d="M60 160 q140 -156 300 -122 t150 106" fill="none" stroke="${P}" stroke-width="13" stroke-linecap="round"/>
        <path d="M506 128 l104 -60 v138 z" fill="${EM}"/>
        <path d="M506 128 l104 -60 v138 z" fill="url(#sh${u})" opacity=".5"/>
        ${[0,1,2].map(i=>`<circle cx="${190+i*72}" cy="${92+i*6}" r="12" fill="#1c1815" stroke="${S}" stroke-width="3"/>`).join("")}
      </g>
      ${[0,1,2].map(i=>`<path d="M756 ${218} q46 ${40+i*26} 0 ${(40+i*26)*2}" fill="none" stroke="${S}" stroke-width="3" opacity=".6" transform="translate(${i*10},${-i*(20+i*10)})">
        ${pulse("opacity",".15",".7",2.2,i*0.5)}</path>`).join("")}
      ${eqBars(120, 468, 20, 10, 9, 60)}`,

    /* Violin with a moving bow */
    strings: `
      <g transform="translate(300,60)">
        <path d="M120 40 q-96 96 -62 214 t138 86 q104 -32 138 -86 t-62 -214 q-54 -34 -76 -34 t-76 34 z" fill="#1a1411" stroke="${P}" stroke-width="4"/>
        <path d="M150 168 c-26 6 -26 46 0 52 M262 168 c26 6 26 46 0 52" fill="none" stroke="${EM}" stroke-width="4"/>
        ${Array.from({length:4},(_,i)=>`<line x1="${186+i*13}" y1="52" x2="${186+i*13}" y2="320" stroke="#f0eae0" stroke-opacity=".8" stroke-width="1.5"/>`).join("")}
      </g>
      <g>${AN(`<animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 92 34; 0 0" dur="4.4s" repeatCount="indefinite"/>`)}
        <rect x="330" y="150" width="330" height="7" rx="3.5" fill="#d9d2c8" transform="rotate(19 330 150)"/>
      </g>
      ${eqBars(120, 470, 22, 9, 9, 56)}`,

    /* Sampler pads lighting in sequence */
    sampler: `
      <rect x="176" y="96" width="548" height="318" rx="20" fill="#100f0e" stroke="${P}" stroke-opacity=".22"/>
      ${Array.from({length:16},(_,i)=>{const x=212+(i%4)*128,y=132+Math.floor(i/4)*68;
        return `<rect x="${x}" y="${y}" width="112" height="54" rx="10" fill="#1b1714" stroke="${i%5===0?EM:P}" stroke-opacity=".5" stroke-width="2">
        ${AN(`<animate attributeName="fill" values="#1b1714;${i%5===0?EM:S};#1b1714" dur="4s" begin="${(i*0.24).toFixed(2)}s" repeatCount="indefinite"/>`)}</rect>`;}).join("")}
      ${eqBars(212, 400, 14, 12, 10, 44)}`,

    /* Crowd silhouettes under sweeping stage lights */
    crowd: `
      ${[0,1,2].map(i=>`<path d="M${180+i*250} -20 L${60+i*250} 470 L${330+i*250} 470 Z" fill="${i===1?EM:(i?S:P)}" opacity=".13">
        ${AN(`<animateTransform attributeName="transform" attributeType="XML" type="rotate" values="${-9+i*5} ${180+i*250} 0; ${9-i*4} ${180+i*250} 0; ${-9+i*5} ${180+i*250} 0" dur="${(6+i*1.7).toFixed(1)}s" repeatCount="indefinite"/>`)}
      </path>`).join("")}
      <rect y="392" width="900" height="114" fill="#050404"/>
      ${Array.from({length:26},(_,i)=>{const x=26+i*34,hh=30+((i*43)%34);
        return `<g><circle cx="${x}" cy="${400-hh}" r="13" fill="#0b0a09"/><path d="M${x-15} 420 q15 -${hh} 30 0 z" fill="#0b0a09"/>
        ${(i%4===0)?`<path d="M${x-14} ${398-hh} l-16 -34 M${x+14} ${398-hh} l16 -34" stroke="#0b0a09" stroke-width="7" stroke-linecap="round" fill="none"/>`:""}
        ${AN(`<animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -${5+(i%4)*3}; 0 0" dur="${(1.1+(i%5)*0.21).toFixed(2)}s" repeatCount="indefinite"/>`)}</g>`;}).join("")}`,

    /* Radio dial with sweeping needle and broadcast arcs */
    radio: `
      <rect x="120" y="120" width="660" height="286" rx="22" fill="#12100f" stroke="${P}" stroke-opacity=".22"/>
      <rect x="152" y="158" width="392" height="118" rx="10" fill="#0a0d0b" stroke="${S}" stroke-opacity=".35"/>
      ${Array.from({length:26},(_,i)=>`<line x1="${168+i*14}" y1="${i%5===0?186:200}" x2="${168+i*14}" y2="246" stroke="${P}" stroke-opacity="${i%5===0?".8":".35"}" stroke-width="${i%5===0?2:1.2}"/>`).join("")}
      <rect x="300" y="170" width="4" height="92" rx="2" fill="${EM}">
        ${AN(`<animate attributeName="x" values="172;520;172" dur="7s" repeatCount="indefinite"/>`)}
      </rect>
      <g transform="translate(648,236)">
        <circle r="64" fill="#191512" stroke="${P}" stroke-width="3"/>
        <circle r="46" fill="none" stroke="${P2}" stroke-opacity=".5" stroke-width="2"/>
        <circle r="12" fill="${EM}"/>
        ${[1,2,3].map(i=>`<path d="M0 -${18+i*16} a ${18+i*16} ${18+i*16} 0 0 1 ${18+i*16} ${18+i*16}" fill="none" stroke="${S}" stroke-width="3" opacity=".55">${pulse("opacity",".12",".75",2.1,i*0.45)}</path>`).join("")}
      </g>
      ${eqBars(152, 380, 12, 12, 10, 76)}`,

    /* Boombox */
    boombox: `
      <rect x="120" y="150" width="660" height="240" rx="18" fill="#131110" stroke="${P}" stroke-opacity=".25"/>
      <path d="M210 150 l70 -66 M690 150 l-70 -66" stroke="${P2}" stroke-width="7" stroke-linecap="round" fill="none"/>
      ${[250,650].map((cx,i)=>`<g transform="translate(${cx},270)">
        <circle r="82" fill="#0b0a09" stroke="${P}" stroke-width="3"/>
        <circle r="58" fill="none" stroke="${S}" stroke-opacity=".45" stroke-width="2"/>
        <circle r="26" fill="${EM}">${pulse("r","24","32",(0.85+i*0.15))}</circle>
      </g>`).join("")}
      <rect x="366" y="196" width="168" height="76" rx="8" fill="#070605" stroke="${P}" stroke-opacity=".3"/>
      ${eqBars(380, 262, 8, 12, 8, 56)}
      ${eqBars(366, 360, 14, 10, 8, 52)}`,
  };

  const scene = SCENES[theme] || SCENES.vinyl;
  return `<svg viewBox="0 0 900 506" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${theme} illustration" preserveAspectRatio="xMidYMid slice">
<defs>
  <linearGradient id="bg${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${D}"/><stop offset="1" stop-color="#070605"/></linearGradient>
  <radialGradient id="ga${u}" cx="26%" cy="20%" r="58%"><stop offset="0" stop-color="${P}" stop-opacity=".50"/><stop offset="1" stop-color="${P}" stop-opacity="0"/></radialGradient>
  <radialGradient id="gb${u}" cx="80%" cy="84%" r="54%"><stop offset="0" stop-color="${S}" stop-opacity=".34"/><stop offset="1" stop-color="${S}" stop-opacity="0"/></radialGradient>
  <radialGradient id="vg${u}" cx="50%" cy="44%" r="74%"><stop offset="52%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".74"/></radialGradient>
  <linearGradient id="sh${u}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".26"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <pattern id="dt${u}" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#fff" opacity=".05"/></pattern>
  <pattern id="sc${u}" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" opacity=".22"/></pattern>
</defs>
<rect width="900" height="506" fill="url(#bg${u})"/>
<rect width="900" height="506" fill="url(#ga${u})"><animate attributeName="opacity" values=".85;1;.85" dur="6s" repeatCount="indefinite"/></rect>
<rect width="900" height="506" fill="url(#gb${u})"/>
${scene}
<rect width="900" height="506" fill="url(#dt${u})"/>
<rect width="900" height="506" fill="url(#sc${u})" opacity=".5"/>
<rect width="900" height="506" fill="url(#vg${u})"/>
</svg>`;
}

/* --- Real imagery: drop a file in assets/history/ and it replaces the scene ---
   Naming convention: assets/history/MM-DD.jpg  (also .jpeg .png .webp)
   Or set "image": {"src": "...", "alt": "...", "credit": "..."} on the entry.
   If no file is found, the animated scene below stays visible. ------------- */
function histPhotoCandidates(key, entry) {
  if (entry && entry.image && entry.image.src) return [entry.image.src];
  return ["jpg", "jpeg", "png", "webp"].map((x) => `./assets/history/${key}.${x}`);
}
function histImgFallback(img) {
  let list = [];
  try { list = JSON.parse(img.dataset.rest || "[]"); } catch (e) {}
  if (list.length) { img.dataset.rest = JSON.stringify(list.slice(1)); img.src = list[0]; }
  else { img.remove(); }
}
function histPhotoHTML(key, entry) {
  const c = histPhotoCandidates(key, entry);
  const alt = (entry && entry.image && entry.image.alt) || (entry ? entry.title : "");
  return `<img class="hist-photo" src="${c[0]}" alt="${String(alt).replace(/"/g, "&quot;")}" loading="lazy"
    data-rest='${JSON.stringify(c.slice(1))}'
    onload="this.classList.add('in')" onerror="histImgFallback(this)" />`;
}
function histCreditHTML(entry) {
  const cr = entry && entry.image && entry.image.credit;
  return cr ? `<p class="hist-credit">Image: ${cr}</p>` : "";
}

/* --- Version face-off voting (stored on this device) --- */
function histVoteKey(date) { return "crr-vote-" + date; }
function histVote(date, side) {
  try { localStorage.setItem(histVoteKey(date), side); } catch (e) {}
  histPaintVotes(date);
}
function histPaintVotes(date) {
  let choice = null;
  try { choice = localStorage.getItem(histVoteKey(date)); } catch (e) {}
  document.querySelectorAll(".vs-btn").forEach((b) => {
    b.classList.toggle("picked", !!choice && b.dataset.side === choice);
  });
  const out = document.getElementById("vsResult");
  if (out) out.textContent = choice ? "You picked " + (choice === "a" ? "the original" : "the remake") + ". Tap the other to switch." : "";
}

function histKindLabel(k) {
  return { sample: "Sample story", versus: "Which version wins?", producer: "Behind the board", writer: "The writer", story: "Did you know" }[k] || "Did you know";
}

function histCardHTML(key, entry, opts) {
  if (!entry) return "";
  const o = opts || {};
  const art = histArt(entry.art, entry.date + entry.title);
  return `<a class="hist-card" href="./music-history.html?d=${key}">
    <div class="hist-art">${art}${histPhotoHTML(key, entry)}<span class="hist-kind">${histKindLabel(entry.kind)}</span></div>
    <div class="hist-card-body">
      <div class="hist-meta"><span>${histLongDate(key)}</span><span>${entry.genre}</span><span>${entry.year}</span></div>
      <h4>${entry.title}</h4>
    </div></a>`;
}

function histExtraHTML(entry) {
  if (entry.kind === "sample" && entry.extra && entry.extra.src) {
    const hits = (entry.extra.hits || []).map((x) => `<li>${x}</li>`).join("");
    return `<div class="hist-sample">
      <div class="hs-src"><span class="kicker">The original</span><b>${entry.extra.src}</b></div>
      <div class="hs-arrow" aria-hidden="true">↓</div>
      <div class="hs-hits"><span class="kicker">Turned into</span><ul>${hits}</ul></div>
    </div>`;
  }
  if (entry.kind === "versus" && entry.extra && entry.extra.a) {
    return `<div class="hist-versus">
      <button class="vs-btn" data-side="a" data-date="${entry.date}"><span class="kicker">Version A</span><b>${entry.extra.a}</b><span class="vs-pick">Pick this</span></button>
      <span class="vs-or">vs</span>
      <button class="vs-btn" data-side="b" data-date="${entry.date}"><span class="kicker">Version B</span><b>${entry.extra.b}</b><span class="vs-pick">Pick this</span></button>
    </div><p class="vs-result" id="vsResult"></p>`;
  }
  return "";
}

function shareHTML(url, text) {
  const u = encodeURIComponent(url), t = encodeURIComponent(text);
  return `<div class="share-row">
    <span class="share-label">Share</span>
    <a class="share-btn" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${u}" aria-label="Share on Facebook">Facebook</a>
    <a class="share-btn" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url=${u}&text=${t}" aria-label="Share on X">X</a>
    <a class="share-btn" target="_blank" rel="noopener" href="https://wa.me/?text=${t}%20${u}" aria-label="Share on WhatsApp">WhatsApp</a>
    <button class="share-btn js-copy" data-url="${url}">Copy link</button>
  </div>`;
}

async function renderHistory() {
  const host = document.getElementById("historyMain");
  if (!host) return;
  try { await loadHistory(); } catch (e) { host.innerHTML = "<p class='c-none'>History archive unavailable right now.</p>"; return; }

  const p = new URLSearchParams(location.search);
  const key = /^\d{2}-\d{2}$/.test(p.get("d") || "") ? p.get("d") : histKey();
  const entry = histEntry(key);
  if (!entry) { host.innerHTML = "<p class='c-none'>Nothing filed for this date yet.</p>"; return; }

  const isToday = key === histKey();
  const url = location.origin + "/music-history?d=" + key;
  host.innerHTML = `
    <article class="hist-feature">
      <div class="hist-hero">${histArt(entry.art, entry.date + entry.title)}${histPhotoHTML(key, entry)}
        <span class="hist-kind big">${histKindLabel(entry.kind)}</span>
      </div>
      <div class="hist-lead">
        <div class="hist-meta"><span class="on">${isToday ? "Today" : histLongDate(key)}</span><span>${entry.genre}</span><span>${entry.year}</span></div>
        <h2>${entry.title}</h2>
        <p class="hist-story">${entry.story}</p>
        ${histExtraHTML(entry)}
        <div class="hist-facts"><h3>Did you know</h3><ul>${entry.facts.map((f) => `<li>${f}</li>`).join("")}</ul></div>
        ${histCreditHTML(entry)}
        ${shareHTML(url, entry.title + " — Today in Music History on Cortelyou Road Radio")}
      </div>
    </article>`;

  // This week strip
  const strip = document.getElementById("historyWeek");
  if (strip) {
    const base = new Date();
    const out = [];
    for (let i = 1; i <= 4; i++) {
      const d = new Date(base); d.setDate(base.getDate() - i);
      const k = histKey(d); const e = histEntry(k);
      if (e) out.push(histCardHTML(k, e));
    }
    strip.innerHTML = out.join("");
  }
  histPaintVotes(entry.date);
  setupReveal();
}

async function renderHistoryTeaser() {
  const el = document.getElementById("historyTeaser");
  if (!el) return;
  try { await loadHistory(); } catch (e) { return; }
  const key = histKey();
  const entry = histEntry(key);
  if (!entry) return;
  el.innerHTML = `
    <a class="hist-teaser" href="./music-history.html">
      <div class="hist-art">${histArt(entry.art, entry.date + entry.title)}${histPhotoHTML(key, entry)}<span class="hist-kind">${histKindLabel(entry.kind)}</span></div>
      <div class="hist-teaser-body">
        <span class="kicker">Today in Music History · ${histLongDate(key)}</span>
        <h3>${entry.title}</h3>
        <p>${entry.story}</p>
        <span class="see">Read today's entry →</span>
      </div>
    </a>`;
}

/* ============================================================
   Schedule / on-air lineup  (edit schedule.json to change shows)
   ============================================================ */
let SCHEDULE = null;
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

async function loadSchedule() {
  if (SCHEDULE) return SCHEDULE;
  const res = await fetch("./schedule.json", { cache: "no-cache" });
  SCHEDULE = await res.json();
  return SCHEDULE;
}
function minsNow() { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
function hhmmToMins(s) { const [h, m] = s.split(":").map(Number); return h * 60 + m; }
function fmtTime(s) {
  const [h, m] = s.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return hh + (m ? ":" + String(m).padStart(2, "0") : "") + " " + ap;
}
function slotsForDay(idx) {
  if (!SCHEDULE) return [];
  return (SCHEDULE.week && SCHEDULE.week[String(idx)]) || SCHEDULE.default || [];
}
function currentSlot() {
  const now = minsNow(), day = new Date().getDay();
  const slots = slotsForDay(day);
  for (const s of slots) {
    const a = hhmmToMins(s.start), b = hhmmToMins(s.end);
    if (b > a ? now >= a && now < b : now >= a || now < b) return s;
  }
  return null;
}
function nextSlot() {
  const now = minsNow(), day = new Date().getDay();
  const slots = slotsForDay(day).slice().sort((x, y) => hhmmToMins(x.start) - hhmmToMins(y.start));
  for (const s of slots) if (hhmmToMins(s.start) > now) return s;
  const tomorrow = slotsForDay((day + 1) % 7).slice().sort((x, y) => hhmmToMins(x.start) - hhmmToMins(y.start));
  return tomorrow[0] || null;
}

async function renderSchedule() {
  const nowEl = document.getElementById("onAirNow");
  const gridEl = document.getElementById("scheduleGrid");
  if (!nowEl && !gridEl) return;
  try { await loadSchedule(); } catch (e) { return; }

  if (nowEl) {
    const cur = currentSlot(), nxt = nextSlot();
    nowEl.innerHTML = `
      <div class="oa-now">
        <span class="kicker">On air now</span>
        <h3>${cur ? cur.name : "Cortelyou Road Radio"}</h3>
        <p>${cur ? cur.blurb : "Music around the clock from Ditmas Park."}</p>
        ${cur ? `<span class="oa-time">${fmtTime(cur.start)} – ${fmtTime(cur.end)}</span>` : ""}
      </div>
      ${nxt ? `<div class="oa-next"><span class="kicker">Up next</span><h4>${nxt.name}</h4><span class="oa-time">${fmtTime(nxt.start)}</span></div>` : ""}`;
  }

  if (gridEl) {
    const today = new Date().getDay();
    const cur = currentSlot();
    let html = "";
    for (let i = 0; i < 7; i++) {
      const d = (today + i) % 7;
      const slots = slotsForDay(d).slice().sort((x, y) => hhmmToMins(x.start) - hhmmToMins(y.start));
      html += `<div class="sch-day${i === 0 ? " is-today" : ""}">
        <h4>${i === 0 ? "Today" : DAY_NAMES[d]}</h4>
        <ul>${slots.map((s) => {
          const live = i === 0 && cur && cur.name === s.name && cur.start === s.start;
          return `<li class="${live ? "live" : ""}"><span class="sch-t">${fmtTime(s.start)}</span><span class="sch-n">${s.name}${live ? ' <em class="sch-live">On air</em>' : ""}</span></li>`;
        }).join("")}</ul></div>`;
    }
    gridEl.innerHTML = html;
  }
}

/* ---------- Init ---------- */
function setupReveal() {
  const els = document.querySelectorAll(".c-card, .c-mini, .c-story, .mix-feature");
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  setTimeout(() => els.forEach((el) => el.classList.add("in")), 1600);
}

function renderAll() {
  const page = document.body.dataset.page;
  if (page === "story") renderStory();
  else if (page === "history") { renderHistory(); }
  else { renderPools(); renderBriefing(); renderHistoryTeaser(); renderSchedule(); setupReveal(); }
}

/* ---------- In-place navigation (keeps the stream alive) ---------- */
// The <audio> element and header/footer/sticky-player live outside the swapped
// region, so internal links change the page content without a full reload and
// playback never stops. Any failure falls back to a normal page load.
function updateNavActive() {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("nav.links a").forEach((a) => {
    const target = (a.getAttribute("href") || "").replace(/^\.\//, "").split(/[?#]/)[0].toLowerCase() || "index.html";
    if (target === page || (page === "" && target === "index.html")) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

async function spaNavigate(url, push) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("nav fetch failed");
  const doc = new DOMParser().parseFromString(await res.text(), "text/html");
  const newHeader = doc.querySelector("header");
  const newFooter = doc.querySelector("footer.site");
  const curHeader = document.querySelector("header");
  const curFooter = document.querySelector("footer.site");
  if (!newHeader || !newFooter || !curHeader || !curFooter) throw new Error("unexpected structure");

  let n = curHeader.nextSibling;
  while (n && n !== curFooter) { const next = n.nextSibling; n.remove(); n = next; }
  let m = newHeader.nextSibling;
  while (m && m !== newFooter) { const next = m.nextSibling; curFooter.parentNode.insertBefore(document.importNode(m, true), curFooter); m = next; }

  document.title = doc.title;
  document.body.dataset.page = doc.body.dataset.page || "home";
  if (doc.body.dataset.section) document.body.dataset.section = doc.body.dataset.section;
  else delete document.body.dataset.section;

  if (push) history.pushState({}, "", url);
  updateNavActive();
  renderAll();
  setPlaying(playing);
  fetchMeta();

  const hash = new URL(url, location.href).hash;
  const target = hash && document.querySelector(hash);
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);
}

function isInternalPageLink(a) {
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return false;
  const href = a.getAttribute("href") || "";
  if (!href || href.startsWith("#") || /^(mailto:|tel:)/i.test(href)) return false;
  let url;
  try { url = new URL(href, location.href); } catch (e) { return false; }
  if (url.origin !== location.origin) return false;
  // A page link is same-origin and either extensionless (Netlify clean URLs
  // like /music-news) or ends in .html. Skip links to other files (assets).
  const last = url.pathname.split("/").pop();
  if (last.includes(".") && !/\.html$/i.test(last)) return false;
  return true;
}

function setupNavigation() {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.target.closest(".js-listen")) { e.preventDefault(); togglePlay(); return; }
    const vs = e.target.closest(".vs-btn");
    if (vs) { e.preventDefault(); histVote(vs.dataset.date, vs.dataset.side); return; }
    const cp = e.target.closest(".js-copy");
    if (cp) {
      e.preventDefault();
      const done = () => { const t = cp.textContent; cp.textContent = "Copied"; setTimeout(() => { cp.textContent = t; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(cp.dataset.url).then(done).catch(() => {});
      else done();
      return;
    }
    const a = e.target.closest("a");
    if (!isInternalPageLink(a)) return;
    const url = new URL(a.getAttribute("href"), location.href);
    if (url.pathname === location.pathname && url.hash) return; // same-page anchor
    e.preventDefault();
    spaNavigate(url.href, true).catch(() => { window.location.href = url.href; });
  });
  window.addEventListener("popstate", () => {
    spaNavigate(location.href, false).catch(() => { window.location.reload(); });
  });
}

async function init() {
  if (audio) {
    audio.addEventListener("play", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));
  }
  setupNavigation();
  setPlaying(false);

  // Render immediately from built-in content so sections are never empty.
  renderAll();

  // Then try to layer live daily content on top; re-render if it loads.
  try { await loadLiveContent(); renderAll(); } catch (e) { /* keep built-in */ }

  fetchMeta();
  setInterval(fetchMeta, 60000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
