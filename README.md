# Tamizh · dance teacher website

Single-page site: `index.html` (content), `styles.css` (look), `script.js` (WhatsApp, menu, effects). No build step.

## Preview it locally

```bash
cd /Users/nandy/Documents/Prototype/tamizh-dance-site
python3 -m http.server 5200
```
Then open http://localhost:5200

## 1. WhatsApp number and email (do this first)

Open `script.js`. The top block is the only place to edit:

```js
const CONFIG = {
  whatsapp: "91XXXXXXXXXX",          // country code + number, digits only → e.g. "919876543210"
  whatsappDisplay: "+91 XXXXX XXXXX", // how it is shown on the page
  message: "Hi! I want to know about dance classes and book a free trial.",
  email: "hello@example.com",
};
```
Every WhatsApp button, the floating button and the enquiry form use these values.
Each class card and pricing button can send its own message: edit its `data-msg="…"` in `index.html`.

## 2. Photos

Replace the file but **keep the same file name**, or update the `src` in `index.html`.

| Spot | File | Size tip |
|---|---|---|
| Hero (top) | `assets/tamizh-hero.jpg` | portrait, ~1000×1400, face in the upper third |
| About | `assets/about-placeholder.svg` → save a photo as `assets/about-photo.jpg` and change the `src` | portrait, ~900×1100 |
| Gallery (6) | `assets/gallery/photo-1.svg` … `photo-6.svg` → save as `photo-1.jpg` … and change each `src` from `.svg` to `.jpg` | portrait 4:5, ~800×1000 |
| Social share image | `og:image` in `<head>` (currently the hero photo) | 1200×630 works best |

Also update each photo's `alt="…"` text so it describes what is in the photo (good for SEO and screen readers).
Keep photos under ~300 KB each. Compressing them at squoosh.app keeps the site fast.

## 3. Videos

- **YouTube video (first card):** change `data-yt="_DQ0zIYpv1A"` to another video ID (the part after `watch?v=`). Change the thumbnail URL in the `img src` to match: `https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg`.
- **Your own clips (cards 2 and 3):** put MP4 files in `assets/videos/` named `clip-1.mp4` and `clip-2.mp4`. Optional: replace `assets/video-poster.svg` with a still image from the clip.
- Edit the caption under each video in `<p class="video-title">`.

## 4. Text

All text is in `index.html`, in order of the page. Search for these markers:

- `<!-- REPLACE` shows something to swap (photos, videos, prices)
- `<!-- CONFIRM` shows a claim to check with Tamizh before going live:
  - Kids & Teens batches
  - Wedding & Sangeet choreography
  - Online classes
  - Free trial class
- **Testimonials:** these are samples. Replace them with real student quotes (with permission), then delete the `<span class="sample">Sample review</span>` lines.
- **Private class price:** change "Ask" in the Private / Online plan.
- **Schedule:** the table in the Pricing section.

## 5. Colours and fonts

Top of `styles.css`:
- `--accent: #ff4d2e;` is the single accent colour.
- `--bg`, `--bg-2`, `--text` set the dark theme.
- Fonts: Shrikhand (headings) and Bricolage Grotesque (body), loaded from Google Fonts in `index.html`.

## 6. Before going live

- [ ] Real WhatsApp number and email in `script.js`
- [ ] Real domain in `<link rel="canonical">` and `og:url` (`index.html` head)
- [ ] All `CONFIRM` items checked with Tamizh
- [ ] Sample testimonials replaced
- [ ] Photos and videos replaced, alt text updated
- [ ] Tap every WhatsApp button on a real phone
