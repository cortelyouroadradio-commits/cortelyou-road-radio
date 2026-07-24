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
Connected to Netlify; every push to `main` publishes automatically. Publish
directory is the repo root (`.`), no build command.

## Daily updates
See `build/SETUP-DAILY.md`.
