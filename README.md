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

## Daily updates
The daily refresh no longer commits to the repo. A GitHub Action
(`.github/workflows/daily-content.yml`) simply POSTs to a Netlify build hook
(stored as the `NETLIFY_BUILD_HOOK` repo secret) every morning, which triggers
a fresh Netlify build. Because nothing is committed by the bot, **only you ever
write to `main`** — your manual pushes can never collide with the daily job.
You can also trigger it by hand from the repo's Actions tab ("Run workflow").
