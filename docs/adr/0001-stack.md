# ADR 0001 — Shiplog MVP stack

- Status: Accepted (pending CEO review of stack decision on TES-2)
- Date: 2026-05-29
- Decider: Founding Engineer
- Context issue: TES-2 — Repo, scaffolding & first deploy

## Context

Shiplog turns the work a team ships into a public changelog. The MVP roadmap
(TES-3+) needs: authentication and a data model, ingestion of shipped work,
AI-generated changelog entries, and a public-facing page. We optimise for
shipping a working MVP and learning speed over premature scale, and for a
codebase the next engineers can navigate without surprises.

## Decision

End-to-end TypeScript, a single deployable web app, and the simplest hosting
that yields a live URL.

| Concern         | Choice                                   | Why |
| --------------- | ---------------------------------------- | --- |
| Language        | TypeScript                               | One language across UI, server, and tooling. |
| Framework       | Next.js 16 (App Router)                  | Single deployable app: UI + server routes + API in one project. The current `latest` release; scaffolded by `create-next-app`. |
| Runtime / pkg   | Node 22 LTS, pnpm                        | LTS runtime; pnpm is fast and lockfile-strict. |
| Styling         | Tailwind CSS v4                          | Default with the scaffold; fast, conventional. |
| Tests           | Vitest                                   | Fast, native ESM/TS, minimal config. |
| Lint            | ESLint (`eslint-config-next`)            | Ships with the framework. |
| Database        | Managed Postgres (Neon or Vercel Postgres) | Proven relational store; added in TES-3 with the data model. |
| CI              | GitHub Actions — lint + typecheck + test + build | Runs on every push/PR to `main`. |
| Hosting (now)   | GitHub Pages via static export           | A real live URL with **zero third-party accounts** — proves the deploy pipeline today. |
| Hosting (prod)  | Vercel (target)                          | First-class Next.js host with server runtime + managed Postgres; adopt when server-backed features (auth, ingestion, AI) land. |

## Hosting: two-stage path

The product will need a server runtime (auth sessions, DB queries, AI calls),
which a static site cannot serve. But standing up Vercel requires a Vercel
account, an API token (a secret), and a spend decision — all governance/CEO
actions, not something to bake into this scaffold.

So the foundation milestone ships on **GitHub Pages**: the app builds a static
export (`STATIC_EXPORT=1`, see `next.config.ts`) and a GitHub Actions workflow
publishes it. This gives a genuine live URL now with no credentials.

The app's **default build is a normal server-capable Next.js build** (what CI
runs). Switching production to Vercel is then: connect the repo in Vercel, set
env vars, and drop the static-export flag — no app rewrite. The static export
is a deploy-target toggle, not an architectural commitment.

### Migration trigger

Move production to Vercel when the first server-backed feature lands (TES-3
auth/data model is the likely trigger). That requires, from the CEO/board:

1. A Vercel account + project connected to this repo.
2. A managed Postgres instance (Neon or Vercel Postgres) + `DATABASE_URL`.
3. Approval of the (small, usage-based) hosting/DB spend.

## Consequences

- One repo, one app, one language — easy onboarding.
- A live URL and green CI from day one, fully automated.
- Static export cannot run server code; dynamic features are gated on the
  Vercel migration above. Until then, routes are statically prerendered
  (the `/api/health` route is `force-static`).
- Pinned to Next 16.2.6 / React 19.2.6. Builds must run with
  `NODE_ENV=production` (CI sets this) so React loads its production runtime
  during prerendering.
