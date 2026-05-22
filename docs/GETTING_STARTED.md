# Getting Started

> New to the project? Start here. This doc gets you from zero to a running dev environment in 15 minutes.

---

## What This Repo Is

PARA is a civic-social platform for digital democracy built on the AT Protocol (the same decentralized protocol that powers Bluesky). This monorepo contains the full stack:

| Directory | What it is | Tech |
|-----------|-----------|------|
| `PARA/` | Mobile & web client (iOS, Android, Web) | React Native / Expo / TypeScript |
| `WhatZatppa/` | Backend monorepo (PDS, AppView, Ozone, PLC) | Node.js / TypeScript / pnpm |
| `m8/` | Identity broker (PoP Wallet + Identity Manager) | React Native / Fastify / TypeScript |
| `scripts/` | Deployment & ops scripts | Bash |

---

## Prerequisites

| Tool | Version | Why |
|------|---------|-----|
| Node.js | >= 24.15.0 | Enforced via `.nvmrc` in subprojects |
| pnpm | >= 8.15.9 | Enforced via `packageManager` in `package.json` |
| Docker | any recent | Postgres 15 + Redis 7 for local dev |
| Java 17 (Zulu) | 17 | Android builds / full backend |
| Go | >= 1.25 | `bskyweb` and `indigo` services only |

Install pnpm:
```bash
npm install -g pnpm@8.15.9
```

Switch Node in any subproject:
```bash
nvm use   # reads .nvmrc
```

---

## Quick Start

### Backend (`WhatZatppa/`)

```bash
cd WhatZatppa

make deps           # pnpm install --frozen-lockfile
make codegen        # generate lexicon types from JSON schemas
make build          # compile all packages to dist/
make run-dev-env    # ephemeral DB/Redis (data lost on stop)
```

For persistent dev data:
```bash
cp -n .env.shared-demo.example .env.shared-demo
make run-dev-env-persistent   # Postgres/Redis in Docker volumes, PDS blobs in ~/.paramx-demo/
```

Auto-seeded demo data includes 5 users (`alice`, `bob`, `carla`, `dan`, `eva` — password: `hunter2`), 3 communities, 4 cabildeos with votes, 6 posts with highlights, and 2 vote delegations.

**Useful commands:**
```bash
make test           # full test suite
make lint           # style + lint + types
make fmt            # eslint --fix + prettier --write
make doctor         # health checks for all services
```

### Frontend (`PARA/`)

```bash
cd PARA
pnpm install
pnpm web        # web target
pnpm ios        # iOS simulator
pnpm android    # Android emulator
```

### m8 Identity Broker (`m8/`)

**PoP Wallet (React Native):**
```bash
cd m8/atmosphere-console-poc
pnpm install
pnpm start      # Expo dev server
```

**Identity Manager (Fastify backend):**
```bash
cd m8/identity-manager
pnpm install
pnpm dev        # tsx watch mode
pnpm build      # compile to dist/
pnpm test:integration
```

---

## Full Local Demo

To run the entire stack with ngrok tunnels:

1. **Ngrok tunnels** (separate terminals):
   ```bash
   ngrok http --url=https://pds.paramx.social.ngrok.pro 2583
   ngrok http --url=https://appview.paramx.social.ngrok.pro 2584
   ```

2. **Backend** (`WhatZatppa/`): `make run-dev-env-persistent`

3. **bskyweb** (browser demo):
   ```bash
   cd PARA/bskyweb
   go run ./cmd/bskyweb serve --appview-host https://appview.paramx.social.ngrok.pro --http-address :8100
   ```

4. **PARA client**: `cd PARA && pnpm web`

5. **Seed data**: `cd PARA && pnpm seed:civic:apply --introspect-url http://127.0.0.1:2581`

6. **Open** `http://localhost:8100`

> Order matters: ngrok before backend, backend healthy before seeding.

---

## Code Conventions

### Package Manager

**pnpm everywhere.** Each subproject pins its version via `packageManager`. Never use npm or yarn.

### Module Aliases

`#/` maps to `src/`:
```ts
import { useSession } from '#/state/session'
import { COMPASS_COLORS } from '#/lib/compass/compassColors'
```

### Design System (`Alf`)

Use `atoms` (aliased as `a`) and `useTheme` for all styling:
```tsx
import { atoms as a, useTheme } from '#/alf'
const t = useTheme()

<View style={[a.flex_1, a.px_lg, a.gap_sm, t.atoms.bg]} />
```
No ad-hoc `StyleSheet.create` unless absolutely necessary for animations.

### Political Compass Colors

All 9 position colors are defined in `PARA/src/lib/compass/compassColors.ts`. **Never hardcode** a compass hex anywhere else.

### Lexicons

AT Protocol schemas live in `WhatZatppa/lexicons/`. After modifying any lexicon:
```bash
cd WhatZatppa
make codegen
make build
```

### React Query

- Persisted queries: prefix query key with `PERSISTED_QUERY_ROOT`
- Paginated feeds: use `truncateAndInvalidate` for pull-to-refresh, not bare `refetch`

### Web Layout Standard

Center-column screens use `Layout.Center` + `ScrollView` with `padding: 16` and `paddingBottom: 100`. See `RepresentativesScreen` for the canonical pattern.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `better-sqlite3` build fail after Node switch | `nvm use 24.15.0 && cd node_modules/.pnpm/better-sqlite3@10.0.0/node_modules/better-sqlite3 && npx node-gyp rebuild` |
| iOS physical device can't connect to local PDS | Update `PARA/src/lib/constants.ts` `LOCAL_DEV_SERVICE` to your machine's current LAN IP |
| Android build fails on Apple Silicon | `arch -arm64 brew install llvm && sudo gem install ffi` |
| App Clip provisioning error | Personal (free) Apple accounts can't provision App Clips. The target is removed from the Xcode project for dev builds. |
| Port conflict with native Postgres | Docker DB uses port 5434 by default |

---

## Next Steps

- Read `AGENTS.md` for AI-agent orientation and deep architectural notes
- Read `docs/ARCHITECTURE.md` for system overview and service descriptions
- Read `docs/OPERATIONS.md` for deployment, provisioning, and production readiness
- Read `PARA/README.md` for client-specific conventions and product features
