# Cortelyou Road Radio

The website for Cortelyou Road Radio — Ditmas Park and Brooklyn's daily soundtrack.

A static site (HTML/CSS/JS, no build step) with a live Radio.co player and a
daily-refreshed editorial feed.

## Structure
- `index.html`, `music-news.html`, `ditmas-park.html`, `brooklyn-events.html`,
  `listen-live.html`, `sponsor.html`, `about.html`, `story.html`, `thanks.html`
- `styles.css` — design system
- `app.js` — live player + content engine (reads `content.json`)
- `content.json` — the day's stories (refreshed automatically; see `build/`)
- `assets/` — logos and artwork
- `build/` — daily content builder (`build-content.js`) + setup guide
- `.github/workflows/daily-content.yml` — runs the builder every morning

## Deploy
Connected to Netlify; every push to `main` publishes automatically. On each
deploy Netlify runs `build/build-content.js` (see the `command` in
`netlify.toml`) to regenerate `content.json` from live feeds. The committed
`content.json` is just a seed/fallback — if a feed hiccups, the last good copy
ships instead (`|| true` guard).

## Freshness rules
Every feed-driven pool (`music`, `chart`, `ditmas`, `brooklyn`) is age-capped
in `build/build-content.js` via `maxAgeDays`, so a card is never quietly weeks
old. Caps relax automatically rather than letting a rail ship empty.

`chart` used to be a hand-curated pool the builder deliberately skipped, which
is why its cards and artwork froze in place between manual edits. It is now
feed-driven like the rest (Billboard plus chart-flavoured items filtered out of
the music outlets) and refreshes daily with the outlet's own photography.
**Don't re-add a hardcoded `chart` array to `content.json`** — the builder
overwrites it, and a stale one only reappears if a build fails.

Every card renders a dateline (`3h ago`, `Yesterday`, `Jul 16`) and each
section carries an "Updated today" stamp driven by `content.json`'s
`generatedAt`. Items older than 30 days are dropped client-side when enough
fresh ones remain to fill the rail.

## Daily updates
The daily refresh no longer commits to the repo. A GitHub Action
(`.github/workflows/daily-content.yml`) simply POSTs to a Netlify build hook
(stored as the `NETLIFY_BUILD_HOOK` repo secret) every morning, which triggers
a fresh Netlify build. Because nothing is committed by the bot, **only you ever
write to `main`** — your manual pushes can never collide with the daily job.
You can also trigger it by hand from the repo's Actions tab ("Run workflow").
