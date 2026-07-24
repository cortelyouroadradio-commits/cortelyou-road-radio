# Daily auto-updates — setup

This makes the site refresh itself every morning: a GitHub Action pulls fresh
stories, commits `content.json`, and Netlify redeploys automatically. No manual
step once it's connected.

## How it works
- `build/build-content.js` pulls public RSS feeds (music news, Ditmas/Flatbush
  news, Brooklyn news) and updates the `music`, `ditmas`, and `brooklyn` pools in
  `content.json`. Each card credits the outlet ("via …") and links to the
  original — standard news aggregation, not copying.
- The `chart` pool has no reliable free feed, so the script **preserves**
  whatever is already there (keep it curated, or add a paid chart source later).
- `.github/workflows/daily-content.yml` runs the build daily and commits the
  result. Netlify, connected to the repo, redeploys on that commit.

## One-time setup (your accounts)

**1. Put this folder in its own Git repo and push to GitHub.**
```bash
cd "cortelyou-road-radio-staging"
git init
git add .
git commit -m "Cortelyou Road Radio — redesign"
```
Create an empty repo on github.com (e.g. `cortelyou-road-radio`), then:
```bash
git remote add origin git@github.com:<your-username>/cortelyou-road-radio.git
git branch -M main
git push -u origin main
```

**2. Connect Netlify to the repo.**
In Netlify → Add new site → Import an existing project → pick the GitHub repo.
- Build command: *(leave blank)*
- Publish directory: `.` (the repo root)
Deploy. This replaces manual `netlify deploy` — every push now publishes itself.

**3. Turn on the daily job.**
The workflow is already in the repo. In the repo's **Actions** tab, enable
workflows if prompted, then open **"Daily content refresh" → Run workflow** once
to confirm it commits and Netlify redeploys. After that it runs every morning.

## Test locally first (optional, needs Node)
```bash
cd build
npm install
npm run build      # updates ../content.json from live feeds
```

## Tuning
- Feeds / sources: edit `GROUPS` at the top of `build-content.js`.
- Run time: edit the `cron` line in `daily-content.yml` (UTC).
- Charts: add a data source to `build-content.js`, or refresh that pool by hand.
