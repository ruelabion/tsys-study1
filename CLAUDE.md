# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # Type-check with tsc --noEmit (no separate test suite)
npm run preview   # Preview production build
```

## Project Identity

This is the **T'sys Industrial Controls Inc.** website — an industrial B2B supplier of HIMEL low-voltage electrical products and Fuji Electric variable frequency drives. The company also fabricates custom switchgear, panelboards, and busway systems.

- **Contact**: (02) 8687 3006 | 0917 563 1925 | sales@tsys.com.ph
- **Address**: Unit 4, 2F LRC Bldg., 179 Mayon St., Brgy. Silangan, Quezon City, Philippines
- **Brand guideline**: `/Users/ruelabion/Sites/tsys.com.ph/Design.md`
- **Old website (content source)**: `/Users/ruelabion/Sites/tsys.com.ph/tsys-website-claude/offline/`

## Architecture

React 19 SPA (Vite 6 + TypeScript + Tailwind CSS v4). No React Router — navigation is a typed state machine in `App.tsx`.

### Page State (`App.tsx`)

```ts
type PageState =
  | { page: 'home' }
  | { page: 'products'; category?: ProductCategory }
  | { page: 'product'; productId: string }
  | { page: 'about' }
  | { page: 'form' }
  | { page: 'settings' }
```

All page transitions use `motion/react` `AnimatePresence`. The `settings` page is a retained demo page (not in the T'sys navigation). `profile` page (UserProfile) is also a demo page — kept but not linked from main nav.

### Product Data (`src/data/products.ts`)

Single source of truth for all 11 products. Key exports:
- `products` — default export, full array
- `getProductById(id)` — used by ProductDetail
- `getProductsByCategory(category)` — used for filtering
- `getProductCountByCategory(category)` — used by CategoryGrid for counts

**Product categories** (`ProductCategory` type):
- `electrical-control` — HIMEL MCB, MCCB/ACB, Manual Starter + Contactors
- `industrial-automation` — Fuji Electric FRENIC series (ACE, HVAC, AQUA, MEGA)
- `panel-system` — Switchgear, T-LINE Panelboard, Busway, Cable Tray
- `industrial-communication` — placeholder (no products yet)
- `accessories` — placeholder (no products yet)

### Navigation flow

CategoryGrid → `onNavigateCategory(cat)` → ProductList (filtered) → `onSelectProduct(id)` → ProductDetail → `onBack()` → ProductList

ProductDetail also has a Related Products strip that calls `onSelectProduct(id)` to navigate between products.

### Design system (`src/index.css`)

Tailwind v4 `@theme` tokens:

| Token | Value | Usage |
|---|---|---|
| `font-headline` | Montserrat | All h1–h4, `.label-caps`, `.font-headline` |
| `font-sans` | Open Sans | Body text |
| `primary` | `#D62828` | CTA buttons and action anchors **only** — do not overuse |
| `deep-blue` | `#1F3A5F` | Navigation, headers, trust sections, footer |
| `deep-blue-dark` | `#162d4a` | Footer bottom bar |
| `secondary` | `#6C757D` | Body text, subheadings, icon tint |
| `surface-container` | `#E5E7EB` | Section backgrounds, dividers |
| `px-margin` | `clamp(16px, 5vw, 64px)` | All full-width section padding |
| `.label-caps` | 12px bold uppercase Montserrat | Section labels, badges, table headers |

Max content width: `max-w-[1440px] mx-auto`. Fixed header height: `100px` (36px top bar + 64px nav) — use `mt-[100px]` or `pt-[100px]` on page-level sections.

### Images (`public/images/`)

All images copied from old Joomla site. Structure:
```
public/images/
  slideshow/        sl-1.jpg, sl-2.jpg, sl-3.jpg (hero backgrounds)
  products/         top-level product shots + resized thumbnails
    mcb/            HDB6s and HDB9 pole variants
    mccb/           HDM6s frame variants
    acb/            HDW6 ACB variants
    mp/             HDC6 contactors, HDR6 relay
    busduct/        busduct and elbow variants
    cabletray/      cable tray fittings
    panelboard/     NEMA 1 panelboard variants
    switchgear/     LVSG, MVSG, HVSG, ECBM
  tsys/             tsysteam_img.png, contactperson.png, aboutus_sig.png
```

Note: Fuji Electric VFD product photos (HVAC/ACE/AQUA/MEGA JPGs) were **not present** in the offline archive. Current product data uses placeholder images from the `pl_*.png` thumbnail set for those products.

### Path alias

`@` resolves to the project root.

---

## Change History

### Session 1 — Brand guideline implementation
Applied `/Users/ruelabion/Sites/tsys.com.ph/Design.md` across all components:
- `src/index.css`: Replaced Space Grotesk + Inter with Montserrat + Open Sans; updated color tokens to Design.md palette (primary `#D62828`, deep-blue `#1F3A5F`, steel-gray `#6C757D`)
- `Header`: Added Deep Blue top bar with tagline + contact info; rebranded to T'sys; streamlined nav
- `Hero`: Split white/red headline ("INDUSTRIAL SOLUTIONS. / BUILT FOR RELIABILITY."); Deep Blue gradient overlay
- `CategoryGrid`: Replaced bento/dark-card layout with uniform 5-column professional grid
- `TrustSection`: Replaced 2-column photo layout with 4-column value pillars on light gray
- `TechSpecs`: Repurposed as OUR SERVICES section (photo + 2×2 service grid)
- `Footer`: Full Deep Blue 4-column footer with T'sys contact info and company address
- `App.tsx`: CTA banner changed from red to Deep Blue; added Trusted Brands strip

### Session 2 — Old website content + product migration
Migrated all content and images from old Joomla site at `/tsys-website-claude/offline/`:
- Copied 56 images to `public/images/` preserving folder structure
- Created `src/data/products.ts` with all 11 real products (3 HIMEL, 4 Fuji Electric, 4 panel/system)
- Rewrote `ProductDetail.tsx` as data-driven component (variant switcher, specs table, stock listing, related products)
- New `ProductList.tsx` — catalog page with sticky category filter bar and product card grid
- New `About.tsx` — company history (est. 2002), team photo, capabilities checklist, mission & values
- Updated `DataEntry.tsx` — real contact form with T'sys phone/email/address and contact person photo
- Updated `CategoryGrid.tsx` — live product counts from data, real thumbnail images, category drill-down navigation
- Updated `Hero.tsx` — replaced Google-hosted URL with local `sl-1.jpg` from old site
- Updated `App.tsx` — typed `PageState` union replacing string routing; added `products` and `about` pages; wired full drill-down flow
- Updated Brands strip — HIMEL + Fuji Electric as primary brands (actual T'sys partners)

### Session 3 — Removed AI Studio/Gemini scaffolding
Project started from a Google AI Studio template; none of the Gemini/backend scaffolding was ever used by the app:
- Removed unused deps: `@google/genai`, `express`, `dotenv`, `tsx`, `@types/express`
- Removed `GEMINI_API_KEY` injection from `vite.config.ts` (no code referenced `process.env.GEMINI_API_KEY`)
- Deleted `.env.example` and `metadata.json` (AI Studio-specific, not used by the Vite app)
- Rewrote `README.md` to describe the actual T'sys project instead of generic AI Studio instructions
- No `.env.local` / API key is needed to run this project
