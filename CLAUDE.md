# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # Type-check with tsc --noEmit (no separate test suite)
npm run preview   # Preview production build
```

**Environment**: Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` before running.

## Architecture

**IndustrialDirect** is a single-page React 19 app (Vite 6 + TypeScript + Tailwind CSS v4) showcasing industrial electrical components. It was scaffolded from Google AI Studio.

### Navigation

There is no React Router. Navigation is managed entirely by a `currentPage` string in `App.tsx` state, passed as `onNavigate` prop to `Header`. Pages: `home`, `product`, `profile`, `settings`, `form`. All page transitions use `motion/react` `AnimatePresence`.

### Design system

Defined in `src/index.css` via Tailwind v4 `@theme`:

- **Fonts**: `font-sans` → Inter, `font-headline` → Space Grotesk (applied to all `h1–h4` by default)
- **Brand color**: `text-primary` / `bg-primary` → `#ab0017`; hover state uses `bg-primary-container` → `#d1232a`
- **Responsive margin**: `px-margin` uses `clamp(16px, 5vw, 64px)` — use this on all full-width sections
- **Label utility**: `.label-caps` → 12px bold uppercase Space Grotesk with `tracking-[0.1em]`
- Max content width is `max-w-[1440px] mx-auto`

### Path alias

`@` resolves to the project root (e.g., `import x from '@/src/components/Foo'`).

### Gemini API

`process.env.GEMINI_API_KEY` is injected by Vite at build time from `.env.local`. In AI Studio deployments, this is injected automatically from user secrets.
