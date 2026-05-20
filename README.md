# Fuyad Hasan Fahim — System Builder Interface

A futuristic, editorial portfolio for a Full Stack Developer · SaaS Builder · Automation Engineer.

Stack: **Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · GSAP · Framer Motion · Lenis · Tabler Icons · TypeScript**.

## Design system

- **Identity**: System Builder Interface × Editorial Typography × Futuristic Motion.
- **Palette**: Background `#0b0b0f`, glass surfaces, accents Cyan `#22d3ee`, Electric `#3b82f6`, Violet `#8b5cf6`.
- **Typography**:
    - Display — Space Grotesk (Satoshi/Clash Display equivalent, self-hosted via `next/font`).
    - Body — Inter.
    - Mono — JetBrains Mono.
- **Motion**:
    - GSAP `ScrollTrigger` for scroll-driven timelines.
    - Framer Motion for entrance/hover/micro interactions.
    - Lenis for smooth scrolling (auto-disabled with `prefers-reduced-motion`).

## Sections

1. **Hero** — Immersive aurora + grain + system status card, blur→sharp headline reveal.
2. **Trust** — Active Web Briks LLC engagement card + 4 verified HackerRank certifications.
3. **Projects** — Backup Core, HR Management SaaS, Dev HR Management, Client Portal, Cattle Firm Dashboard. Each card opens a full case-study modal.
4. **Skills** — System-grouped: Backend Architecture, Real-time Systems, Automation & Bots, API Engineering.
5. **Timeline** — Vertical scroll-progress timeline (career + education) animated with GSAP.
6. **Contact** — One-click email + copy + socials, with structured Person JSON-LD in the layout.

## Project structure

```
app/
├─ layout.tsx               # fonts, metadata, JSON-LD, grain overlay
├─ page.tsx                 # composition
├─ globals.css              # Tailwind v4 @theme + design tokens
├─ opengraph-image.tsx      # programmatic OG (1200×630)
├─ sitemap.ts / robots.ts   # SEO
├─ components/
│  ├─ ui/                   # GlassCard, Button, Badge
│  ├─ shared/               # NavBar, SectionHeader, GrainOverlay
│  ├─ animations/           # SmoothScroll (Lenis), ScrollProgress, CursorGlow, Reveal
│  └─ sections/
│     ├─ hero/              # Hero, HeroAurora, HeroSystemCard, HeroMetaStrip
│     ├─ trust/             # Trust
│     ├─ projects/          # Projects, ProjectCard (with modal)
│     ├─ skills/            # Skills
│     ├─ timeline/          # Timeline (GSAP scroll-trigger)
│     └─ contact/           # Contact
├─ lib/                     # cn(), site config
└─ data/                    # projects, skills, timeline, certificates
```

## Live

- Site: https://fuyadhasanfahim.com

## Install & run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

Build for production:

```bash
npm run build
npm run start
```

Useful checks:

```bash
npm run lint
```

> Build requires network access to fetch self-hosted Google Fonts at build time (Inter, Space Grotesk, JetBrains Mono). All fonts are then bundled — no runtime requests to Google.

## Performance

- Single static route, prerendered at build time.
- Smooth scroll & cursor effects auto-disabled when `prefers-reduced-motion: reduce`.
- All animations use transform/opacity/filter only.
- Tabler icons tree-shaken to per-icon ESM modules.

## SEO

- Static `Metadata` + `Viewport` on the root layout.
- Programmatic OpenGraph image via `app/opengraph-image.tsx`.
- `Person` schema.org JSON-LD inlined in the body.
- `sitemap.xml` and `robots.txt` generated via Next.js metadata routes.
