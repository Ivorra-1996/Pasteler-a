# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Next.js storefront for a bakery ("Pasteler-a" / pasteleria) — product catalog, cart, and checkout info flow. Content and comments in the codebase are in Spanish.

## Commands

Package manager is Yarn (yarn.lock present).

- `yarn dev` — start the Next.js dev server
- `yarn build` — production build
- `yarn start` — run a production build
- `yarn lint` — run ESLint (`next/core-web-vitals`, `next/typescript` configs)

There is no test suite configured in this repo.

## Architecture

- Next.js 15 App Router (`src/app`) with React 19 and TypeScript. Path alias `@/*` maps to `src/*`.
- Most interactive components are client components (`'use client'`); page-level files under `src/app` are minimal wrappers that render a top-level component from `src/components`.

### Component structure convention

Every component lives in its own folder under `src/components/<Name>/`:
- `<Name>.tsx` — the component implementation (default export)
- `<Name>.module.css` — CSS Modules styling, imported as `styles`/`style`
- `index.ts` — barrel file re-exporting: `export { default as <Name> } from './<Name>';`

Other files import the component via the folder, e.g. `import { Header } from '../Header'` or `import { Catalog } from '@/components/Catalog'`, never by reaching into the implementation file directly. Nested/sub-components (e.g. `Initiation/components/Logo`) follow the same pattern one level deeper.

Components own their full implementation rather than sharing small abstractions: e.g. `lucide-react` has no brand icons (Instagram, WhatsApp), so each component that needs one (`Footer`, `Gallery`, `WhatsAppButton`) draws its own inline SVG rather than importing a shared icon; likewise "buy button" styling is redeclared per component (`Catalog`, `News`, `Cart`, `NotFound`) instead of extracted into one shared class. Follow this pattern rather than introducing shared UI primitives.

### Design tokens

`src/app/globals.css` defines the whole visual language as CSS custom properties on `:root` — colors (`--color-bg`, `--color-accent`, `--color-text-strong`, etc.), fonts (`--font-heading` = Lora, `--font-body` = Mulish, both loaded via `next/font/google` in `layout.tsx`), spacing (`--space-1`…`--space-7`), type scale (`--text-xs`…`--text-display`), and `--radius-btn`. Every component's CSS Module should reuse these instead of hardcoding colors/sizes — the "artesanal" identity (warm terracotta/cream palette, italic serif headings, sharp corners, thin 1px borders instead of shadows) depends on that consistency.

### Cart data flow

There is no backend/API. Cart state is global, provided by `CartProvider` (`src/context/CartContext.tsx`), which wraps the whole app in the root layout (`src/app/layout.tsx`). Any component reads/mutates the cart via the `useCart()` hook (`cart`, `cartCount`, `addToCart`, `updateQuantity`, `removeItem`, `clearCart`) — there is no prop-drilling.

Persistence to `localStorage` is centralized inside `CartProvider`, via `src/utils/cartUtils.tsx` (`setCartData` / `getCartData`): it loads saved data on mount and saves on every change (a first-save guard skips the very first effect run so the initial empty state doesn't clobber what was just loaded). All consumers — including `Cart` (`src/components/Cart/Cart.tsx`) — go through this same path; there is no direct `localStorage` access outside of `cartUtils.tsx`.

Product/catalog data lives in `src/data/products.ts` (`productos`, `catalogTags`) — hardcoded, no real API yet (see the comment in `Catalog.tsx`'s `useEffect` about what should happen "if an API existed"). `Catalog` renders the full list; `News` features a subset of the same products (by id) with a different photo per item, so name/price/description stay consistent between the two sections while the imagery doesn't repeat. Product photos live flat in `public/img/` (no subfolders).

### Routing

- `/` → `src/app/page.tsx` → `Initiation` (home: logo, news, catalog, about, process, testimonials, gallery, payment methods, FAQ)
- `/carrito/info` → `src/app/carrito/info/page.tsx` → `Cart` (checkout/cart summary page)

`Header`, `Footer`, and `WhatsAppButton` render once in the root layout (`src/app/layout.tsx`), outside `{children}`, so they persist across navigation instead of remounting per page.

Client-side navigation between them uses `next-nprogress-bar`'s `useRouter` (not `next/navigation`) so route transitions show a progress bar; `Header` does use `next/navigation`'s `usePathname` (read-only) to know the current route for its scroll-spy/active-link logic, which is unrelated to that navigation-progress concern.

### App Router special files

`src/app/` uses several Next.js file conventions beyond `page.tsx`/`layout.tsx`, all deliberate: `not-found.tsx` (custom 404, renders `src/components/NotFound`), `icon.svg` (favicon), `opengraph-image.tsx` (social-share image, generated with `next/og`'s `ImageResponse`), `robots.ts` and `sitemap.ts` (generate `/robots.txt` and `/sitemap.xml`). The latter three read `SITE_URL` from `src/utils/site.ts`, which is currently a placeholder domain — update it there (not per-file) once the site has a real domain. `page.module.css` is unused leftover boilerplate from `create-next-app` (`page.tsx` doesn't import it); don't extend it.

### Animation conventions

`src/components/Reveal` is the standard wrapper for scroll-in-view content (`whileInView` via Framer Motion) and is used throughout the home page's sections. Any `prefers-reduced-motion` handling must read the preference in a `useEffect` (post-mount), never from a hook/value available during the initial render — doing otherwise causes an SSR/client hydration mismatch, since the server can't know the client's OS preference.
