# Music History images

Drop an image in this folder and it automatically becomes the artwork for that
day's entry. No code changes, no config.

## Naming

Name the file after the date it belongs to, `MM-DD`:

    assets/history/11-06.jpg    ->  "I Feel Love" entry (Nov 6)
    assets/history/11-03.jpg    ->  Prince "Kiss" entry (Nov 3)
    assets/history/10-20.jpg    ->  "Billie Jean" entry (Oct 20)

Accepted extensions: `.jpg`, `.jpeg`, `.png`, `.webp` (checked in that order).

If no file exists for a date, the animated illustrated scene is shown instead —
so the page never breaks and never shows a blank box.

## Recommended size

- 1600 x 900 (16:9), JPEG, under ~400 KB
- Landscape. The card crops to 16:9, so keep the subject away from the edges.

## Adding a credit line

For licensed or archival photography, add a credit so it displays under the
story. Open `music-history.json`, find the entry, and add an `image` block:

    "image": {
      "src": "./assets/history/11-06.jpg",
      "alt": "A synthesizer console in a 1970s recording studio",
      "credit": "Photo by X / Wikimedia Commons (CC BY-SA 4.0)"
    }

The `src` is only needed if the filename doesn't follow the `MM-DD` convention.

## A note on sourcing

- **Your own images** (including ones you generate yourself): fine, no credit needed.
- **Archival / press / licensed photos**: always fill in `credit`, and make sure
  the license actually permits web use.
- **Do not** hotlink or copy images from other publications without permission —
  that's the one thing that reliably causes trouble.
