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
    switchgear/     LVSG, MVSG, HVSG, ECBM, oil_immersed_transformer.jpg
    vfd/            frenic_hvac.jpg, frenic_ace.jpg, frenic_aqua.jpg, frenic_mega.jpg (real photos, all four)
    instrumentation/ pressure_transmitter.jpg, ultrasonic_flowmeter.png
  tsys/             tsysteam_img.png, contactperson.png, aboutus_sig.png, logo.jpg, trade-show-booth.jpg
public/brochures/   Real downloadable PDF datasheets, referenced by Product.brochureUrl:
  frenic-hvac-catalog.pdf, fkp5-pressure-transmitter.pdf,
  flr-ultrasonic-flowmeter.pdf, fuji-oil-immersed-transformer.pdf
```

Note: All four Fuji Electric VFD products now have real photos (see Session 6). The old `pl_*.png` placeholder set has been deleted. A product with no photo yet renders the shared `ProductImage` "Image Coming Soon" placeholder instead (see Session 6) — never reuse an unrelated product's image as a stand-in.

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

**Open items / not yet done** (flagged in various sessions, still outstanding as of Session 16):
- Contact form has never been tested end-to-end against the live AWS endpoint (deliberately, to avoid spamming T'sys's real inbox with test data) — a human should do one real test submission.
- Legacy products (everything except the 4 with real `brochureUrl`s) still have non-functional brochure buttons if `brochureLabel` is set without a matching PDF.
- `induction-motors`, `transfer-switch`, and `synchronizing-switchgear` categories are still "Coming Soon" placeholders with zero products.
- No staging→production promotion path yet — `study-dev.tsys.com.ph` is a separate environment from the live `tsys.com.ph`/`www.tsys.com.ph` production site; nothing here currently pushes to production.

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

Live at **https://study-dev.tsys.com.ph** (also reachable directly via the CloudFront domain below). AWS account `033858994314`, profile `sciadmin`.

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
