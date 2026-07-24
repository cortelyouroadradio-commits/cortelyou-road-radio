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
  const pool = pools[name];
  if (!pool || !pool.length) return;
  const index = Number(p.get("index") || 0);
  const base = pool[(((index % pool.length) + pool.length) % pool.length)];
  const item = { ...base, poolName: name, index };
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
  setHTML("storyBody", `<p>${item.body || item.summary}</p>${credit}${photoCredit}`);
}

/* ---------- Init ---------- */
function setupReveal() {
  const els = document.querySelectorAll(".c-card, .c-mini, .c-story");
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
  else { renderPools(); renderBriefing(); setupReveal(); }
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
