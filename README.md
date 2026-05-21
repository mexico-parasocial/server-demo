# PARA — Civic Social Platform

A civic-tech social platform for digital democracy, built on the AT Protocol. This monorepo contains the frontend website, React Native client, and AT Protocol backend services.

> **m8 Identity Broker** lives in its own repository: [`mexico-parasocial/m8-app`](https://github.com/mexico-parasocial/m8-app.git)

---

## What's in this repo

| Directory | What it is | Tech |
|-----------|-----------|------|
| `website/` | Public docs site, landing page, blog, and schema reference | SvelteKit / TypeScript / pnpm |
| `PARA/` | Mobile & web client (iOS, Android, Web) | React Native / Expo / TypeScript |
| `WhatZatppa/` | Backend monorepo (PDS, AppView, Ozone, PLC) | Node.js / TypeScript / pnpm |
| `ansible/` | Infrastructure playbooks and deployment configs | Ansible |
| `scripts/` | Shared deployment & ops scripts | Bash / Node.js |

---

## Quick Start

### Prerequisites

- **Node.js** >= 24.15.0 (use `.nvmrc` files in subprojects)
- **pnpm** >= 8.15.9 (enforced via `packageManager` fields)
- **Docker** — for Postgres, Redis, and dev services
- **Java 17 (Zulu)** — only if building Android or running the full backend
- **Go** >= 1.25 — only for `bskyweb` and `indigo` services

Install pnpm if you don't have it:
```bash
npm install -g pnpm@8.15.9
```

---

## Website (`website/`)

The public docs site and landing page. Built with SvelteKit and deployed to Cloudflare Pages.

```bash
cd website
pnpm install
pnpm run build
```

**Structure:**
- `apps/website/` — SvelteKit app (landing, docs, blog, schema reference)
- `packages/content-schema/` — Schema fixtures and content validation

---

## Backend (`WhatZatppa/`)

The AT Protocol backend. ~20 packages in a pnpm workspace.

```bash
cd WhatZatppa

# Install dependencies
make deps

# Generate lexicon types from JSON schemas
make codegen

# Build all packages
make build

# Run dev environment (ephemeral DB/Redis — data lost on stop)
make run-dev-env

# Run dev environment (persistent DB/Redis + PDS blobs)
cp -n .env.shared-demo.example .env.shared-demo
make run-dev-env-persistent
```

**Persistent dev data** lives in `~/.paramx-demo/` by default.

**Auto-seeded demo data** (`make run-dev-env` creates):
- 5 users: `alice`, `bob`, `carla`, `dan`, `eva` — password: `hunter2`
- 3 communities, 4 cabildeos with votes, 6 posts with highlights, 2 vote delegations

**Useful make targets:**
```bash
make test          # Full test suite (needs test DB/Redis)
make lint          # pnpm verify (style + lint + types)
make fmt           # pnpm format (eslint --fix + prettier --write)
make doctor        # Health checks for all services
make pds-doctor    # PDS-specific health check
```

> **Node version mismatch?** If you switch Node versions, rebuild native deps:
> ```bash
> nvm use 24.15.0
> cd node_modules/.pnpm/better-sqlite3@10.0.0/node_modules/better-sqlite3
> npx node-gyp rebuild
> ```

---

## Mobile Client (`PARA/`)

The React Native / Expo client.

```bash
cd PARA

# Install dependencies
pnpm install

# Start Expo dev server
pnpm web        # Web target
pnpm ios        # iOS simulator
pnpm android    # Android emulator
```

**Key configs:**
- `app.config.js` — Expo config (bundle IDs, plugins, deep links)
- `src/lib/constants.ts` — API endpoints, local dev IPs

**Web layout standard:** Center-column screens use `Layout.Center` + `ScrollView` with `padding: 16` and `paddingBottom: 100`. See `RepresentativesScreen` for the canonical pattern.

---

## Identity & Trust (`m8`)

The m8 identity broker — Proof-of-Personhood Wallet, credential management, and identity backend — is maintained as a **separate open-source project**.

- **Repository:** [`mexico-parasocial/m8-app`](https://github.com/mexico-parasocial/m8-app.git)
- **Stack:** React Native Expo (wallet) + AdonisJS (identity manager backend)
- **Features:** INE verification, ZKP age proofs, persona management, grant consent, device trust

PARA depends on m8 for citizen verification and anonymous identity issuance, but the two projects can be developed and deployed independently.

---

## Full Local Demo

To run the entire stack locally (website + PARA client + backend + bskyweb):

1. **Start ngrok tunnels** (in separate terminals):
   ```bash
   ngrok http --url=https://pds.paramx.social.ngrok.pro 2583
   ngrok http --url=https://appview.paramx.social.ngrok.pro 2584
   ```

2. **Start backend** (`WhatZatppa/`):
   ```bash
   make run-dev-env-persistent
   ```

3. **Start bskyweb** (browser-facing web demo):
   ```bash
   cd PARA/bskyweb
   go run ./cmd/bskyweb serve --appview-host https://appview.paramx.social.ngrok.pro --http-address :8100
   ```

4. **Start PARA client**:
   ```bash
   cd PARA
   pnpm web
   ```

5. **Seed demo data** (after backend is healthy):
   ```bash
   cd PARA
   pnpm seed:civic:apply --introspect-url http://127.0.0.1:2581
   ```

6. **Open** `http://localhost:8100` for the browser demo.

> **Order matters:** ngrok tunnels must be up before the backend starts. Backend must be healthy before seeding.

---

## Project Conventions

### Package Manager

**pnpm everywhere.** Each subproject pins its version via `packageManager` in `package.json`. Never use `npm` or `yarn` inside this repo.

### Module Aliases

The codebase uses `#/` as an alias for `src/`:
```ts
import { COMPASS_COLORS } from '#/lib/compass/compassColors'
```

### Design System (`Alf`)

Use `atoms` (aliased as `a`) for layout and `useTheme` for semantic coloring. No ad-hoc CSS/Styles unless absolutely necessary.

### Political Compass Colors

All 9 compass position colors are defined in `PARA/src/lib/compass/compassColors.ts`. **Never hardcode** a compass color (`#efb9bb`, etc.) anywhere else.

### Lexicons

AT Protocol schemas live in `WhatZatppa/lexicons/`. After modifying any lexicon, run:
```bash
cd WhatZatppa
make codegen
make build
```

### React Query

- Persisted queries use `PERSISTED_QUERY_ROOT` as query key index 0
- For paginated feeds, use `truncateAndInvalidate` (not bare `refetch`) for pull-to-refresh

---

## Documentation

| File | What's in it |
|------|-------------|
| `AGENTS.md` | AI agent orientation — architecture, conventions, local quirks |
| `website/CLOUDFLARE_PAGES.md` | Website deployment runbook |
| `WhatZatppa/PARA_BACKEND_DEVOPS.md` | Backend-specific ops runbook |
| `WhatZatppa/TESTING.md` | Test strategy, jest/vitest configs |
| `PARA/agents.md` | PARA-specific deep-dive (compass colors, iOS quirks, web layout) |

---

## Acknowledgments

This project builds on and alongside the work of many open-source communities and individual contributors:

- **[Bluesky](https://bsky.app/) & [AT Protocol](https://atproto.com/)** — For the protocol, reference implementations, and the social web ecosystem.
- **Eurosky Social** — The [Eurosky Portal](https://github.com/eurosky-social/eurosky-portal) served as a reference for account management UI patterns.
- **Bailey Townsend** — Author of [PDS MOOver](https://tangled.org/@baileytownsend.dev/pds-moover), a reference utility for PDS account migration that informed our PDS tooling.
- **The m8 Identity Stack** — Published separately at [`mexico-parasocial/m8-app`](https://github.com/mexico-parasocial/m8-app.git). The identity broker, PoP Wallet, and credential systems are maintained as a standalone open-source project.

---

## License

MIT and Apache 2.0 (dual-licensed, per upstream atproto/bluesky conventions).
