#!/usr/bin/env python3
"""
Cortelyou Road Radio - artwork for Today in Music History (Python version)
--------------------------------------------------------------------------
Same job as generate-images.mjs, for machines without Node. Standard library
only, so there is nothing to install.

Reads build/history/image-prompts.csv and writes assets/history/MM-DD.jpg for
any date that has no art yet. Uses Pollinations.ai: free, no account, no key.
A failed day is simply skipped; the site falls back to its animated scene, so
nothing ever breaks or shows a blank box.

Run from the repo root:

    python3 build/generate-images.py                # next 7 days
    FILL_ALL=1 python3 build/generate-images.py     # backfill, 40 per run
    FILL_ALL=1 MAX_PER_RUN=0 python3 build/generate-images.py   # no cap

Env: DAYS_AHEAD, FILL_ALL, MAX_PER_RUN, RETRIES, POLLINATIONS_TOKEN
"""
import csv
import datetime
import os
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "assets", "history")
PROMPTS = os.path.join(ROOT, "build", "history", "image-prompts.csv")

DAYS_AHEAD = int(os.environ.get("DAYS_AHEAD", "7"))
FILL_ALL = os.environ.get("FILL_ALL") == "1"
MAX_PER_RUN = int(os.environ.get("MAX_PER_RUN", "40"))
RETRIES = int(os.environ.get("RETRIES", "2"))
WIDTH, HEIGHT = 1600, 900
MIN_BYTES = 20000
TIMEOUT = 180


def key_for(offset):
    d = datetime.date.today() + datetime.timedelta(days=offset)
    return d.strftime("%m-%d")


def has_art(key):
    return any(os.path.exists(os.path.join(OUT_DIR, key + "." + ext))
               for ext in ("jpg", "jpeg", "png", "webp"))


def generate(prompt, seed):
    url = ("https://image.pollinations.ai/prompt/"
           + urllib.parse.quote(prompt, safe="")
           + f"?width={WIDTH}&height={HEIGHT}&model=flux&nologo=true&seed={seed}")
    req = urllib.request.Request(url, headers={
        "User-Agent": "CortelyouRoadRadio/1.0 (+https://cortelyouroadradio.com)"
    })
    token = os.environ.get("POLLINATIONS_TOKEN")
    if token:
        req.add_header("Authorization", "Bearer " + token)

    with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
        ctype = res.headers.get("Content-Type", "")
        if not ctype.startswith("image/"):
            raise RuntimeError("not an image (%s)" % ctype)
        buf = res.read()
    if len(buf) < MIN_BYTES:
        raise RuntimeError("suspiciously small (%db)" % len(buf))
    return buf


def target_keys(by_date):
    if not FILL_ALL:
        return [key_for(i) for i in range(DAYS_AHEAD)]
    # Whole calendar, soonest gaps first, wrapping around the year.
    all_keys = sorted(by_date)
    today = key_for(0)
    start = next((i for i, k in enumerate(all_keys) if k >= today), 0)
    return all_keys[start:] + all_keys[:start]


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    if not os.path.exists(PROMPTS):
        sys.exit("No prompt file at %s — run build/history/make-prompts.py first." % PROMPTS)

    with open(PROMPTS, newline="", encoding="utf-8") as f:
        by_date = {row["date"]: row for row in csv.DictReader(f)}

    made = skipped = failed = 0

    for key in target_keys(by_date):
        if MAX_PER_RUN and made >= MAX_PER_RUN:
            print("\nReached MAX_PER_RUN=%d; stopping. Run again to continue." % MAX_PER_RUN)
            break
        row = by_date.get(key)
        if not row:
            print("· %s  no prompt on file" % key)
            continue
        if has_art(key):
            skipped += 1
            if not FILL_ALL:
                print("· %s  already has art" % key)
            continue

        base_seed = sum(ord(c) for c in key) * 7
        sys.stdout.write("▸ %s  generating… " % key)
        sys.stdout.flush()

        for attempt in range(RETRIES + 1):
            try:
                buf = generate(row["prompt"], base_seed + attempt)
                with open(os.path.join(OUT_DIR, key + ".jpg"), "wb") as out:
                    out.write(buf)
                print("ok (%d KB) — %s" % (len(buf) // 1024, row["title"][:52]))
                made += 1
                time.sleep(4)          # be a good neighbour to a free service
                break
            except Exception as e:                      # noqa: BLE001
                if attempt < RETRIES:
                    sys.stdout.write("retry %d… " % (attempt + 1))
                    sys.stdout.flush()
                    time.sleep(8 * (attempt + 1))       # back off before retrying
                else:
                    print("failed: %s  (scene artwork will be used)" % e)
                    failed += 1

    print("\nDone. created=%d existing=%d failed=%d" % (made, skipped, failed))
    if FILL_ALL:
        remaining = sum(0 if has_art(k) else 1 for k in by_date)
        print("Calendar days still without art: %d" % remaining)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nStopped. Progress is saved — run again to continue.")
