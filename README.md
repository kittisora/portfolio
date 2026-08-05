# kittipong.org

Personal portfolio and case-study site for **Kittipong Sorasuchart** — AI Specialist & DevOps Engineer.

🌐 **Live:** [kittipong.org](https://kittipong.org)

A statically-rendered Next.js App Router site: a single-page homepage (hero, work, services, about, contact), a services page, and six long-form engineering case studies.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Requires **Node.js 20.9+**. This project uses **npm** — `package-lock.json` is the authoritative lockfile.

## Scripts

| Script                 | What it does                                         |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Dev server with Turbopack on port 3000                |
| `npm run build`        | Production build (also runs the TypeScript compiler)  |
| `npm start`            | Serve the production build                            |
| `npm run typecheck`    | `tsc --noEmit`                                        |
| `npm run lint`         | ESLint (flat config, `next/core-web-vitals`)          |
| `npm run format`       | Prettier write                                        |
| `npm run format:check` | Prettier check                                        |

## Tech stack

| Layer      | Choice                                                  |
| ---------- | ------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, fully static output)  |
| Language   | TypeScript 5.9                                           |
| UI runtime | React 19                                                 |
| Styling    | Tailwind CSS v4.2 + CSS custom properties                |
| Components | React Aria Components (+ a few Untitled UI primitives)   |
| Icons      | `@untitledui/icons`                                      |
| Theming    | `next-themes` (light/dark, system-aware)                 |
| 3D         | `three` — interactive hero grid, lazy-loaded off the initial bundle |
| Motion     | CSS transitions + `IntersectionObserver` scroll reveals  |
| Fonts      | Inter + Playfair Display via `next/font/google`          |

The dependency list is deliberately small — 13 runtime packages. This started as the
Untitled UI Next.js starter kit; everything the site does not import has been removed.

## Routes

Every route prerenders as static content.

| Route                   | Page                                                                  |
| ----------------------- | --------------------------------------------------------------------- |
| `/`                     | Homepage — hero, work, services, about, contact                        |
| `/services`             | Services and engagement models                                         |
| `/privacy-policy`       | Privacy policy                                                         |
| `/work/server-monitor`  | Cloud Monitoring Dashboard — Prometheus / Grafana observability stack   |
| `/work/site-auditor`    | Site Auditor — multi-dimension site audit platform                     |
| `/work/unique-leverage` | Unique Leverage — AI marketing automation for car dealers              |
| `/work/arrow-market`    | Arrow Markets — options trading interface                              |
| `/work/ogedge`          | OGEdge — esports coaching platform                                     |
| `/work/big-rentals`     | BigRentals — equipment rental marketplace                              |

Generated automatically: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`.

## Project structure

```
src/
├── app/                       # App Router — one folder per route
│   ├── layout.tsx             # Root layout: fonts, metadata, header/main/footer, skip link
│   ├── page.tsx               # / (renders home-page.tsx)
│   ├── home-page.tsx          # Homepage sections
│   ├── not-found.tsx          # 404
│   ├── opengraph-image.tsx    # Generated 1200x630 social card
│   ├── sitemap.ts             # /sitemap.xml
│   ├── robots.ts              # /robots.txt
│   ├── manifest.ts            # /manifest.webmanifest
│   ├── services/
│   ├── privacy-policy/
│   └── work/<slug>/           # page.tsx (metadata + JSON-LD) + <slug>-page.tsx (content)
├── components/
│   ├── portfolio/             # Header, footer, theme toggle, Contra button, hero grid
│   ├── base/                  # button, badges
│   └── foundations/           # dot icon, social icons
├── lib/site.ts                # Single source of truth for URL, name, socials, JSON-LD
├── hooks/use-fade-up.ts       # IntersectionObserver scroll reveal
├── hooks/use-mounted.ts       # SSR-safe hydration flag
├── providers/                 # Theme + router context
├── styles/                    # globals.css, theme.css, typography.css, portfolio.css
└── utils/                     # cx(), view-transition navigation, helpers
```

`public/` holds case-study screenshots, one folder per project.

Everything under `src/` is reachable from a route — 48 files. If you add a file that
nothing imports, it does not belong here.

## Architecture notes

**Each case-study route is two files.** `page.tsx` is a server component holding only `metadata` and the JSON-LD script; `<slug>-page.tsx` is the `"use client"` content component. Metadata stays server-rendered while the content can use scroll-reveal hooks.

**SEO config has one source of truth.** `src/lib/site.ts` exports `SITE_URL`, `SITE_NAME`, `CASE_STUDY_SLUGS`, the social links, and the schema.org builders (`personJsonLd`, `websiteJsonLd`, `caseStudyJsonLd`). `sitemap.ts` and `robots.ts` import from it — don't hardcode the domain anywhere else.

**Social cards are generated, not hand-cropped.** `src/app/opengraph-image.tsx` renders a 1200×630 card at build time via `next/og`. Routes inherit it automatically; the case studies override it with their own screenshot and must declare that image's *real* pixel dimensions.

**Adding a case study** — create `src/app/work/<slug>/`, add the slug to `CASE_STUDY_SLUGS` in `src/lib/site.ts` (this is what puts it in the sitemap), and add an entry to the `projects` array in `src/app/home-page.tsx`.

**Motion.** Scroll reveals use an `IntersectionObserver` (`use-fade-up.ts`) that adds a `.visible` class. `prefers-reduced-motion: reduce` is honoured in `src/styles/portfolio.css` — reduced-motion users get the content immediately, with no transition. A `@media (scripting: none)` guard makes `.fade-up` content visible when JS never runs, so the page can never render blank.

**Performance budget.** Images in `public/` are WebP and must stay there — the site is deployable to a static host where the Next image optimizer never runs, so source weight *is* delivered weight. three.js is behind `next/dynamic` and must not be imported eagerly; its WebGL loop pauses when the hero scrolls out of view. LCP images carry both `priority` and `fetchPriority="high"` (Next's `priority` alone does not emit the latter).

## Customization

- **Brand color** — edit the `--color-brand-*` scale in `src/styles/theme.css`. It feeds both light and dark mode.
- **Portfolio-specific tokens** — `src/styles/portfolio.css` (`--dark-bg`, `--font-serif`, transition speeds).
- **Identity, socials, structured data** — `src/lib/site.ts`.
- **Logo** — `src/assets/logo/`.
- **Colors in markup** — use semantic tokens (`text-primary`, `bg-secondary`, `border-brand`), not raw palette classes like `text-gray-900`.

## Deployment

The build emits fully static pages, so any static host works.

No host configuration is committed — there is no `vercel.json`, Dockerfile, or deploy workflow. If you fork this, wire up your own. For Vercel, importing the repo needs no configuration; the defaults are correct.

`.github/workflows/ci.yml` runs typecheck, lint, and build on pushes and PRs to `master` and `staging`. It does not deploy.

## Attribution and license

The site code is MIT licensed — see [LICENSE](LICENSE).

One carve-outs matter:
- **Site content is not licensed for reuse.** Case-study copy, client screenshots, and photographs are published for portfolio purposes only.
