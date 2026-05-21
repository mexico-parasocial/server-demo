# AGENTS.md — PARA Project

> This file is the canonical orientation guide for AI coding agents. The reader is assumed to know nothing about the project. All information below is derived from the actual codebase — do not assume anything that is not stated here.

---

## 1. Project Overview

**PARA** is a civic-social platform for digital democracy built on top of the **AT Protocol** (the same decentralized protocol that powers Bluesky). It adds governance, community, and political-participation features to a standard atproto stack.

The repository is a **monorepo** with two primary subsystems:

| Directory | Role | Tech |
|-----------|------|------|
| `WhatZatppa/` (`m8`) | Backend services (PDS, AppView, Ozone, PLC, etc.) | Node.js / TypeScript / pnpm |
| `PARA/` | Mobile & web client (iOS, Android, Web) | React Native / Expo / TypeScript / pnpm |
| `scripts/` | Deployment, provisioning, and operational scripts | Bash |
| `plurality/` | Research documents on liquid-democracy models | Markdown |

**Key product features:**
- **Cabildeo** — structured policy proposals with voting (for/against/amendment) and liquid-delegation support.
- **Civic Tree** — a spatial tree of communities, collections, civic initiatives, evidence, links, and notes.
- **Political Compass** — 9-position ideological grid (`auth-left` … `lib-right`) used for profile positioning, post highlights, and community alignment.
- **Communities** — group spaces with governance rules and estandartes (community banners).
- **Collections** — curated lists of posts or policies.
- **Highlights** — inline color annotations on posts tied to compass positions.
- **Public-Figure Verification** — manual verification workflow (`f/` prefix) backed by `com.para.identity` records.

---

## 2. Repository Structure

```
mpv/
├── WhatZatppa/           # AT Protocol backend monorepo
│   ├── packages/         # ~20 workspace packages
│   │   ├── pds/          # Personal Data Server (user repos, auth, blobs)
│   │   ├── bsky/         # AppView (feed indexing, search, aggregation)
│   │   ├── ozone/        # Moderation desk (labels, takedowns, reports)
│   │   ├── api/          # Client library (XRPC + lexicon types)
│   │   ├── dev-env/      # Local dev orchestrator + seed data
│   │   ├── dev-infra/    # Docker Compose, test DB/Redis helpers
│   │   ├── lexicon/      # Lexicon schema definitions & validation
│   │   ├── lex-cli/      # Code-generation CLI for lexicons
│   │   ├── xrpc/         # XRPC client
│   │   ├── xrpc-server/  # XRPC server framework
│   │   ├── common/       # Shared utilities
│   │   ├── crypto/       # Cryptographic helpers
│   │   ├── did/          # DID resolution
│   │   ├── identity/     # Handle & DID identity logic
│   │   ├── repo/         # MST repo operations
│   │   ├── sync/         # Repo sync protocol
│   │   └── ...
│   ├── lexicons/         # JSON schema definitions (AT Protocol + PARA extensions)
│   │   └── com/para/...  # PARA-specific lexicons
│   ├── services/         # Dockerfile contexts for each deployable service
│   ├── scripts/          # Doctor scripts, restart helpers
│   ├── docker-compose.prod.yaml
│   ├── package.json      # pnpm workspace root
│   ├── tsconfig.json     # Project references for all packages
│   ├── jest.config.js    # Multi-project Jest runner
│   └── vitest.config.ts  # Vitest config (lex/syntax/tap packages)
│
├── PARA/                 # React Native / Expo frontend
│   ├── src/
│   │   ├── screens/      # Route-level screens (Agora, Communities, Map, etc.)
│   │   ├── components/   # Reusable UI components
│   │   ├── state/        # React Query hooks, persisted state, modals
│   │   ├── lib/          # Utilities, API clients, domain logic
│   │   │   ├── api/      # Para lexicon TypeScript types + API wrappers
│   │   │   ├── compass/  # Political compass colors & logic
│   │   │   ├── cabildeo-*# Cabildeo (policy voting) helpers
│   │   │   └── civic-*   # Civic map, insignias, communities
│   │   ├── view/         # Presentation-layer components
│   │   ├── alf/          # Custom atomic design-system ("Alf")
│   │   ├── locale/       # i18n message catalogs (Lingui)
│   │   └── platform/     # Platform-specific shims
│   ├── bskyweb/          # Go web server (Echo) — browser-facing demo frontend
│   ├── indigo-main/      # Go AT Protocol library (fork of bluesky-social/indigo)
│   ├── bskyembed/        # Embeddable post widget (Vite + Tailwind)
│   ├── bskylink/         # Link-card resolver service
│   ├── bskyogcard/       # OpenGraph card generator
│   ├── dev-env/          # Local mock server for E2E tests
│   ├── __tests__/        # Jest unit tests
│   ├── __e2e__/          # Maestro E2E flow definitions
│   ├── package.json      # pnpm workspace root
│   ├── app.config.js     # Expo configuration (iOS, Android, Web)
│   ├── tsconfig.json
│   └── AGENTS.md         # ⚠️ PARA-specific deep-dive (compass colors, iOS quirks, etc.)
│
├── scripts/              # Root-level deploy & ops scripts
│   ├── deploy-production.sh
│   ├── deploy-local.sh
│   ├── pre-deploy-check.sh
│   ├── smoke-test-production.sh
│   ├── generate-secrets.sh
│   ├── generate-local-env.sh
│   └── ...
│
└── docs/                 # Additional human-runbooks (e.g. PROVISION_VPS.md)
```

---

## 3. Technology Stack

### Backend (`WhatZatppa/`)
- **Runtime:** Node.js >= 24.15.0
- **Package Manager:** pnpm 8.15.9 (enforced via `packageManager` field)
- **Language:** TypeScript 5.8.3
- **Monorepo:** pnpm workspaces
- **Protocol:** AT Protocol (XRPC over HTTPS, DIDs, PLC, repos, MST)
- **Databases:** PostgreSQL 15 (production), SQLite (PDS actor stores in dev), Redis 7 (caching, queues)
- **Blob Storage:** Cloudflare R2 (S3-compatible) in production; local disk in dev
- **API Style:** XRPC (typed RPC over HTTP) with Lexicon schemas
- **Build Output:** Each package compiles to `dist/` (ESM + CommonJS)

### Frontend (`PARA/`)
- **Framework:** React Native 0.81.5 + Expo 54.0.33
- **React:** 19.1.0
- **Package Manager:** pnpm 11.1.1
- **Language:** TypeScript 6.0.2
- **State Management:** React Query (TanStack Query) v5 + persisted cache
- **Navigation:** React Navigation v7
- **Styling:** Custom atomic design system (`alf`) + Tailwind-like utilities
- **Localization:** Lingui v5 (crowdin integration for translations)
- **Maps:** Google Maps (native)
- **Rich Text:** Tiptap v2
- **Build Targets:** iOS, Android, Web (Expo export)

### Supporting Go Services (`PARA/`)
- **bskyweb:** Echo-based web server that renders HTML pages for public profiles/feeds.
- **indigo-main:** Fork of Bluesky's Go AT Protocol library (lexicon parsing, CAR files, repo sync).
- **Go version:** 1.25 – 1.26

---

## 4. Build, Dev & Test Commands

### Backend (`WhatZatppa/`)

```bash
cd WhatZatppa

# Install dependencies
make deps                 # pnpm install --frozen-lockfile

# Generate code from lexicons
make codegen              # pnpm codegen

# Build all packages
make build                # pnpm build (depends on codegen)

# Run full test suite
make test                 # pnpm test (uses with-test-redis-and-db.sh)

# Dev environment (ephemeral DB/Redis)
make run-dev-env          # cd packages/dev-env; NODE_ENV=development pnpm run start

# Dev environment (persistent DB/Redis + PDS blobs)
make run-dev-env-persistent
# Data stored in ~/.paramx-demo/ by default

# Lint / format
make lint                 # pnpm verify (style + lint + types)
make fmt                  # pnpm format (eslint --fix + prettier --write)
make fmt-lexicons         # eslint --fix on lexicons/*.json

# Diagnostics
make doctor               # Run all health checks
make pds-doctor           # Check PDS health, DID resolution, blobstore
make bsky-doctor          # Check AppView health and dataplane
make postgres-doctor      # Check Postgres connections, disk, slow queries
make pre-deploy           # Check readiness for production
make smoke-test           # E2E smoke tests against production
```

### Frontend (`PARA/`)

```bash
cd PARA

# Install dependencies
pnpm install

# Start dev server
pnpm start                # expo start --dev-client
pnpm web                  # expo start --web

# Native builds
pnpm ios                  # expo run:ios
pnpm android              # expo run:android
pnpm android:prod         # expo run:android --variant release

# Tests
pnpm test                 # jest --forceExit --testTimeout=20000 --bail
pnpm test-watch           # jest --watchAll
pnpm test-ci              # jest --ci --forceExit --reporters=default,jest-junit
pnpm test-coverage        # jest --coverage

# Lint / typecheck
pnpm lint                 # eslint --cache --quiet src
pnpm typecheck            # tsgo --project ./tsconfig.check.json

# i18n
pnpm intl:build           # extract + compile
pnpm intl:extract         # lingui extract --clean --locale en
pnpm intl:compile         # lingui compile

# Seed civic demo data (requires running backend)
pnpm seed:civic:apply --introspect-url http://127.0.0.1:2581
pnpm seed:civic:reset

# E2E (Maestro)
pnpm e2e:run              # maestro test
pnpm perf:test            # maestro test __e2e__/perf-test.yml
```

### Go Web Server (`PARA/bskyweb/`)

```bash
cd PARA/bskyweb
go run ./cmd/bskyweb serve \
  --appview-host https://appview.example.com \
  --http-address :8100
```

---

## 5. Code Organization

### Backend Packages

Each `WhatZatppa/packages/*` directory is an independent npm package with its own `package.json`, `tsconfig.json`, and `jest.config.js`.

| Package | Purpose |
|---------|---------|
| `pds` | Personal Data Server — user accounts, auth, repos, blob storage |
| `bsky` | AppView — indexing, feed generation, search, hydration |
| `ozone` | Moderation service — reports, labels, takedowns |
| `api` | TypeScript client library consumed by PARA |
| `dev-env` | Local orchestrator that spins up PLC + PDS + AppView + Ozone |
| `lexicon` | Schema definitions, validation, and code-gen inputs |
| `xrpc` / `xrpc-server` | RPC transport layer |
| `common` / `common-web` | Shared utilities (validators, parsers, etc.) |
| `crypto` | Key generation, signing, DID crypto |
| `did` / `identity` | DID resolution, handle validation |
| `repo` / `sync` | Repo MST operations and sync protocol |

**Dependency flow:** `lexicon` → `xrpc` → `api` → `pds` / `bsky` / `ozone`. `dev-env` depends on nearly everything.

### Frontend Source Tree

- `src/screens/*` — Top-level route screens. Many have `.web.tsx` counterparts for web parity.
- `src/state/*` — React Query hooks, persisted preferences, dialog/modal state, session management.
- `src/lib/api/*` — Auto-generated and hand-written API wrappers. `para-lexicons.ts` contains the PARA-specific record types.
- `src/lib/compass/*` — Canonical source of truth for political-compass colors and grid layout.
- `src/alf/*` — Atomic styling system. Components use `atoms` (aliased as `a`) and `useTheme`.
- `src/components/*` — Reusable UI primitives (Composer, Dialogs, Feeds, Posts, etc.).
- `src/locale/*` — Lingui message catalogs. English is the source language; Crowdin manages translations.

---

## 6. Development Conventions

### TypeScript & Imports

- **Backend import alias:** `@atproto/<package>` (e.g., `import { AppContext } from '@atproto/bsky'`).
- **Frontend import alias:** `#/*` maps to `src/*` (e.g., `import { useSession } from '#/state/session'`).
- **Backend ESLint:** Enforces `import/order` with alphabetical sorting, no extraneous imports (`n/no-extraneous-import`), and Node protocol prefixes (`n/prefer-node-protocol`).
- **Frontend ESLint:** Uses `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-native`, `eslint-plugin-simple-import-sort`, `eslint-plugin-react-compiler`, plus a custom `eslint-plugin-bsky-internal`.

### Lexicons & Code Generation

- AT Protocol schemas live in `WhatZatppa/lexicons/` as JSON files.
- PARA extensions are under `WhatZatppa/lexicons/com/para/`.
- **Rule:** If you modify any `.json` lexicon, run `make codegen` (or `pnpm codegen`) to regenerate TypeScript types and server stubs.
- The backend uses `verify:para-lexicons` to ensure the generated code stays in sync with the JSON schemas.

### Naming & Language

- Most code comments and technical docs are in **English**.
- User-facing READMEs and some runbooks contain **Spanish**.
- Domain terminology uses Spanish loanwords in code: `cabildeo`, `estandartes`, `comunidad`.

### Git Hooks (Frontend)

- `husky` + `lint-staged` runs `eslint --cache --fix` and `prettier --cache --write` on staged files.
- `svgo` optimizes SVG icons on commit.

---

## 7. Testing Strategy

### Backend
- **Unit tests:** Jest (configured per package via `jest.config.js`). Root `jest.config.js` uses `projects` to run all packages.
- **Integration tests:** Vitest for `packages/lex/*`, `syntax`, and `tap`.
- **Test infrastructure:** `packages/dev-infra/with-test-redis-and-db.sh` spins up ephemeral Postgres + Redis containers for the test suite.
- **Coverage:** Vitest coverage via `v8` provider. Excludes `dist/`, `node_modules/`, `src/lexicons/`, and `tests/`.
- **Dev-env seed:** `para-demo.ts` seeds 20 users, communities, cabildeos, posts, and delegations for manual testing.

### Frontend
- **Unit tests:** Jest with `jest-expo/ios` preset. Babel transforms via `babel-jest`.
- **E2E tests:** Maestro flows in `__e2e__/`. Build variants use `EXPO_PUBLIC_ENV=e2e` and `.e2e.ts/.e2e.tsx` source extensions.
- **Performance tests:** Flashlight + Maestro for bundle performance measurement.
- **Coverage path ignores:** `src/platform`, `src/third-party`, `src/view/com/util`, `src/state/lib`.

### Go
- `golang-test-lint.yml` runs tests and linting on PRs.

---

## 8. Deployment & Operations

### Local Development

1. Start backend:
   ```bash
   cd WhatZatppa
   make deps && make build
   cp -n .env.shared-demo.example .env.shared-demo
   make run-dev-env-persistent
   ```
2. Start frontend:
   ```bash
   cd PARA
   pnpm install
   pnpm start
   ```

### Production Architecture

Production runs as Docker Compose services on one or more Linux hosts:

| Service | Port | Role |
|---------|------|------|
| `postgres` | internal | PostgreSQL 15 (not exposed to host) |
| `redis` | internal | Redis 7 (caching, queues) |
| `pds` | 2583 | Personal Data Server (internal, proxied by Caddy) |
| `dataplane` | 2585 | AppView data plane (Postgres queries) |
| `bsky` | 2584 | AppView API (internal, proxied by Caddy) |
| `ozone` | 3000 | Moderation desk |
| `caddy` | 443/80 | Reverse proxy + TLS termination |

**Deploy script:** `scripts/deploy-production.sh [user@host]`
- Validates `.env` (blocks on `localhost` hostname or placeholder values).
- rsyncs `WhatZatppa/` to the server (excluding `node_modules`, `.git`, `dist`, etc.).
- Builds Docker images **on the server** (`--no-cache`) and starts the stack.
- Runs health checks against `_health` and `_ready` endpoints.

**Pre-deploy checks:**
```bash
cd WhatZatppa && make pre-deploy   # checks env, placeholders, service health
```

**Doctor / diagnostics:**
```bash
make doctor            # All services
make pds-doctor        # PDS health + DID resolution
make bsky-doctor       # AppView + dataplane
make postgres-doctor   # Postgres connections, disk, slow queries
make redis-doctor      # Redis memory, hit rate, connections
make index-doctor      # Verify production indexes exist
```

### CI/CD

- **WhatZatppa:** GitHub Actions in `.github/workflows/` build Docker images for `pds`, `bsky`, `bsync`, `ozone` and push to AWS ECR + GHCR.
- **PARA:** GitHub Actions build `bskyweb`, `embedr`, `link`, `ogcard` containers; EAS builds for iOS/Android; bundle deploy via EAS Update.

---

## 9. Security Considerations

> See `PRODUCTION_READINESS.md` for the full audit checklist.

### Critical Items
1. **Secrets must never be committed.** `.env` and `.env.shared-demo` are gitignored. Generate secrets with `scripts/generate-secrets.sh`.
2. **PDS admin password & JWT secrets** must be high-entropy and rotated regularly. `dev-env` uses hardcoded weak secrets — these are **not** for production.
3. **Postgres and Redis** are intentionally **not exposed** in `docker-compose.prod.yaml`. Only the Caddy container accepts public traffic.
4. **SSRF protection** is enabled in production (`PDS_DISABLE_SSRF_PROTECTION=0`).
5. **Blob storage** uses Cloudflare R2 with path-style URLs and dedicated access keys.
6. **Rate limiting** is enabled in production (`PDS_RATE_LIMITS_ENABLED=true`) with a bypass key for internal services.
7. **PLC state** in dev is a single JSON file. Production should use Postgres-backed PLC or S3 with versioning + snapshots.
8. **PDS actor stores** in dev are SQLite-per-DID. Production PDS should use Postgres actor stores or a sharded SQLite pool.

### Environment Variables
- `WhatZatppa/.env.example` documents every required variable.
- `WhatZatppa/.env.shared-demo.example` is for local dev-env configuration.
- The deploy script blocks if `PDS_HOSTNAME=localhost` or placeholder strings (`<set-your-own>`, `changeme`, `YOUR_API_KEY`) are detected.

---

## 10. Domain-Specific Features

### Cabildeo (Policy Advocacy / Voting)
- AT Protocol record type: `com.para.civic.cabildeo`
- Users create policy proposals; others vote `for`, `against`, or `amendment`.
- Vote delegation (liquid democracy) is supported via `com.para.civic.delegation`.
- Tallies are aggregated in the AppView and exposed via `com.para.civic.getPolicyTally`.

### Political Compass
- 9 positions in a 3×3 grid: `auth-left`, `auth-center`, `auth-right`, `center-left`, `center`, `center-right`, `lib-left`, `lib-center`, `lib-right`.
- **Canonical color source:** `PARA/src/lib/compass/compassColors.ts`. Never hardcode compass colors elsewhere.
- Used for profile alignment, community estandartes, post highlights, and RAQ quiz scoring.

### Civic Tree
- Map showing communities, collections, and local initiatives.
- Geo data is tied to posts and community records.

### Public-Figure Verification
- `com.para.identity` record stores PARA-specific approval state (`isVerifiedPublicFigure`).
- `app.bsky.graph.verification` is the AppView-visible record used by the existing client pipeline.
- Current process is manual approval; future phase targets INE credential verification with ZK proofs.

---

## 11. AT Protocol & Lexicons

- **Base protocol:** Bluesky's AT Protocol (`app.bsky.*`, `com.atproto.*`).
- **PARA extensions:** `com.para.*` namespace:
  - `com.para.civic.*` — cabildeo, votes, delegations, positions, live presence
  - `com.para.collection.*` — create, update, list, get collections
  - `com.para.community.*` — community definitions and governance
  - `com.para.highlight.*` — post annotations
  - `com.para.feed.*` — custom timelines
  - `com.para.notification.*` — post subscriptions
  - `com.para.social.*` — post metadata
  - `com.para.agent.*` — agent messaging
  - `com.para.actor.*` / `com.para.status.*` — actor & status records
- **Code generation:** Changing a `.json` lexicon requires running `make codegen` to update TypeScript types in both backend and frontend.

---

## 12. Additional Notes for Agents

- **PARA/AGENTS.md exists.** It contains frontend-specific deep-dives (compass color rules, iOS App Clip removal, React Query persistence quirks, local PDS IP config). Consult it when working inside `PARA/src/`.
- **Node version matters:** Backend requires Node.js >= 24.15.0. Frontend requires >= 24.15.0 as well. Use `nvm` and `.nvmrc` if present.
- **Java for Android:** Zulu JDK 17 is required. Set `JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home` on macOS.
- **Physical device iOS dev:** `src/lib/constants.ts` hardcodes a local IP (`192.168.100.31:2583`). Update it if your machine's IP changes.
- **Dev-env seed:** `make run-dev-env` automatically runs the PARA seed that creates 5 users (alice, bob, carla, dan, eva — password `hunter2`), 3 communities, 4 cabildeos, 6 posts, and 2 delegations.
- **Persistent dev env:** Use `make run-dev-env-persistent` to preserve Postgres/Redis data and PDS blobs across restarts. Data lives in `~/.paramx-demo/` by default.
- **OTA updates:** Disabled in `app.config.js` (`UPDATES_ENABLED = false`). Self-hosted OTA server is a post-launch priority.
- **Sentry:** Configured but disabled until a PARA-specific Sentry org is set up.

---

_Last updated: 2026-05-10_
