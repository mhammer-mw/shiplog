# Shiplog

Turn the work you ship into a public changelog — automatically.

This is the MVP foundation: a single deployable TypeScript web app. See
[`docs/adr/0001-stack.md`](docs/adr/0001-stack.md) for the stack decision and
the hosting migration path.

## Stack

- **Next.js 16** (App Router) + **TypeScript** — one deployable app (UI + API)
- **Tailwind CSS v4** for styling
- **Vitest** for tests, **ESLint** for linting
- **Node 22 LTS** + **pnpm**
- **Postgres** (managed) — added with the data model in TES-3
- CI: **GitHub Actions** (lint + typecheck + test + build)
- Hosting: **GitHub Pages** now (static export, no accounts needed) →
  **Vercel** once server-backed features land

## Prerequisites

- Node 22 (`nvm use` reads `.nvmrc`)
- pnpm (`corepack enable` or `npm i -g pnpm`)

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

| Script               | What it does                                     |
| -------------------- | ------------------------------------------------ |
| `pnpm dev`           | Dev server                                       |
| `pnpm build`         | Production server build (CI builds this)         |
| `pnpm build:static`  | Static export to `out/` (GitHub Pages)           |
| `pnpm start`         | Serve the production server build                |
| `pnpm lint`          | ESLint                                           |
| `pnpm typecheck`     | `tsc --noEmit`                                   |
| `pnpm test`          | Vitest                                           |

> **Note:** `pnpm build` must run with `NODE_ENV=production`. CI sets this; set
> it locally too if your shell exports `NODE_ENV=development`
> (`NODE_ENV=production pnpm build`). Otherwise React loads its dev runtime and
> prerendering fails.

## Deploy

Pushing to `main` runs CI and, on success, deploys a static export to GitHub
Pages via `.github/workflows/deploy-pages.yml`. The live URL is reported in the
deploy job summary and in the repo's Pages settings.

## Layout

```
src/
  app/            # App Router: pages, layouts, API routes
    page.tsx      # Hello-world landing page
    api/health/   # GET /api/health — status + version
  lib/
    app-info.ts   # App name/version (single source of truth)
docs/adr/         # Architecture decision records
.github/workflows # CI + Pages deploy
```
