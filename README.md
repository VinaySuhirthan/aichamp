# AI bis Champ — Website

**"Because Quality Matters"**  
AI-powered creative services led by Dr. G. Nalinipriya, Professor and AI Specialist.

---

## Quick Start

```bash
cd ai-bis-champ
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 16 (App Router) | React framework, routing, SSG |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| GSAP + ScrollTrigger | Page animations and scroll storytelling |
| Lenis | Buttery smooth scroll |
| Three.js | Hero particle field (lazy-loaded, desktop) |
| `next/font` | Self-hosted Google Fonts (Playfair Display, Inter) |
| `next/image` | Optimised image delivery |

---

## Editing Content

**All site text, services, dates, prices, and data live in one file:**

```
src/content/content.ts
```

You do not need to touch any component to update content. Every export in that file is documented below.

### `site` — Brand and contact info
```ts
site.name          // "AI bis Champ"
site.tagline       // "Because Quality Matters"
site.email         // Contact email
site.whatsapp      // WhatsApp number (e.g. +911234567890)
site.social        // Instagram, YouTube, LinkedIn, Twitter URLs
```

### `hero` — Hero section
```ts
hero.headline      // Array of headline lines
hero.subhead       // Supporting statement
hero.cta1 / cta2   // Button labels and links
```

### `services` — All 15 services in 4 categories
Each service item has:
- `name` — display name
- `description` — one-line description
- `number` — numbering label (e.g. "01.2")
- `id` — used for icons (do not change)

### `about` — Dr. G. Nalinipriya profile
```ts
about.name, about.title   // Name and title
about.bio                 // Array of bio paragraphs
about.credentials         // Array of {label, value} credential items
about.portrait            // Portrait image src and alt text
```

### `masterclass` — Masterclass event
```ts
masterclass.date           // e.g. "Saturday, 15 November 2025"
masterclass.time           // e.g. "10:00 AM – 1:00 PM IST"
masterclass.price          // e.g. "₹999 / Free for early registrants"
masterclass.registrationLink // URL to your registration form or payment page
masterclass.whatYouLearn   // Array of learning points
masterclass.whoIsItFor     // Array of target audience descriptions
masterclass.faq            // Array of {q, a} objects
```

### `testimonials` — Client testimonials
Replace each `[PLACEHOLDER: ...]` entry with a real client quote, name, and title.

### `faq` — Frequently asked questions
Array of `{q, a}` objects. Edit or add freely.

### `stats` — Hero stats strip
```ts
stats = [{ value: 15, suffix: "+", label: "Services Offered" }, ...]
```

### `footer.legal` — Legal page links
Links to `/privacy`, `/terms`, `/disclaimer`, `/refund`.

---

## Image Pipeline & Assets

The site includes an automated image pipeline using `sharp`.
All original high-res assets in `4mentor/data/` (e.g. `1.webp` through `18.webp`) are converted and optimized into `public/images/` with responsive variants (`-sm`, `-md`, `-lg`):

```bash
npm run process-images
```

- **Dr. G. Nalinipriya's Portrait**: Loaded directly via `next/image` from `/images/18.webp` in `src/components/sections/About.tsx`.
- **Selected Work / Portfolio**: Project cards in `src/components/sections/Work.tsx` display real optimized visuals (`13.webp`, `4.webp`, `7.webp`, `15.webp`) with hover reveal interactions and full-fidelity case study modals.
- **To add new images**: Drop source images (`.webp`, `.jpg`, `.png`, `.avif`, `.heic`) into `data/` and run `npm run process-images`. Reference the generated `/images/[name].webp` in `src/content/content.ts`.

---

## Legal Pages

The following pages have placeholder content that **must be replaced by a qualified legal professional** before you go live:

- `/privacy` → `src/app/privacy/page.tsx`
- `/terms` → `src/app/terms/page.tsx`
- `/disclaimer` → `src/app/disclaimer/page.tsx`
- `/refund` → `src/app/refund/page.tsx`

---

## SEO Configuration

- **Domain**: Update all `https://aibischamp.com` references in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts` with your actual domain before deployment.
- **OG Image**: Add a `public/og-image.jpg` file (1200×630px) for social sharing previews.
- **Favicon**: Replace `public/favicon.svg` or `public/favicon.ico` with your actual brand mark.
- **Structured Data**: Organization and Event schema are embedded in `src/app/page.tsx` and `src/app/masterclass/page.tsx`.

---

## Deployment on Vercel

### One-Click Deploy
1. Push this project to a GitHub repository
2. Visit [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your repository
4. Vercel detects Next.js automatically — leave all settings as default
5. Click **Deploy**

### Environment Variables
No environment variables are required for the default setup. If you add a backend form handler or CMS, add keys in the Vercel dashboard under **Settings → Environment Variables**.

### Custom Domain
1. In the Vercel dashboard, go to **Settings → Domains**
2. Add your domain (e.g. `aibischamp.com`)
3. Update DNS as instructed by Vercel

### Updating the Site
Push any code change to your main branch — Vercel rebuilds and deploys automatically in ~30 seconds.

---

## Performance Notes

- Three.js hero canvas is lazy-loaded via `next/dynamic` with `ssr: false` — it does not block the initial render
- All GSAP animations respect `prefers-reduced-motion` — users with that setting see clean static content
- Lenis smooth scrolling is disabled for reduced-motion users
- Custom cursor is disabled on touch devices
- Mobile: simplified particle animations, no custom cursor, lighter parallax

---

## Folder Structure

```
src/
  app/                 ← Next.js App Router pages
    layout.tsx         ← Root layout, fonts, metadata
    page.tsx           ← Homepage (all sections)
    masterclass/       ← Dedicated masterclass page
    privacy/           ← Legal pages
    terms/
    disclaimer/
    refund/
    sitemap.ts         ← Auto-generated sitemap
    robots.ts          ← Robots.txt
  components/
    layout/            ← Header, Footer, Cursor, Preloader, etc.
    sections/          ← Hero, Services, About, Process, Work,
                         Masterclass, Testimonials, FAQ, Contact
    ui/                ← Accordion, HeroCanvas (Three.js)
  content/
    content.ts         ← ALL editable text and data
  styles/
    globals.css        ← Design tokens, animations, base styles
public/
  images/              ← Add portrait and project images here
  videos/              ← Add project preview videos here
  favicon.svg          ← Replace with final brand mark
  og-image.jpg         ← Add 1200x630px social sharing image
```

---

## Placeholders Still to Replace

The following items need real content before launch:

| # | Item | Location |
|---|---|---|
| 1 | Portrait of Dr. G. Nalinipriya | `public/images/portrait-placeholder.jpg` → update `content.ts` `about.portrait.src` |
| 2 | WhatsApp number | `content.ts` → `site.whatsapp` |
| 3 | Phone number | `content.ts` → `site.phone` |
| 4 | Business address | `content.ts` → `site.address` |
| 5 | Instagram URL | `content.ts` → `site.social.instagram` |
| 6 | YouTube URL | `content.ts` → `site.social.youtube` |
| 7 | LinkedIn URL | `content.ts` → `site.social.linkedin` |
| 8 | Twitter/X URL | `content.ts` → `site.social.twitter` |
| 9 | Masterclass date | `content.ts` → `masterclass.date` |
| 10 | Masterclass time | `content.ts` → `masterclass.time` |
| 11 | Masterclass price | `content.ts` → `masterclass.price` |
| 12 | Masterclass registration link | `content.ts` → `masterclass.registrationLink` |
| 13 | 3 client testimonials (quotes, names, roles) | `content.ts` → `testimonials.items` |
| 14 | 4 portfolio project titles, images, categories | `content.ts` → `work.projects` |
| 15 | Portfolio case study content | `src/components/sections/Work.tsx` modal |
| 16 | Privacy Policy text | `src/app/privacy/page.tsx` |
| 17 | Terms of Service text | `src/app/terms/page.tsx` |
| 18 | Disclaimer text | `src/app/disclaimer/page.tsx` |
| 19 | Refund Policy text | `src/app/refund/page.tsx` |
| 20 | OG image (1200×630px) | `public/og-image.jpg` |
| 21 | Favicon | `public/favicon.svg` |
| 22 | Production domain | `src/app/layout.tsx`, `sitemap.ts`, `robots.ts` |
| 23 | Contact form backend | `src/components/sections/Contact.tsx` `handleSubmit` |

---

## Contact Form Integration

The contact form currently simulates submission. To wire it to a real backend:

**Option A — Formspree (easiest)**
```ts
// In Contact.tsx handleSubmit:
const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

**Option B — Resend / Nodemailer**
Create `src/app/api/contact/route.ts` as a Next.js API route and POST to it.

---

*Built by AI bis Champ — Because Quality Matters.*
