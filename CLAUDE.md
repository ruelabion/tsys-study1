# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # Type-check with tsc --noEmit (no separate test suite)
npm run preview   # Preview production build
```

## Browser Testing Notes

**If a Claude-in-Chrome automated click seems to "not work" (page content doesn't visually swap), check `document.hidden` before assuming a code bug.**

Symptom: clicking a button via automation (`find` + click-by-ref, or a JS `.click()`/`dispatchEvent`) fires every native DOM event correctly (`pointerdown`/`mousedown`/`click` all confirmed via `addEventListener`), and React state genuinely updates (confirmable via a sibling component reacting to it, e.g. `Header`'s active nav tab changing), but the `AnimatePresence`-gated page content in `App.tsx` stays frozen on the old page indefinitely.

Root cause: in an automated/backgrounded tab, `document.hidden` is `true` (`document.visibilityState === 'hidden'`, `document.hasFocus() === false`). Chrome pauses/heavily throttles `requestAnimationFrame` for hidden tabs, and Framer Motion's transitions — including every `AnimatePresence` page swap in `App.tsx` — depend entirely on rAF. With `mode="wait"`, the incoming page never mounts until the outgoing page's exit animation completes, which never happens if rAF is frozen. The outer `motion.div`'s `opacity` can be seen stuck at its `initial` value (e.g. `0`) indefinitely via `getComputedStyle` — not just "still animating," genuinely never started.

Diagnostic: run `document.hidden`, `document.visibilityState`, `document.hasFocus()` via `javascript_exec`. If `hidden: true`, this is the cause — don't start editing app code in response to this symptom.

Workaround: a real `computer.left_click` at actual screen coordinates (not a ref-based click, not a JS-dispatched click) appears to bring the tab to focus as a side effect, unfreezing rAF and letting the transition complete; `computer.screenshot` also appears to force a visible repaint. When verifying navigation/page-transition behavior, prefer coordinate clicks taken from a *freshly captured* screenshot each time — an in-progress animation's `translateY`/`opacity` can shift element positions between screenshots, causing stale coordinates to miss.

This only affects browser-automation tooling — a real visitor's tab is always visible/focused when they click something, so this can never happen for actual users.

## Project Identity

This is the **T'sys Industrial Controls Inc.** website — an industrial B2B supplier of HIMEL low-voltage electrical products and Fuji Electric variable frequency drives. The company also fabricates custom switchgear, panelboards, and busway systems.

- **Contact**: (02) 8351-3225 / 8351-3495 / 8351-7189 / 8352-3314 | 0917 539 5654 | manager@tsys.com.ph
- **Address**: 1F Torre Venezia Bldg., Timog Avenue cor. Sct. Santiago St., Brgy. Laging Handa, Quezon City, Philippines 1103
- **Brand guideline**: `/Users/ruelabion/Sites/tsys.com.ph/Design.md`
- **Old website (content source)**: `/Users/ruelabion/Sites/tsys.com.ph/tsys-website-claude/offline/`

## Architecture

React 19 SPA (Vite 6 + TypeScript + Tailwind CSS v4). No React Router — navigation is a typed state machine in `App.tsx`.

### Page State (`App.tsx`, `src/lib/routes.ts`)

```ts
type PageState =
  | { page: 'home' }
  | { page: 'products'; category?: ProductCategory }
  | { page: 'product'; productId: string }
  | { page: 'about' }
  | { page: 'form'; prefill?: FormPrefill }
  | { page: 'privacy' }
  | { page: 'terms' }
  | { page: 'settings' }
  | { page: 'notfound' }
```

All page transitions use `motion/react` `AnimatePresence`. The `settings` page is a retained demo page (not in the T'sys navigation). `profile` page (UserProfile) is also a demo page — kept but not linked from main nav or from `PageState` at all (no route reaches it).

**Real URL routing as of Session 19** — no router library; a small custom History-API layer in `src/lib/routes.ts` (`pathForState`/`parsePathToState`) maps `PageState` to real paths (`/`, `/products`, `/products/:category`, `/product/:id`, `/about`, `/contact`, `/privacy`, `/terms`, `/settings`) and back. `App.tsx`'s `navigate()` calls `history.pushState`/`replaceState` and listens for `popstate`, so the address bar always reflects the current page — links are shareable/bookmarkable, back/forward works, and a refresh restores the exact page from the URL (this replaced the old sessionStorage-mirroring mechanism from Session 17, which is gone). An unrecognized path renders `NotFound` (`page: 'notfound'`, noindex). Vite's dev server and the CloudFront custom-error-response SPA fallback (see Session 12) both already serve `index.html` for any unknown path, so no deploy-side change was needed. `ProductList`'s category filter clicks call `history.replaceState` (not push) so filtering doesn't spam browser history, while still producing a real, indexable URL. Contact-form `prefill` stays transient UI state, not part of the URL — a direct visit to `/contact` always starts blank.

### Product Data (`src/data/products.ts`)

Single source of truth for all 14 products. Key exports:
- `products` — default export, full array
- `getProductById(id)` — used by ProductDetail
- `getProductsByCategory(category)` — used for filtering
- `getProductCountByCategory(category)` — used by CategoryGrid for counts

A product's optional `brochureUrl` points to a real PDF in `public/brochures/`; `ProductDetail.tsx` renders the download button as a real `<a download>` link when `brochureUrl` is set, otherwise as an inert placeholder button (legacy products still only have `brochureLabel`, no file).

**Product categories** (`ProductCategory` type) — aligned to the categories listed on T'sys's Facebook page (facebook.com/tsysindustrial):
- `vfd` — Variable Frequency Drives (Fuji Electric FRENIC series: ACE, HVAC, AQUA, MEGA)
- `induction-motors` — placeholder (no products yet)
- `instrumentation` — Fuji Electric Pressure Transmitter (FCX-AIII/FKP), Ultrasonic Flowmeter (M-Flow PW)
- `switchgear` — Low/Medium Voltage Switchgear, Busway/Busduct, Oil Immersed Transformer (Fuji Tusco — not on the FB list, folded in here as the closest fit)
- `transfer-switch` — placeholder (no products yet)
- `panelboards-meter-centers` — T-LINE Panelboard, Cable Tray
- `synchronizing-switchgear` — placeholder (no products yet)
- `circuit-breaker` — HIMEL MCB, MCCB/ACB, Manual Starter + Contactors

### Navigation flow

CategoryGrid → `onNavigateCategory(cat)` → ProductList (filtered) → `onSelectProduct(id)` → ProductDetail → `onBack()` → ProductList

ProductDetail also has a Related Products strip that calls `onSelectProduct(id)` to navigate between products, and a breadcrumb (`Products › {Category} › {Product Name}`) whose category segment also calls `onNavigateCategory(cat)` to jump straight to that filtered list.

**Any new clickable-looking element (hover style, pointer cursor) must actually have an `onClick`.** This codebase has repeatedly shipped dead links/buttons that merely *look* interactive — the mobile hamburger (Session 16), footer Quick Links (Session 16), and the ProductDetail breadcrumb's category segment (Session 17) were all `<span>`/`<button>` elements styled as clickable with no handler wired up. When adding hover/cursor-pointer styling to an element, wire the handler in the same change, or don't style it as clickable.

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
    switchgear/     LVSG, MVSG, HVSG, ECBM, oil_immersed_transformer.jpg
    vfd/            frenic_hvac.jpg, frenic_ace.jpg, frenic_aqua.jpg, frenic_mega.jpg (real photos, all four)
    instrumentation/ pressure_transmitter.jpg, ultrasonic_flowmeter.png
  tsys/             tsysteam_img.png, contactperson.png, aboutus_sig.png, logo.jpg, trade-show-booth.jpg
  brands/           himel.svg, fuji-electric.svg, mitsubishi-electric.svg, schneider-electric.svg, siemens.svg, omron.svg —
                     partner/distributor logos for the homepage "Brands We Distribute & Work With" strip (see Session 20)
  og-image.png       1200×630 default social-share image (Session 19 follow-up), letterboxed crop of slideshow/sl-1.jpg
public/brochures/   Real downloadable PDF datasheets, referenced by Product.brochureUrl:
  frenic-hvac-catalog.pdf, fkp5-pressure-transmitter.pdf,
  flr-ultrasonic-flowmeter.pdf, fuji-oil-immersed-transformer.pdf
```

Note: All four Fuji Electric VFD products now have real photos (see Session 6). The old `pl_*.png` placeholder set has been deleted. A product with no photo yet renders the shared `ProductImage` "Image Coming Soon" placeholder instead (see Session 6) — never reuse an unrelated product's image as a stand-in.

**`variant.image` files are only genuinely tiny for 3 of the 14 products — MCB (29–44×60px), Manual Motor Starter (52×60px), and MCCB/ACB (170×84–121px).** Everything else (switchgear, panelboards, busway, cable tray, VFDs, instrumentation) has real per-variant photography at 226–1444px — those variants look meaningfully different from each other, so the hero should keep switching to `variant.image` on selection. `ProductDetail.tsx`'s hero panel does exactly that (`variant?.image ?? product.mainImage`), with the `<img>` sized `w-full h-full object-contain` so it always fills its box — scaling *down* large photos to fit crisply, and scaling *up* the 3 low-res products' tiny crops (visibly soft/pixelated at that size, by design: it's a deliberate signal that those specific images need to be replaced with better source photography, not hidden behind the generic `mainImage`). Session 17 briefly "fixed" the small-image symptom by always showing `mainImage` instead — that hid the pixelation but also hid every other product's real per-variant photos behind one generic composite shot; Session 18 reverted that in favor of scale-to-fill. If sourcing better MCB/motor-starter/MCCB photos ever happens, this scale-to-fill behavior stays — it'll just stop looking soft for those products too. Checked both `/Users/ruelabion/Sites/tsys.com.ph/tsys-website-static/images/tsys/products/` and the offline archive for larger originals for the 3 low-res products — confirmed via MD5 that these are the only source assets that have ever existed; there is nothing better to salvage yet.

### Path alias

`@` resolves to the project root.

---

## Completed Work Summary (Sessions 1–10)

Quick-reference checklist of everything done so far, for reuse in future sessions. Full detail for each item is in the matching numbered entry under Change History below.

1. **Brand guideline applied** — Design.md typography/color tokens, Deep Blue header/footer, split-color hero headline, 5-column category grid, 4-column trust pillars.
2. **Old Joomla site content migrated** — 56 real images, all 11 original products with real specs, data-driven ProductDetail/ProductList, About page, contact info, typed page-state routing.
3. **AI Studio/Gemini scaffolding removed** — unused deps, env var injection, `.env.example`, `metadata.json`; README rewritten for the real project.
4. **Real contact info + logo + FB-aligned categories** — corrected phone/email/address against the actual old site and live Facebook page (stale mockup data replaced); added the real circular seal logo to header/footer/favicon; restructured product categories to match the 8 categories on T'sys's Facebook page.
5. **Real T'sys product documents integrated** — Fuji Electric datasheets/photos supplied by the client (Pressure Transmitter, Ultrasonic Flowmeter, Oil Immersed Transformer, FRENIC-HVAC real photo + brochure); added `Product.brochureUrl` for real PDF downloads; product count 11 → 14.
6. **Real photos sourced for remaining VFDs** — FRENIC-ACE/AQUA/MEGA placeholder images replaced with real official Fuji Electric photos (web search); added a proper `ProductImage` "Image Coming Soon" placeholder component for any future product without a photo; deleted unused legacy placeholder files.
7. **Dead CTAs wired up + real favicon** — every "Get a Quote"/"Talk to an Expert"/"Download Brochure" button now does something; added a Contact-page prefill handover (subject + message) from product pages; real favicon copied from the old site; fixed a form-reload bug (missing `onSubmit`/`preventDefault`).
8. **Footer year, tel/mailto links, cursor bug** — dynamic copyright year; phone/email in the header top bar and Contact page are real `tel:`/`mailto:` links; root-caused and fixed a site-wide missing-hand-cursor bug (Tailwind v4 Preflight resets `<button>` cursor to `default`).
9. **Contact form wired to the old site's real backend** — discovered the old site posted to a live AWS API Gateway/Lambda endpoint (not a dead Joomla form); replicated the exact submission behavior, payload shape, honeypot, and timing-based anti-spam field.
10. **Cleanup pass** — removed a non-functional mobile search button; corrected office hours (8am → 9am); added a Facebook icon to the footer social link (already global across all pages).
11. **Full documentation pass + V1 tag + branch promotion** — this summary section added; `origin/main`'s prior tip tagged `V1` (pushed) and preserved; the `update-logo-contact-info` branch (all work above) force-pushed to become the new `main` on GitHub.
12. **CI/CD pipeline live** — GitHub Actions deploys `main` to a new, independent S3 bucket (`tsys-study-dev`) behind CloudFront, reachable at **https://study-dev.tsys.com.ph** (Route 53 CNAME, reused existing wildcard ACM cert). Fully independent from the production site/bucket/distribution. See Session 12 below for all resource IDs.
13. **Homepage hero buttons wired up** — "Explore Products" navigates to the Products page; "Download Catalog" (no real catalog file existed anywhere) repurposed as "Get a Quote" → Contact page, matching the CTA pattern used everywhere else. See the new "Browser Testing Notes" section above — a lengthy false-alarm debugging session on this task's verification led to identifying and documenting the `document.hidden`/rAF-freeze browser-automation artifact.
14. **Privacy Policy / Terms & Conditions pages added** — real content (not lorem ipsum), footer links wired up, reachable from every page since `Footer` is global. See Session 14 below.
15. **LinkedIn link added to footer** — alongside Facebook, same pattern (icon + label, new tab).
16. **Mobile hamburger menu fixed + full site QA pass** — the hamburger button had no `onClick` at all and no menu panel existed; added one. Then swept every link/button site-wide and fixed 3 more dead ones found in the process: the footer's 14 "Quick Links"/"Product Categories" links (`href="#"`, no handler), the homepage "LEARN MORE ABOUT OUR SERVICES" button, and the About page's closing "CONTACT US" CTA. See Session 16 below.
17. **Product Detail refresh persistence + breadcrumb link** — page state is now mirrored to `sessionStorage` so refreshing no longer resets to the homepage. Product Detail breadcrumb's category segment was styled as clickable but had no handler — now navigates to that filtered product list. See Session 17 below.
18. **Product Detail hero image: scale-to-fill instead of hiding low-res variants** — Session 17's hero-image fix (always show `mainImage`, never `variant.image`) was superseded same-day: only 3 of 14 products actually have tiny variant images (MCB, Manual Motor Starter, MCCB/ACB); the rest have real distinct per-variant photography that showing `mainImage` always was hiding. Hero now always shows `variant.image` again, sized `w-full h-full object-contain` to scale to fill its box in both directions — crisp for the 11 well-photographed products, deliberately soft/pixelated for the 3 low-res ones (a visible flag that those specific images need better source photography, not a bug to fix in code). See Session 18 below and the updated "Images" note above.
19. **Real URL routing + full SEO/AEO pass** — replaced the sessionStorage page-state mechanism with real History-API routing (`src/lib/routes.ts`), so every page has a real, shareable, indexable URL. Added a `useSEO` hook (`src/lib/seo.ts`) that every page component calls with its own title/description/canonical/OG/Twitter/robots tags and JSON-LD (Product + BreadcrumbList on product pages, BreadcrumbList on category pages, FAQPage on Contact, WebSite on Home, site-wide Organization schema in `index.html`). Added `robots.txt`, `sitemap.xml`, and an `llms.txt` (AEO). Added a genuine, fact-based FAQ section to the Contact page. Fixed a real duplicate-`<h1>` bug on the homepage (Hero.tsx had two `<h1>`s for its two-line split-color headline — now one `<h1>` with two `<span>`s). Added `<meta name="developer" content="spiceworx.com">`. See Session 19 below for the domain-hardcoding assumption baked into the static files.
20. **Custom og-image.png + real brand logos on homepage** — default `og:image`/`twitter:image` changed from the logo to a custom-composited 1200×630 image (letterboxed crop of the hero banner); the 6 "Brands We Distribute & Work With" text labels on the homepage replaced with real, sourced logo images (grayscale by default, full color on hover). See Session 20 below.
21. **Promoted to production** — `tsys-study1` now deploys automatically to the real `tsys.com.ph`/`www.tsys.com.ph`, replacing the old static site. New independent GitHub Actions pipeline, rotated deploy credentials, SPA fallback added to the prod CloudFront distribution, and the 3 SEO files repointed from `study-dev.tsys.com.ph` to `www.tsys.com.ph`. See Session 21 below for full resource IDs and the old pipeline that was retired.
22. **study-dev.tsys.com.ph fully decommissioned** — now that production is live, the entire study-dev environment (S3 bucket, CloudFront distribution, OAC, Route 53 record, IAM deploy user, GitHub Actions workflow/secrets) was torn down. Production is completely unaffected (always ran on separate infrastructure). See Session 22 below — **there is no longer a staging/preview environment**; every push to `main` now goes straight to the live public site.
23. **Product category filter scrolls into view** — clicking a category pill on `/products` no longer leaves the viewport scrolled deep into the previous category's grid; it now smoothly scrolls the filter bar (and new results) up to right below the fixed header. Restored Pirsch (privacy-friendly, cookieless analytics) in `index.html`, carried over from the old site with the same site code — auto-tracks this SPA's client-side route changes by default, no extra integration needed. Updated `PrivacyPolicy.tsx`'s "no analytics" claim (accurate when written in Session 14, no longer true) to accurately describe Pirsch. See Session 23 below.

**Open items / not yet done** (flagged in various sessions, still outstanding as of Session 23):
- Contact form has never been tested end-to-end against the live AWS endpoint (deliberately, to avoid spamming T'sys's real inbox with test data) — a human should do one real test submission. This is now more urgent since the site is live in production.
- Legacy products (everything except the 4 with real `brochureUrl`s) still have non-functional brochure buttons if `brochureLabel` is set without a matching PDF.
- `induction-motors`, `transfer-switch`, and `synchronizing-switchgear` categories are still "Coming Soon" placeholders with zero products (also omitted from `sitemap.xml` for now — thin content).
- `sitemap.xml` is a static hand-written file, not generated from `products.ts` — update it manually when products or categories are added/removed (matches the catalog's existing manual-maintenance pattern; see Session 19).
- The PR disabling the old `ruelabion/tsys.com.ph` repo's deploy workflow (see Session 21) was opened but not auto-merged (repo-modification permission denied for direct push/merge in that repo) — a human needs to merge https://github.com/ruelabion/tsys.com.ph/pull/1 to fully retire it.
- MCB, Manual Motor Starter, and MCCB/ACB variant images (29–170px) are visibly pixelated when scaled up on Product Detail (see Session 18) — client should be asked for higher-resolution product photography for these three; no better source exists in either old-site archive.
- **No staging/preview environment exists anymore** (see Session 22) — every push to `main` deploys straight to the live public site via `deploy-production.yml`, with no pre-production step. Local `npm run build && npm run preview` before pushing is the only remaining safety net. Worth reconsidering if changes get riskier/larger.
- The 6 `public/images/brands/` logos (Session 20) were sourced from Wikimedia Commons (Fuji Electric, Mitsubishi Electric, Schneider Electric, Siemens, Omron) and a third-party logo aggregator (HIMEL, since it has no Wikipedia/Wikimedia entry) rather than each brand's own official press kit — fine for a "brands we distribute/work with" strip, but if T'sys ever gets official brand-guideline logo files directly from these partners, swap these out for the authoritative versions.

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

### Session 4 — Real contact info, logo, and FB-aligned product categories
The old Joomla site's content (Session 2 source) had stale contact info from an earlier mockup, not the real business. Corrected against the actual old site and the live Facebook page (facebook.com/tsysindustrial):
- `Header.tsx` / `Footer.tsx` / `DataEntry.tsx` — replaced contact info with the real one: phone (02) 8351-3225/3495/7189, 8352-3314, mobile 0917 539 5654, email manager@tsys.com.ph, address 1F Torre Venezia Bldg., Timog Avenue cor. Sct. Santiago St., Brgy. Laging Handa, Quezon City 1103
- Added circular seal logo (`public/images/tsys/logo.jpg`) to `Header.tsx`, `Footer.tsx`, and as the site favicon (`index.html`)
- Added "Commercial & Industrial Equipment Supplier" tagline (from FB Page category) to `Header.tsx` and `Footer.tsx`
- Restructured `ProductCategory` in `src/data/products.ts` from the old 5-category scheme to the 8 categories listed on the FB Page (see Product Data section above); remapped all existing products into the new categories rather than deleting any
- Updated `CategoryGrid.tsx` (8-card grid, new icons) and `ProductList.tsx` filter bar to match

### Session 5 — Integrated real T'sys product documents (Fuji Electric datasheets)
Source: `/Users/ruelabion/Documents/SpiceWorx/LJGroup/Tsys/` — real Fuji Electric product photos and PDF datasheets supplied by the client, plus the SpiceWorx website enhancement proposal (Tsys-WebEnhance-P-2026, the engagement this work is executing against).
- `frenic-hvac` product: swapped placeholder image for the real photo (`vfd/frenic_hvac.jpg`) and added a real brochure download (`brochures/frenic-hvac-catalog.pdf`)
- Added `oil-immersed-transformer` product (Fuji Tusco, IEC 60076/60076-5) to the `switchgear` category — not on the FB product list, folded in as the closest fit per user decision
- Added `fcx-pressure-transmitter` (Fuji FCX-AIII/FKP series) and `ultrasonic-flowmeter` (Fuji M-Flow PW) products, populating the previously-empty `instrumentation` category with real spec data
- Added `Product.brochureUrl` field; `ProductDetail.tsx` brochure button now renders a real `<a download>` link when a PDF is available, falling back to the old inert button otherwise
- Total product count: 11 → 14

### Session 6 — Replaced VFD placeholder images with real Fuji Electric product photos
The `frenic-ace`, `frenic-aqua`, and `frenic-mega` products were still using unrelated HIMEL `pl_*.png` placeholder thumbnails (see Session 2 note). Sourced real, isolated studio product photos from official Fuji Electric regional sites via web search:
- FRENIC-Ace: `americas.fujielectric.com` → `public/images/products/vfd/frenic_ace.jpg`
- FRENIC-AQUA: `india.fujielectric.com` → `public/images/products/vfd/frenic_aqua.jpg` (resized from 1569×2362 down to 598×900 for web)
- FRENIC-MEGA: `americas.fujielectric.com` → `public/images/products/vfd/frenic_mega.jpg`
- Updated `mainImage` and all `variants[].image` for these three products in `src/data/products.ts`, plus the VFD category thumbnail in `CategoryGrid.tsx`
- All 4 FRENIC products (ACE, HVAC, AQUA, MEGA) now have real photos; no placeholder images remain anywhere in the product catalog
- Deleted the now-unused `pl_hdb9.png`, `pl_hdm6l.png`, `pl_hdp6.png`, `pl_hdc6.png` files from `public/images/products/`
- Made `Product.mainImage` and `ProductVariant.image` optional; added `src/components/ProductImage.tsx` — a shared component that renders a styled "Image Coming Soon" placeholder (icon + label, `size: 'sm' | 'md' | 'lg'`) instead of a broken `<img>` when no image is set. Used by `ProductList.tsx` (card grid), `ProductDetail.tsx` (main image + variant thumbnails) so future products without photos degrade gracefully instead of reusing an unrelated product's image

### Session 7 — Wired remaining dead CTAs, real favicon, and quote handover
- Added `public/favicon.ico`, copied verbatim from the old Joomla site (`/tsys-website-claude/offline/plugins/system/jat3/jat3/base-themes/default/images/favicon.ico`) — a small circular T'sys mark, not a generic template default. `index.html` now links to it instead of the header logo JPG.
- Added a `prefill?: { subject?: string; message?: string }` payload to the `form` page state in `App.tsx`, threaded through to `DataEntry.tsx`. `DataEntry`'s Subject `<select>` and Message `<textarea>` are now controlled inputs seeded from this prefill.
- Wired every previously-dead "Get a Quote"-style CTA to navigate to the Contact page with contextual prefill:
  - `ProductList.tsx` bottom "GET A QUOTE" → Subject: "Request for Quotation"
  - `ProductDetail.tsx` "CONFIGURE / GET A QUOTE" → Subject: "Request for Quotation", Message references the product/brand/variant
  - `ProductDetail.tsx` Quote Block "Talk to an Expert" → Subject: "System Integration", Message references the product for integration support/bulk procurement
  - `ProductDetail.tsx` Quote Block "Download Brochure" → now a real `<a download>` using `product.brochureUrl` when present, hidden otherwise (matches the hero brochure button's behavior instead of being an always-visible dead button)
- Fixed a real bug found while wiring the above: `DataEntry`'s `<form>` had no `onSubmit`, so clicking "SEND MESSAGE" triggered a native browser form submission (full page reload, wiping all state). Added `preventDefault()` and a simple "Message Sent" confirmation state. No backend/email service is connected — this only fixes the reload and shows a client-side confirmation.

### Session 8 — Footer year, tel/mailto links, and a global cursor fix
- `Footer.tsx`: copyright year is now `{new Date().getFullYear()}` instead of a hardcoded `2024`.
- `Header.tsx` top bar: phone display swapped from the landline to the mobile number, both now real `tel:`/`mailto:` links (`tel:+639175395654`, `mailto:manager@tsys.com.ph`).
- `DataEntry.tsx` (Contact page): each of the 4 landline numbers is now its own `tel:` link following the `+632[landline]` pattern (drop the leading 0 from "02", prepend +63) — same pattern the real old Joomla site used. Also linked Mobile, Email, and the "Prefer to talk?" strip's number for consistency (not explicitly requested, flagged to the user).
- **Root-caused a site-wide cursor bug**: Tailwind CSS v4's Preflight resets `<button>` to the browser's native `cursor: default` (arrow) instead of `pointer` — this affected every button across the site (nav, filters, CTAs), since almost all interactive elements here are `<button>`, not `<a>`. Fixed with one rule in `src/index.css` (`@layer base`): `button:not(:disabled) { cursor: pointer; }`, restoring the hand cursor everywhere without touching individual components. `<div onClick>` cards (product cards, category cards) already had `cursor-pointer` set manually and were unaffected.

### Session 9 — Wired the Contact form to the old site's real backend
The old site's contact form (`contact-us.html` + `assets/contact-form.js`) was a live, working form posting to a real AWS API Gateway/Lambda endpoint — not the dead Joomla `com_contact` component. Our React form (`DataEntry.tsx`) had no `onSubmit` logic of its own beyond a local "submitted" flag. Rewired it to match the old site's actual submission behavior:
- Posts to the same live endpoint: `https://2rxjjzbgeh.execute-api.ap-northeast-1.amazonaws.com/prod/contact` (`POST`, JSON body `{ name, email, subject, message, page_url, form_loaded_at, website_url }`, expects `{ success: boolean, message?: string }` back)
- Replicated the old form's anti-spam fields: `website_url` honeypot input (rendered off-screen at `-9999px`, `tabIndex={-1}`, `autoComplete="off"` — same technique as the old site's `.tcf-honeypot`, deliberately not `display:none`/`type=hidden` since bots often skip those) and `form_loaded_at` (timestamp captured on mount, sent with the payload)
- All form fields (Full Name, Company, Email, Phone, Subject, Message) are now controlled inputs; Company/Phone have no dedicated backend fields so they're prepended into the `message` body instead, to avoid silently dropping that data
- Client-side validation (name, email, subject, message all required) runs before any network call, matching the old site's `novalidate` + JS-validation approach; shows an inline error message and never calls fetch if it fails
- Success replaces the form with a confirmation card and clears all fields; failure/network-error shows an inline red status message and leaves the form filled in so the user can retry
- **Not tested end-to-end against the live endpoint** — only the client-side validation path (which returns before any `fetch`) was verified in-browser, confirmed via network inspection that no request fired. Submitting a real message would notify T'sys's actual sales inbox, so a live test should be done deliberately by a human, not automated in a coding session.

### Session 10 — Small cleanup pass
- `Header.tsx`: removed the mobile-only search button (`<Search>` icon) — it had no handler and wasn't part of any planned feature.
- `DataEntry.tsx`: office hours corrected from `8:00 AM` to `9:00 AM` in both places it appears (the Office Hours field and the "Prefer to talk?" strip).
- `Footer.tsx`: added a `Facebook` icon (lucide-react) next to the Facebook link, plus an `aria-label`. The footer is rendered globally in `App.tsx` (outside the per-page `AnimatePresence` switch), so this — like all footer content — already appears on every page without extra wiring.

### Session 11 — Full documentation pass, V1 tag, branch promotion
- Added the "Completed Work Summary" section above, consolidating Sessions 1–10 into a scannable checklist for future reuse.
- Discovered `origin/main` had diverged from local `main`/this branch with one commit not present here (a README ownership note added directly on GitHub: the old `tsys-demo.spiceworx.com` template design is now owned by powerboxsolutions.com, unrelated to T'sys). Preserved that note's content manually in `README.md` (an automated merge/cherry-pick would have conflicted, since Session 3 already fully rewrote README.md away from the AI Studio template it was written against).
- Tagged the prior `main` (i.e. `origin/main`'s tip before this promotion) as `V1`, then made this branch (`update-logo-contact-info`) the new `main`. Pushed both: `V1` tag pushed first, then `main` force-pushed (with explicit user confirmation) to overwrite the old divergent `origin/main`.

### Session 12 — CI/CD: GitHub Actions → S3 → CloudFront → Route 53

**Decommissioned in Session 22** — all resources in this section (S3 bucket, CloudFront distribution, OAC, Route 53 record, IAM user, GitHub Actions secrets/workflow) were fully torn down once production went live; `study-dev.tsys.com.ph` no longer resolves. Kept below as a historical record of what this pipeline looked like.

Was live at **https://study-dev.tsys.com.ph** (also reachable directly via the CloudFront domain below). AWS account `033858994314`, profile `sciadmin`.

| Resource | Value |
|---|---|
| S3 bucket | `tsys-study-dev` (ap-southeast-1, private — CloudFront OAC is the only entry point, all public access blocked) |
| CloudFront distribution | `E183JGTQTHVO9X` → `d3fk9dfva167rg.cloudfront.net` |
| Origin Access Control | `E2PCHJR8J3RHXX` (`tsys-study-dev-oac`) |
| ACM certificate | Reused the existing `*.tsys.com.ph` wildcard cert (`us-east-1`, `arn:...certificate/f88f10f3-3d76-4dd7-abb4-8ec786edd5de`) — already issued, was unused, no new validation needed |
| Route 53 | CNAME `study-dev.tsys.com.ph` → CloudFront domain, in the `tsys.com.ph` hosted zone (`Z31WA5GARGN3P`) |
| IAM deploy user | `github-deploy-tsys-study-dev` — inline policy scoped to only this bucket (`s3:PutObject/DeleteObject/GetObject/ListBucket`) and only this CloudFront distribution (`cloudfront:CreateInvalidation`); credentials live only in GitHub Actions secrets, never committed |
| GitHub Actions secrets | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `CLOUDFRONT_DISTRIBUTION_ID` (repo: `ruelabion/tsys-study1`) |

Workflow: `.github/workflows/deploy.yml` — on every push to `main`, runs `npm ci && npm run build`, syncs `dist/` to S3 (`--delete`, static assets cached `max-age=86400`, `index.html` explicitly `no-cache` so browsers always revalidate and pick up new deploys), then invalidates the CloudFront distribution (`/*`).

Notes:
- This bucket/distribution is entirely independent from production (`tsys-website-prod` bucket, `ap-northeast-1`, distribution `E1ZQEG5WQOCWTK`, serving `tsys.com.ph`/`www.tsys.com.ph`) — no shared resources, so nothing here can affect the live production site.
- SPA routing: CloudFront's custom error responses map both `403` and `404` → `/index.html` with a `200`, since this app has no server-side routing (all navigation is client-side state in `App.tsx`).
- First deploy verified end-to-end: S3 has the built files, CloudFront invalidation completed, both `https://d3fk9dfva167rg.cloudfront.net` and `https://study-dev.tsys.com.ph` return `200` with the correct page title.

### Session 13 — Homepage hero buttons wired up

`Hero.tsx` had two dead buttons (no `onClick` at all):
- `onExploreProducts` prop added → `navigate({ page: 'products' })`, wired from `App.tsx`.
- "Download Catalog" had no real file to point to — checked the old Joomla site and the SpiceWorx client materials folder (`/Users/ruelabion/Documents/SpiceWorx/LJGroup/Tsys/`), only per-product datasheets exist, no general company catalog PDF. Relabeled to **"Get a Quote"** and wired to `onGetQuote` → `navigate({ page: 'form' })`, matching the CTA already used everywhere else on the site rather than linking a file that doesn't exist.
- Deployed via the CI/CD pipeline from Session 12; verified live on `study-dev.tsys.com.ph`.

Verifying this in the browser triggered an extended, ultimately-false-alarm debugging session: clicks appeared not to navigate, despite the code being correct. Root-caused to the automated tab having `document.hidden === true`, which freezes Framer Motion's `requestAnimationFrame`-driven `AnimatePresence` transitions — see the new "Browser Testing Notes" section near the top of this file for the full diagnostic and workaround, so this doesn't need to be re-discovered from scratch next time.

### Session 14 — Privacy Policy and Terms & Conditions pages

Footer's `Privacy Policy` and `Terms & Conditions` links (`<a href="#">`) were dead. Added two new full pages:
- `src/components/PrivacyPolicy.tsx` and `src/components/TermsConditions.tsx` — drafted content appropriate for a Philippine B2B industrial supplier corporate site: Privacy Policy references the Data Privacy Act of 2012 (RA 10173) and accurately describes what this site actually collects (only the contact form: name, company, email, phone, subject, message — no cookies/analytics/tracking exist in the codebase, confirmed by grep before writing the policy, so it wasn't overstated). Terms & Conditions covers acceptable use, product-info/pricing disclaimers (this site is not a store — no purchase/sale happens here, quotations require separate confirmation), IP/trademark notes (HIMEL, Fuji Electric, etc. belong to their respective owners), limitation of liability, and Philippine governing law. Both carry a plain-language footer note that this is a template, not a substitute for legal counsel review.
- Added `'privacy'` and `'terms'` to `PageState` in `App.tsx`; `Footer.tsx` now takes `onNavigatePrivacy`/`onNavigateTerms` props (bottom-bar links became `<button>`s) instead of dead `href="#"` anchors. Both new pages use the same deep-blue-hero page layout as About/Contact, with a "← Back to Home" control.
- Since `Footer` is rendered globally in `App.tsx` outside the page switch, both links are already reachable from every page — no extra wiring needed.
- Verified live in-browser (working around the Session 13 `document.hidden` rAF-freeze artifact): both pages render with correct content, both footer links navigate correctly, both "Back to Home" buttons and the Header "Home" link correctly return to the homepage.

### Session 15 — LinkedIn link added to footer

T'sys also has a LinkedIn page: `https://www.linkedin.com/in/tsys-industrial-controls-inc-central-luzon-2b7302371/`. Added it to `Footer.tsx` next to the Facebook link, same pattern exactly — `Linkedin` icon (lucide-react), `target="_blank"`, `rel="noopener noreferrer"`, matching hover/underline styling and `aria-label`. Both social links now sit side by side in a `flex` row. Deployed and confirmed live on `study-dev.tsys.com.ph`.

### Session 16 — Mobile hamburger menu fix + full site QA pass

Started from a user report that the mobile hamburger menu didn't work. Root cause: `Header.tsx`'s hamburger `<button>` had no `onClick` at all, and no mobile menu panel existed anywhere in the component to toggle — it was a pure no-op. Added `isMenuOpen` state, a dropdown `<nav>` panel (same links as desktop plus the "Get a Quote" CTA), and an icon swap between `Menu`/`X` (lucide-react). Verified in-browser at a 390×844 viewport: opens, closes, navigates, and closes-on-navigate all work.

Given the fix, did a full click-every-link sweep of the site (grepped for `href="#"` and every `<button>` across `src/components/` to check for missing `onClick`, then spot-verified each finding live in-browser via the gstack `/qa` skill). Found and fixed 3 more pre-existing dead links, unrelated to the hamburger bug:

- **Footer "Quick Links" and "Product Categories" (14 links total)** — both columns were `<a href="#">` with no handler, present on every page since `Footer` is global. Converted to `<button>`s wired through a new `Footer` prop pair: `onNavigate(page)` for Quick Links (Home/Products/About Us/Contact Us → their real pages; **Downloads** → Products page, since that's where brochure downloads actually live, there's no dedicated downloads page; **Services** → home page then smooth-scrolls to the "Our Services" section) and `onNavigateCategory(category)` for Product Categories (filters the product list by category, same behavior as the homepage category grid — label-to-category mapping matches `CATEGORY_LABELS` in `src/data/products.ts` exactly).
- **Homepage "LEARN MORE ABOUT OUR SERVICES" button** (`TechSpecs.tsx`) — no `onClick`. Wired to the Contact page with a `System Integration` subject prefill, the same subject string already used by `ProductDetail`'s "Talk to an Expert" CTA (Session 7).
- **About page's closing "CONTACT US →" CTA** (`About.tsx`) — no `onClick`. Wired to the Contact page, no prefill (not tied to a specific product).

New scroll-to-anchor mechanism in `App.tsx`: a `scrollTarget` state, set alongside `navigate({ page: 'home' })` when Footer's "Services" link is clicked; a `useEffect` waits 350ms (for the `AnimatePresence` page-swap animation to finish — see "Browser Testing Notes" above re: why animations matter here) then calls `scrollIntoView({ behavior: 'smooth' })` on `#services` (the id added to `TechSpecs`'s wrapping `<section>`). This is the only deep-linking/anchor-scroll behavior anywhere in the app; kept deliberately minimal (no URL hash sync, no generic anchor-link system) since nothing else in the codebase needed it.

All fixes verified live via browser automation (console-clean, correct navigation, correct prefill) before committing. Confirmed `npm run build` still succeeds. Split into 4 atomic commits (hamburger menu, footer links, Learn More button, About CTA) and pushed to `main` — deploys automatically to `study-dev.tsys.com.ph` via the Session 12 CI/CD pipeline.

Also declined the `/qa` skill's test-framework bootstrap prompt (would have set up Vitest + a full test suite) since this project intentionally has no test suite — see `npm run lint` in Commands above. Left a `.gstack/no-test-bootstrap` marker (gitignored) so future `/qa` runs don't re-prompt.

### Session 17 — Product Detail hero image size (superseded, see Session 18), refresh persistence, breadcrumb link

Started from a user report: on the Products page the category-featured images look nicely balanced, but on Product Detail the main image (both the default view and after clicking a thumbnail) renders small.

**Root cause, not a CSS sizing tweak:** `ProductDetail.tsx`'s hero panel rendered `variant?.image ?? product.mainImage`, switching to the selected variant's image. That's fine for VFD products, whose variants all reuse the same full-size photo — but for HIMEL MCB/MCCB/ACB/motor-starter products, the per-variant crop files are genuinely tiny source assets (29×60px up to 170×121px; see the new note under "Images" above), versus `product.mainImage`'s properly composed 264–350px shot. An `<img>` with only `max-h-*`/`max-w-*` (no forced fill) renders a source image smaller than its container at native size — it doesn't scale up — so the hero showed a postage-stamp photo floating in a mostly-empty box. First tried bumping the container/constraint sizing (`min-h-[340px]` → fixed `h-[340px] md:h-[420px]`, `max-h-64` → `max-h-full`); this alone didn't fix it, because the underlying source pixels were still tiny. The actual fix was to stop swapping the hero to `variant.image` at all — it now always renders `product.mainImage`, and `variant.image` is reserved for the small 48×48 thumbnail selector row where its native resolution is fine. Thumbnail clicks still update the selected variant and the specs table below; they just no longer degrade the hero photo.

Before committing to that fix, checked whether a better-resolution source existed anywhere: user pointed at `/Users/ruelabion/Sites/tsys.com.ph/tsys-website-static/images/resized/images` and `.../images/tsys/products`. Compared every MCB/MP/MCCB/ACB file there against the project's `public/images/products/` via MD5 — all identical. These tiny crops are the only assets that have ever existed for these variants (never full-size photography); nothing to salvage.

Two more bugs reported in the same pass, both fixed together:
- **Refresh reset to homepage** — `PageState` (`App.tsx`) only ever lived in `useState`, so an F5 always reinitialized to `{ page: 'home' }`. Added `loadPageState()` (reads/validates `sessionStorage['tsys-page-state']` on mount) and a `useEffect` that writes the current state back on every change. Still no real URL routing — the address bar never reflects the page, so links still can't be shared/bookmarked to a specific product; sessionStorage only survives refresh within the same tab/session. See the note added under "Page State" above.
- **Product Detail breadcrumb category link** — the `{CATEGORY_LABELS[product.category]}` breadcrumb segment (e.g. "Circuit Breaker") had `hover:text-primary` + `cursor-pointer` styling but was a plain `<span>` with no handler, unlike the "Products" crumb next to it which was already a working `<button>`. Added an `onNavigateCategory` prop (same pattern as `Header`/`Footer`), turned the span into a `<button>`, wired it in `App.tsx` to `navigate({ page: 'products', category })`. This is at least the fifth instance of this exact "styled as clickable, isn't wired" bug across the project (hamburger menu, footer Quick Links/Product Categories, Learn More button, About CTA — all Session 16 — and this breadcrumb) — see the new "Any new clickable-looking element..." note under "Navigation flow" above.

All three fixes verified live in-browser (desktop 1440px viewport): hero image now fills its box, refresh mid-navigation stays on the same product page, and clicking the "Circuit Breaker" breadcrumb correctly lands on the products list pre-filtered to that category (confirmed by scrolling the sticky filter bar to see it highlighted). `npm run lint` clean throughout. Two commits pushed directly to `main` (user explicitly requested commit + push each time) — deploys automatically to `study-dev.tsys.com.ph` via the Session 12 CI/CD pipeline.

**Note (added same day, see Session 18):** the "always show `mainImage`" hero fix above was too broad — it fixed the 3 products with genuinely tiny variant images but also flattened the other 11 products' real per-variant photography down to one generic shot. Superseded by Session 18's scale-to-fill approach.

### Session 18 — Hero image: scale-to-fill instead of hiding low-res variants

Follow-up to Session 17's hero-image fix, prompted by the user asking "not all of them has small image variants, like?" — a fair challenge to the previous session's blanket "always show `mainImage`" fix.

Enumerated every product's `mainImage` and every `variant.image` resolution (`sips -g pixelWidth -g pixelHeight` over all 14 products' image files, cross-referenced against `src/data/products.ts`). Result: only **3 of 14 products** have genuinely tiny variant images —
- Miniature Circuit Breaker (`hdb-mcb`): 29–44×60px
- Manual Motor Starter (`hdp6-starter`): 52×60px
- Molded Case & Air Circuit Breakers (`hdm6l-mccb`): 170×84–121px

Every other product (switchgear, panelboards, busway, cable tray, VFDs, instrumentation) has per-variant images at 226–1444px, and those images are genuinely different photos per variant (e.g. `switchgear`'s LVSG cabinet shot vs. its HVSG production-floor shot look nothing alike). Session 17's fix of always rendering `mainImage` in the hero was correct for the first group but a regression for the second — it silently hid the fact that different variants look different.

Fix in `ProductDetail.tsx`: reverted the hero `<ProductImage>` back to `src={variant?.image ?? product.mainImage}` / `alt={variant?.name ?? product.name}` (undoing Session 17's `product.mainImage`-only change), and changed its className from `max-h-full max-w-full object-contain` to `w-full h-full object-contain`. The difference matters: `max-h-*`/`max-w-*` only cap an image's size (never grow it past its native resolution), while `w-full h-full` + `object-contain` forces the image to scale to fill the box in both directions, preserving aspect ratio — shrinking large photos to fit crisply, and stretching the 3 low-res products' tiny crops up to fill the same box (visibly soft/pixelated at that size). This is intentional, not a defect: rather than hide the resolution gap, blowing the image up flags exactly which 3 products still need better source photography, while giving the other 11 their real variant photos back.

Verified live in-browser (used the Session 17 sessionStorage persistence to jump straight to a product's URL state via `sessionStorage.setItem('tsys-page-state', ...)` + reload, skipping the click-through dance): MCB's "1P" variant now visibly pixelated but fills the box; `switchgear`'s HVSG thumbnail now shows a distinct, crisp production-floor photo instead of the same generic composite shown for every variant. `npm run lint` clean. Committed and pushed directly to `main` (user-directed) — auto-deploys to `study-dev.tsys.com.ph`.

### Session 19 — Real URL routing + full SEO/AEO pass

User asked to make the site SEO and AEO (Answer Engine Optimization) compliant, investigate the current SEO state first, and add `<meta name="developer" content="spiceworx.com">`.

**Investigation first.** `index.html` had only a bare `<title>` — no meta description, robots, canonical, OG/Twitter tags, or structured data. No `robots.txt` or `sitemap.xml` existed. The old Joomla site (content source for this rebuild) *did* have real per-page `<meta name="description">`/`keywords` — that SEO metadata was never carried over during the Session 2 migration, a genuine regression. The single biggest issue, though, was architectural: `App.tsx`'s entire page-state machine (Session 17) lived in React state + `sessionStorage` with zero URL sync — every page shared one URL, so no crawler or AI answer engine could ever discover or cite anything beyond the homepage, and there was nothing meaningful a `sitemap.xml` could list. Flagged this to the user before starting since fixing it properly (real routing) vs. a meta-tags-only pass are very different sizes of change; user chose real routing.

**Routing (no new dependency).** Rather than pull in react-router (a bigger dependency + AnimatePresence-integration change for an app with no nested routes, data loaders, or other complexity that would justify it), added a small custom History-API layer: `src/lib/routes.ts` exports `pathForState`/`parsePathToState`, a pure `PageState ⇄ URL path` mapping (`PageState` itself moved here from `App.tsx`, plus a new `notfound` variant). `App.tsx`'s `navigate()` now calls `history.pushState`/`replaceState` and a `popstate` listener keeps state in sync with browser back/forward; the old sessionStorage-mirroring `loadPageState()` mechanism (Session 17) is gone entirely — the URL is now the single source of truth, restored directly on mount via `parsePathToState(window.location.pathname)`. URL scheme: `/`, `/products`, `/products/:category`, `/product/:id`, `/about`, `/contact`, `/privacy`, `/terms`, `/settings`; anything else renders a new `NotFound` component (noindex). Verified both Vite's dev server and the existing CloudFront custom-error-response SPA fallback (Session 12) already serve `index.html` for any unknown path, so no deploy-side change was needed.

Extracted the inline home-page JSX out of `App.tsx` into a new `Home.tsx` component — not a cosmetic refactor, it was required: every other page is its own component that calls the new `useSEO` hook (below), and React's rules-of-hooks forbid calling a hook only inside one conditional branch of `App.tsx`'s page switch. `ProductList.tsx` gained an `onCategoryChange` callback (wired to `navigate(..., { replace: true })`, so clicking between category filter tabs updates the URL — making every category page independently linkable — without spamming browser history) and a `useEffect` to resync its local filter state when `initialCategory` changes while the component stays mounted (e.g. navigating between categories via a breadcrumb/footer link).

**Per-page SEO metadata.** New `src/lib/seo.ts` exports a `useSEO({ title, description, path, image?, ogType?, noindex?, jsonLd? })` hook — no new dependency (skipped react-helmet-async; a plain `useEffect` that upserts `<meta>`/`<link>`/`<script type="application/ld+json">` tags by attribute-selector is ~70 lines and sufficient for a client-rendered SPA with no SSR). Canonical/OG/Twitter URLs are computed from `window.location.origin` (self-referencing) rather than a hardcoded domain, specifically so they're correct on *whatever* domain currently serves the build — no code change needed if/when this is promoted from `study-dev.tsys.com.ph` to the real `tsys.com.ph`. Every page component now calls it: `Home`, `ProductList` (title/description vary by active category filter), `ProductDetail` (product name/description/image, `noindex` when a product isn't found), `About`, `DataEntry` (Contact), `PrivacyPolicy`, `TermsConditions`, `Settings` (noindex — demo page), `NotFound` (noindex).

**Structured data (JSON-LD, the AEO-relevant part).** Site-wide `Organization` schema (name, logo, address, telephone, email, `sameAs` → Facebook + LinkedIn) added statically to `index.html`'s `<head>` — describes the business entity itself, doesn't need to vary per page. Per-page, via `useSEO`'s `jsonLd` param: `WebSite` on Home; `BreadcrumbList` on `ProductList` (Home › Products › Category) and `ProductDetail` (Home › Products › Category › Product); `Product` schema on `ProductDetail` (name/description/image/brand/category — deliberately no `offers`/pricing, since this isn't an e-commerce storefront); `FAQPage` on the Contact page, backed by a new **visible** FAQ section (not markup-only) with 5 genuine Q&As sourced from existing site content (products supplied, office hours, how to request a quote, address, custom fabrication capability) — no fabricated claims.

**Static files.** Added `public/robots.txt` (allows all, disallows `/settings`, references the sitemap) and `public/sitemap.xml` (hand-written, not generated — 23 URLs: home, products, the 5 non-empty category pages, all 14 products, about, contact, privacy, terms; the 3 zero-product placeholder categories are omitted as thin content but still crawlable via `robots.txt`). Also added `public/llms.txt`, a plain-Markdown company/product summary aimed at AI agents and answer engines (an emerging convention analogous to `robots.txt` for LLMs) — company description, contact info, product category links, and a note that this site doesn't sell online.

**Domain-hardcoding decision, flagged for the user:** `robots.txt`, `sitemap.xml`, and `index.html`'s static OG/canonical/JSON-LD `url`/`logo` fields are all hardcoded to `https://study-dev.tsys.com.ph` — deliberately *not* the real production domain `tsys.com.ph`, because that domain currently serves a completely different, unrelated site (the old production bucket/CloudFront distribution from Session 12's notes) — hardcoding the production domain today would have produced broken OG image previews and a sitemap submitted against a domain not actually running this code. `src/lib/seo.ts`'s per-page tags avoid this problem entirely by self-referencing `window.location.origin`, so only these 3 static files need a manual one-line domain swap if/when a staging→production promotion path is ever built.

**Also fixed while in the area:** `Hero.tsx` had two separate `<h1>` elements (for the two-line split-color homepage headline "Electrical Systems." / "Engineered, Built, and Delivered.") — a real duplicate-H1 SEO defect, confusing to search engines about the page's actual topic. Now one `<h1>` wrapping two `<span>`s, same visual result. Added `<meta name="developer" content="spiceworx.com">` to `index.html` per the user's explicit request.

Verified live in-browser: direct navigation to `/product/frenic-hvac` loads the correct product (not homepage) with correct `<title>`, meta description, canonical, `og:type=product`, and both JSON-LD blocks present; clicking a category filter tab updates the URL to `/products/circuit-breaker` and a hard refresh on that URL correctly restores the filtered view; an unrecognized path renders the new `NotFound` page with `noindex`; `robots.txt`/`sitemap.xml`/`llms.txt` all serve correctly. `npm run lint` and `npm run build` both clean throughout.

### Session 20 — Custom og-image.png + real brand logos on homepage

Two quick follow-up requests after Session 19.

**Custom `og-image.png`.** User first asked to point the default `og:image`/`twitter:image` at the homepage hero background (`slideshow/sl-1.jpg`) instead of the logo — done by changing `DEFAULT_OG_IMAGE` in `src/lib/seo.ts` and the static tags in `index.html`. User then asked for an actual cropped/resized copy at the standard `1200×630` social-preview size, named `og-image.png`. `sl-1.jpg` is a wide 970×357 Fuji Electric promotional banner (not a "control room" photo despite its `alt` text) — a naive centered crop to the `1.91:1` OG ratio clipped both the "Fuji Electric" wordmark on the left and the "Fuji Electric Group" mark on the top-right. Used `sips --resampleWidth 1200` (no cropping, preserves the full banner) then `sips -p 630 1200 --padColor 1F3A5F` to letterbox top/bottom with the site's own deep-blue brand color instead of cropping — full content stays intact, bars read as intentional. Saved as `public/images/og-image.png`, wired as the new `DEFAULT_OG_IMAGE` and into `index.html`'s static OG/Twitter tags (plus added `og:image:width`/`og:image:height`).

**Real brand logos.** The homepage's "Brands We Distribute & Work With" strip (`Home.tsx`) was 6 plain text `<span>`s (HIMEL, Fuji Electric, Mitsubishi Electric, Schneider Electric, Siemens, Omron). User asked to replace them with actual logos, properly sized/proportioned. Sourced each via `WebSearch`/`WebFetch` plus direct `curl`, preferring Wikimedia Commons (the 5 brands with a Wikipedia infobox logo: Fuji Electric, Mitsubishi Electric, Schneider Electric, Siemens, Omron — all real official SVGs, transparent, correct brand colors) — HIMEL has no Wikipedia/Wikimedia entry, so pulled its logo from a third-party logo aggregator instead (`cdnlogo.com`, a scalable vector matching the shape of HIMEL's own official reverse/white logo asset found on `himel.com`, confirming authenticity) and lightly edited the SVG by hand (stripped a baked-in opaque white background rect, tightened the `viewBox` to crop out ~40% of surrounding padding) since the source file wasn't camera-ready. Saved all 6 as `public/images/brands/*.svg`.

Fuji Electric's Wikimedia file turned out to be their standalone "Fe" symbol mark only (no "Fuji Electric" wordmark text baked into the vector) — confirmed via `grep` that no text elements exist in the SVG. This is legitimate (T'sys's own "Fe Blue" brand-color reference elsewhere in this file confirms Fuji Electric actively uses the bare "Fe" symbol as their standalone mark), so used it as-is rather than fabricating a wordmark that doesn't exist in the source.

`Home.tsx`: replaced the `ACTUAL_BRANDS` string array with `{ name, logo, heightClass }` objects (per-logo height override, since the 6 source assets have wildly different native aspect ratios — Siemens ~6.3:1, HIMEL ~2.7:1, Fuji's square-ish icon — a single shared height class would make some look oversized/undersized relative to the others) and swapped the `<span>` for an `<img>` with `w-auto object-contain`. Kept the strip's existing interaction pattern (previously `text-secondary/50 hover:text-secondary`) by using `grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300` — muted/monochrome by default, full brand color on hover, consistent with the section's existing restrained styling and Design.md's "primary red for CTAs only" restraint (6 saturated brand colors sitting in a row at full opacity would have clashed with that).

Verified live in-browser: all 6 logos render correctly at consistent optical height, grayscale by default; confirmed via computed-style inspection (`getComputedStyle`) that `:hover` actually flips `filter: grayscale(0)` / `opacity: 1` (a screenshot alone was ambiguous — HIMEL's logo is red-on-white, and JPEG compression made the gray→red hover shift hard to eyeball, so checked the computed style directly instead of trusting the screenshot). `npm run lint` and `npm run build` both clean.

### Session 21 — Promoted to production (tsys.com.ph / www.tsys.com.ph)

T'sys approved making this rebuild the live production site. Before touching anything, investigated the actual state of `tsys.com.ph`'s production infrastructure (`aws` CLI, profile `sciadmin`) rather than assuming — and found that most of it had already been prepared two days earlier (2026-08-18/19), independently of this session, almost certainly in anticipation of this exact go-live:

- DNS for `tsys.com.ph` (apex) and `www.tsys.com.ph` **already pointed** at CloudFront distribution `E1ZQEG5WQOCWTK` (origin bucket `tsys-website-prod`, ap-northeast-1, OAC-private — same pattern as study-dev), with an ACM cert covering both apex and www, and a CloudFront Function (`tsys-apex-to-www-redirect`) already redirecting the apex to `www`. So this promotion involved **no DNS changes** — purely a content swap behind an already-live endpoint.
- A least-privilege deploy IAM user, `github-deploy-tsys`, already existed (created 2026-08-18), scoped to exactly this bucket + distribution.
- A separate private repo, `ruelabion/tsys.com.ph`, had its own working pipeline auto-deploying the *old* static site to this same bucket/distribution on every push to its `main` — last run 2026-08-19. Its GitHub secrets held the same `github-deploy-tsys` key.
- Not yet done: CloudFront custom error responses (403/404 → `/index.html`, 200) for SPA routing, and the 3 static SEO files from Session 19 were still hardcoded to `study-dev.tsys.com.ph`.

Discussed two options with the user for taking over deploys — reuse the old repo's pipeline vs. build an independent one in `tsys-study1` — and confirmed: **independent pipeline in `tsys-study1`, retiring the old repo's workflow**, deploying **automatically on every push to `main`** (same as study-dev).

What was done, in order:
1. **Backup**: `aws s3 sync s3://tsys-website-prod` → `/Users/ruelabion/Sites/tsys.com.ph/tsys-website-prod-backup-2026-08-20/` (201 objects, local disk) before changing anything.
2. **Retired the old pipeline**: in `ruelabion/tsys.com.ph`, renamed `.github/workflows/deploy.yml` → `deploy.yml.disabled` on a branch, pushed, opened PR #1. Direct push to that repo's `main` and merging the PR were both blocked by the harness's auto-mode permission classifier (pushing/merging in a *different* repo than the one this session was working in) — the PR is open at **https://github.com/ruelabion/tsys.com.ph/pull/1** and needs a human to merge it. Until merged, the old workflow file still exists (just not on `main` yet via this path) — low risk since it only triggers on pushes to that repo's `main`, which nothing is doing anymore.
3. **Rotated deploy credentials**: the existing `github-deploy-tsys` access key's secret (created 2026-08-18) wasn't recoverable via the AWS API, so created a fresh key (`aws iam create-access-key`), piped the new Access Key ID and Secret directly into `gh secret set` for `tsys-study1` (`PROD_AWS_ACCESS_KEY_ID`, `PROD_AWS_SECRET_ACCESS_KEY`, plus `PROD_CLOUDFRONT_DISTRIBUTION_ID` = `E1ZQEG5WQOCWTK`) without ever printing the secret value, then deactivated + deleted the old key.
4. **Added SPA fallback** to the prod CloudFront distribution: `get-distribution-config` → added the same two `CustomErrorResponses` entries study-dev already has (403 & 404 → `/index.html`, 200, `ErrorCachingMinTTL: 300`) → `update-distribution` with the returned ETag. No other config changed (origin/cert/aliases/function were all already correct).
5. **Fixed the Session 19 domain-hardcoding flag**: `sed`-replaced `study-dev.tsys.com.ph` → `www.tsys.com.ph` across `public/robots.txt`, `public/sitemap.xml`, and `index.html`'s static OG/canonical/JSON-LD tags. `src/lib/seo.ts`'s per-page tags needed no change (self-reference `window.location.origin` already).
6. **New workflow**: `.github/workflows/deploy-production.yml`, a near-exact copy of the existing `deploy.yml` (Session 12) — same build steps, but targets `s3://tsys-website-prod` in `ap-northeast-1` and distribution `E1ZQEG5WQOCWTK`, using the new `PROD_*`-prefixed secrets so it can't collide with study-dev's existing secrets in the same repo. Both pipelines now run side by side on every push to `main` — study-dev remains the continuous preview/QA environment, unchanged.

**Note (added same day, see Session 22):** study-dev was fully decommissioned later this same day, once production was confirmed working — it's no longer "the continuous preview/QA environment," it no longer exists at all.

| Resource | Value |
|---|---|
| Prod S3 bucket | `tsys-website-prod` (ap-northeast-1, OAC-private, pre-existing) |
| Prod CloudFront distribution | `E1ZQEG5WQOCWTK` → `d21qkke7goleq2.cloudfront.net` |
| Prod ACM cert (covers apex + www) | `arn:aws:acm:us-east-1:033858994314:certificate/ea577ef4-623f-4582-8d25-2dfec3b01a2a` |
| Deploy IAM user | `github-deploy-tsys` (policy `deploy-s3-cloudfront`; key rotated this session) |
| Apex→www redirect | CloudFront Function `tsys-apex-to-www-redirect` (pre-existing, untouched) |
| Retired pipeline | `ruelabion/tsys.com.ph` repo, `.github/workflows/deploy.yml` → disabled via [PR #1](https://github.com/ruelabion/tsys.com.ph/pull/1), merged same day at the user's request |
| Backup of old site | `/Users/ruelabion/Sites/tsys.com.ph/tsys-website-prod-backup-2026-08-20/` (local, 201 objects) |

`npm run lint` and `npm run build` clean before shipping. Live-verified post-deploy: apex→www redirect works, deep links (`/products`, `/product/frenic-hvac`, etc.) load correctly via CloudFront's new SPA fallback, canonical/OG tags self-resolve to `www.tsys.com.ph`, `robots.txt`/`sitemap.xml` serve correctly, no console errors, study-dev unaffected throughout.

### Session 22 — study-dev.tsys.com.ph fully decommissioned

Same-day follow-up. With production confirmed working, the user asked to retire `study-dev.tsys.com.ph` — asked first whether the study-dev S3 bucket/CloudFront needed to be *kept* somehow since it was now serving production; clarified that's a misunderstanding — production runs on entirely separate infrastructure (`tsys-website-prod` bucket + `E1ZQEG5WQOCWTK`, ap-northeast-1) from study-dev (`tsys-study-dev` bucket + `E183JGTQTHVO9X`, ap-southeast-1), so tearing down study-dev has zero effect on the live site. User confirmed a **complete teardown** (not just taking it offline).

Order of operations, each verified before moving to the next:
1. Removed `.github/workflows/deploy.yml` from `tsys-study1` (commit + push) first, so no future push could try deploying to soon-to-be-deleted resources.
2. Deleted the now-unused GitHub secrets (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `CLOUDFRONT_DISTRIBUTION_ID`) — the `PROD_*`-prefixed production secrets are untouched.
3. Deleted the Route 53 CNAME for `study-dev.tsys.com.ph` (zone `Z31WA5GARGN3P`).
4. Disabled CloudFront distribution `E183JGTQTHVO9X` (`Enabled: false`), then polled in a background task (`Bash` `run_in_background` with an `until` loop, per the harness's guidance for one-shot "wait until done" conditions) until its status returned to `Deployed` — took a few minutes to propagate globally, as expected — before it could legally be deleted.
5. Deleted the distribution, then its Origin Access Control (`E2PCHJR8J3RHXX`).
6. Emptied (`aws s3 rm --recursive`, 79 objects) then deleted the S3 bucket `tsys-study-dev`.
7. Deleted the IAM user `github-deploy-tsys-study-dev` (access key → inline policy → user, in that order).

Deliberately **not touched**: the ACM cert (`f88f10f3-3d76-4dd7-abb4-8ec786edd5de`) is the shared `*.tsys.com.ph` wildcard cert that predates study-dev (reused from elsewhere per Session 12's original notes) — left alone.

Verified throughout and after: `https://www.tsys.com.ph/` and `https://tsys.com.ph/` kept returning 200/302 (redirect) at every step; `study-dev.tsys.com.ph` now fails to resolve entirely; `aws s3 ls s3://tsys-study-dev` and `aws iam get-user --user-name github-deploy-tsys-study-dev` both correctly error with "does not exist."

**Consequence worth flagging** (also added under "Open items" above): this repo now has **no staging/preview environment at all**. Every push to `main` deploys straight to the live public site via `deploy-production.yml`, with nothing in between. This wasn't an oversight — the user explicitly chose full teardown — but it's a real change in risk profile for future work on this repo; local `npm run build && npm run preview` before pushing is the only remaining pre-flight check.

**Workflow change requested right after this session**: the user asked to commit locally but hold off on `git push` to `main` until they explicitly approve, specifically because of the no-staging-environment consequence above (every push now goes live immediately). Saved as a standing feedback memory — see `feedback_no_push_without_approval.md` in this project's auto-memory. Applies to `main` specifically, not a general rule against pushing.

### Session 23 — Product category scroll-into-view + restored Pirsch analytics

Two small follow-ups.

**Scroll-to-filter-bar on category change.** User reported that clicking a category pill in `ProductList.tsx`'s sticky filter bar left the viewport wherever it happened to be scrolled (e.g. deep into the previous category's product grid), rather than showing the new filtered results from the top. Fix: added a non-sticky anchor `<div>` immediately before the sticky filter bar, and `handleSetActive` now computes `anchor.getBoundingClientRect().top + window.scrollY - 100` (100 = fixed header height) and calls `window.scrollTo({ top, behavior: 'smooth' })`. Measuring the *sticky* element's own rect directly doesn't work — once stuck, `getBoundingClientRect().top` reports ~100 regardless of actual scroll position, since that's where it's pinned; the anchor sits in normal document flow so its rect always reflects true position.

Verification of this one hit the documented `document.hidden`/rAF-freeze browser-automation artifact again (see "Browser Testing Notes" above) — this time it froze the *smooth-scroll animation itself* mid-flight (scrolled partway from 1800px toward the ~294px target, then stalled), not just Framer Motion transitions as previously documented; same root cause, same fix doesn't apply here since there's no click to "unstick" a scroll animation. Confirmed the underlying logic was correct by patching `window.scrollTo` to force `behavior: 'auto'` (instant, non-animated) for one test click — landed exactly on the computed target (294.5px). Real visitors are never affected (their tabs are always focused/visible).

**Restored Pirsch analytics.** User pointed at the old site's source (`/Users/ruelabion/Sites/tsys.com.ph/tsys-website-claude/offline/index.html`) and asked to restore Pirsch, a privacy-friendly/cookieless analytics service that was on the old site but never carried over during the Session 2 migration. Found the old script tag (`https://api.pirsch.io/pa.js`, `data-code="5N8QDndTNa3jhLhlieeSsWGvfuL36j9B"`) and added the identical tag to `index.html`. Checked Pirsch's current docs first, since this app is a client-side-routed SPA (unlike the old multi-page site) — confirmed the default script "tracks programmatic URL changes by default," i.e. auto-tracks History API navigation (exactly what `src/lib/routes.ts`'s `pushState`/`replaceState` calls produce), so the plain tag needs no `data-disable-history` override or manual `pirsch()` calls to cover every page of the SPA, not just the initial load.

Session 14 wrote `PrivacyPolicy.tsx`'s Section 1 to say "We do not currently use cookies, analytics trackers, or advertising pixels on this website" — accurate when written (confirmed via grep at the time), no longer true. Updated that paragraph to accurately describe Pirsch (cookieless, doesn't track across sites, doesn't build individual visitor profiles) instead of leaving a stale/false claim live on a legal page. Bumped the page's "Last updated" date to match.

`npm run lint` and `npm run build` clean; verified locally in-browser (no console errors, script tag present in served HTML). Committed locally per the new no-push-without-approval preference (see above) — not yet pushed/deployed as of writing this entry.
