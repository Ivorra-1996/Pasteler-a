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

### Cart data flow

There is no backend/API and no global state library — cart state is plain React state lifted to `Initiation` (`src/components/Initiation/Initiation.tsx`) and passed down as props (`Header` → `AddToCart`, `News`/`Catalog` → `addToCart` callback).

To hand the cart off across a full page navigation (catalog page → `/carrito/info` checkout page), the cart is serialized to `localStorage` via `src/utils/cartUtils.tsx` (`setCartData` / `getCartData`) rather than passed through routing state. The `Cart` component (`src/components/Cart/Cart.tsx`) reads/writes `localStorage` directly for its own updates (quantity changes, removal) instead of using these shared utils — be aware of this inconsistency if touching cart persistence.

Product/catalog data (`src/components/Catalog/Catalog.tsx`) is currently hardcoded in-component; there is no real API integration yet (see the comment in `Catalog.tsx`'s `useEffect` about what should happen "if an API existed").

### Routing

- `/` → `src/app/page.tsx` → `Initiation` (home: header, logo, news, catalog, footer)
- `/carrito/info` → `src/app/carrito/info/page.tsx` → `Cart` (checkout/cart summary page)

Client-side navigation between them uses `next-nprogress-bar`'s `useRouter` (not `next/navigation`) so route transitions show a progress bar.
