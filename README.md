# The Edie Diaries 🐾

A small static blog about our new kitten, **Edie**, who came home at 9 weeks old on April 5, 2026.

The site is a single page of static HTML, CSS and vanilla JS — designed to be hosted as-is on GitHub Pages.

## Contents
- `index.html` — the page
- `styles.css` — all the styles
- `script.js` — renders the photo timeline and wires up the per-photo comment forms
- `images/` — the photos, pre-sorted by the date they were taken

## Features
- **Timeline view** built from each photo's EXIF `DateTimeOriginal`, so posts are always in the order the pictures were actually taken.
- **Age / day-home counter** on every post, calculated from her gotcha day.
- **Comments on every photo** (and a guestbook at the bottom) — comments are persisted to `localStorage` so each visitor can leave their own notes. Swapping in a real backend later is a matter of replacing the `readComments` / `writeComments` helpers in `script.js`.
- **Lightbox** view: click any photo to see a larger version.

## Running locally
It's just static files, so either open `index.html` directly or serve the folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/.

## Adding a new post
1. Drop the photo in `images/` (keep the file size reasonable — the checked-in photos are resized to 1600px wide).
2. Add an entry to the `POSTS` array in `script.js` with the photo's `DateTimeOriginal`, a title, alt text and body copy.
3. Commit and push — GitHub Pages does the rest.
