# 🎹 Harmonium Halt

**Play Online Web Harmonium, Learn Easily, Practice Daily**

Live: [www.harmoniumhalt.com](https://www.harmoniumhalt.com)

India's premier free online harmonium learning platform — interactive web harmonium, structured lessons from beginner to advanced, 25+ expert articles, and practice tools. All in a fast Astro static site.

---

## 🚀 Quick Start

```bash
# 1. Clone or unzip the project
cd harmonium-halt

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → http://localhost:4321

# 4. Build for production
npm run build
# → Output in /dist/

# 5. Preview production build
npm run preview
```

---

## 📁 Project Structure

```
harmonium-halt/
├── public/
│   ├── favicon.svg          # SVG favicon (harmonium icon)
│   ├── robots.txt           # Search engine crawling rules
│   ├── sitemap.xml          # Manual sitemap (55 pages)
│   └── site.webmanifest     # PWA manifest
│
├── src/
│   ├── components/
│   │   ├── Harmonium.astro  # ★ MAIN FEATURE: Fully playable web harmonium
│   │   ├── Navbar.astro     # Responsive navigation
│   │   ├── Footer.astro     # Site footer with links
│   │   ├── LessonCard.astro # Lesson preview card
│   │   └── BlogCard.astro   # Blog post card
│   │
│   ├── layouts/
│   │   └── Layout.astro     # Base layout: meta, OG, Twitter, schema, fonts
│   │
│   ├── pages/
│   │   ├── index.astro      # Homepage (hero + harmonium + lessons + blog)
│   │   ├── about.astro      # About page
│   │   ├── contact.astro    # Contact form
│   │   ├── notes.astro      # Notes & PDF downloads
│   │   ├── privacy-policy.astro
│   │   ├── terms.astro
│   │   ├── disclaimer.astro
│   │   ├── 404.astro
│   │   │
│   │   ├── lessons/
│   │   │   ├── index.astro                    # All lessons overview
│   │   │   ├── introduction-to-harmonium.astro # Full lesson with harmonium
│   │   │   ├── sa-re-ga-ma.astro              # Full lesson with harmonium
│   │   │   ├── alankars.astro                 # Full lesson with harmonium
│   │   │   ├── ragas-introduction.astro       # Full lesson
│   │   │   └── [16 more lesson pages]
│   │   │
│   │   ├── practice/
│   │   │   └── index.astro   # Full-page harmonium practice tool
│   │   │
│   │   └── blog/
│   │       ├── index.astro                     # Blog index (25 articles)
│   │       ├── learn-harmonium-at-home.astro   # Full 1800-word article
│   │       ├── sa-re-ga-ma-pa-guide.astro      # Full 1400-word article
│   │       ├── best-harmonium-for-beginners.astro # Full buying guide
│   │       ├── raga-yaman-harmonium.astro      # Full raga lesson
│   │       ├── alankars-for-harmonium.astro    # Full practice guide
│   │       └── [20 more blog posts]
│   │
│   └── styles/
│       └── global.css        # Global styles + harmonium keyboard CSS
│
├── astro.config.mjs          # Astro config (site URL, sitemap, tailwind)
├── tailwind.config.mjs       # Tailwind config (custom colors, fonts, animations)
└── package.json
```

---

## 🎹 Web Harmonium Features

The core feature — `src/components/Harmonium.astro` — includes:

| Feature | Details |
|---------|---------|
| **Sound Engine** | Web Audio API — sawtooth oscillators with detuning for reed-like tone |
| **Reverb** | Convolver node with generated impulse response |
| **Keyboard** | 2+ octaves, white + black keys, visual piano layout |
| **Key Labels** | Toggle between Indian (सा रे ग) and Western (C D E) notation |
| **Keyboard Shortcuts** | `A S D F G H J K L` (white), `W E T Y U` (black), `← →` (octave) |
| **Touch Support** | Full mobile/tablet touch support |
| **Octave Shift** | Octave − / + buttons (covers octaves 2–6) |
| **Volume Control** | Real-time gain control slider |
| **Note Display** | Shows currently pressed note name |
| **Sound Toggle** | On/Off switch for silent practice |
| **Multi-touch** | Basic chord support (multiple simultaneous notes) |

---

## 🌐 Deployment

### GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/deploy-pages@v4
        with:
          source_dir: dist
```

Add to `astro.config.mjs` if using a GitHub Pages subdirectory:
```js
base: '/harmonium-halt',  // only if not using custom domain
```

### Cloudflare Pages

1. Connect your GitHub repo to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`
4. No environment variables needed

### Direct Upload (any host)

```bash
npm run build
# Upload the /dist/ folder to any static host
```

---

## 📈 SEO Features

- **Meta tags**: title, description, canonical on every page
- **Open Graph**: og:title, og:description, og:image, og:type
- **Twitter Cards**: summary_large_image on all pages
- **JSON-LD Schema**: Organization, WebSite, Article, Course, BreadcrumbList
- **Sitemap**: `/sitemap.xml` with 55 URLs and priority/changefreq
- **robots.txt**: Allows all crawlers, points to sitemap
- **Canonical URLs**: Auto-generated from `Astro.site`
- **Semantic HTML**: Proper heading hierarchy, article/nav/header/main/footer

---

## 🎨 Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `saffron` | `#ff7710` | Primary CTAs, accents |
| `burgundy` | `#8d203d` | Secondary, advanced level |
| `gold` | `#f59e0b` | Highlights, ratings |
| `ivory` | `#faf7f0` | Background, text on dark |
| `ebony` | `#1a1008` | Primary text, dark backgrounds |

### Fonts (Google Fonts)
- **Display**: Playfair Display (headings)
- **Body**: Source Serif 4 (paragraphs)
- **Devanagari**: Tiro Devanagari Hindi (Hindi script)

---

## 📝 Content Overview

### Lessons (20 pages)
- **8 Beginner**: Introduction → Sargam → Finger placement → Komal/Tivra → Bhajans → Notation → Scales
- **6 Intermediate**: Alankars → Ragas intro → Yaman → Bhairavi → Chords → Taal
- **4 Advanced**: Improvisation → Bhairav → Bandish → Kirtan
- **3 Practice**: Daily riyaaz → Speed exercises → Ear training

### Blog (25 articles)
Full-length articles on: beginner guides, buying guides, raga deep-dives, practice methods, theory, history, maintenance, and song tutorials.

---

## 🛠 Customization

### Add a new lesson
1. Create `src/pages/lessons/my-lesson.astro`
2. Import `Layout`, `Harmonium`, set proper frontmatter
3. Add to `src/pages/lessons/index.astro` lessons array
4. Add to `sitemap.xml`

### Add a new blog post
1. Create `src/pages/blog/my-post.astro`
2. Import `Layout`, add Article JSON-LD schema
3. Add to `src/pages/blog/index.astro` articles array
4. Add to `sitemap.xml`

### Change the site URL
Edit `astro.config.mjs`:
```js
site: 'https://your-domain.com',
```

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `astro` | ^4.15 | Static site framework |
| `@astrojs/tailwind` | ^5.1 | Tailwind CSS integration |
| `@astrojs/sitemap` | ^3.1 | Sitemap generation |
| `tailwindcss` | ^3.4 | Utility CSS framework |

No JavaScript framework (React/Vue) needed — pure Astro + vanilla JS.

---

## 📄 License

Content and code © 2024 Harmonium Halt. All rights reserved.

Educational content is free to use for personal learning. Commercial use requires written permission.
