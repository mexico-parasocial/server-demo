# Architecture

> System overview, service descriptions, data flow, and technology stack.

---

## The Big Picture

```
User opens PARA app
    │
    ▼
HTTPS request
    │
    ▼
DNS → Caddy reverse proxy
    │
    ▼
PDS (auth, repos, blobs)  ←──→  AppView (feeds, search, aggregation)
    │                              │
    ▼                              ▼
SQLite (per-user repos)       PostgreSQL (indexed data)
    │                              │
    ▼                              ▼
Cloudflare R2 (blob storage)  Redis (caching, queues)
```

---

## Services

### PLC (Port 2582) — "The Phone Book"

Hands out unique DIDs and remembers which PDS hosts each user's data. Very light resource usage. Run 1–2 instances; they don't scale with user count.

### PDS (Port 2583) — "Mailbox + Filing Cabinet"

Personal Data Server. Every user has their own isolated repo storing posts, likes, follows, votes, collections, and blobs (images/videos). Write-heavy. Disk grows with user count and blob storage.

**When the app talks to PDS:** login/signup, create post, vote, save collection, upload profile picture.

### AppView (Port 2584) — "Search Engine + Feed Generator"

Reads all PDS repos, indexes everything, and answers questions like "What's on Alice's home feed?" or "Who liked this post?" Read-heavy, CPU-intensive for aggregation queries.

### Ozone (Port 2585) — "Moderation Desk"

Labels, takedowns, reports, moderation queues. Trusted moderators use this to manage content quality.

### Bsync (Port 2586) — "Sync Broker"

Handles repo synchronization between PDS and AppView. Ensures indexed data stays in sync with user repos.

### Chat Service (External)

The PDS/AppView proxy `chat.bsky.*` requests to an external chat service resolved from the user's DID document. The only chat service in this repo is a dev-env mock (`packages/dev-env/src/chat.ts`). For production civic communities, see the Matrix recommendation in `docs/RESEARCH.md`.

---

## Repo Structure

```
PARA/                    # React Native / Expo client
  src/
    screens/             # Route-level screens
    components/          # Reusable UI
    state/               # React Query hooks, persisted state
    lib/                 # Utilities, API clients, domain logic
      api/               # PARA lexicon TypeScript types
      compass/           # Political compass colors (canonical source)
    view/                # Presentation components
    alf/                 # Atomic design system
    locale/              # i18n (Lingui v5)
  bskyweb/               # Go web server — browser-facing demo
  indigo-main/           # Go AT Protocol library fork
  bskyembed/             # Embeddable post widget
  bskylink/              # Link-card resolver
  bskyogcard/            # OpenGraph card generator

WhatZatppa/              # AT Protocol backend monorepo
  packages/              # ~20 workspace packages
    pds/                 # Personal Data Server
    bsky/                # AppView (feed indexing, search)
    ozone/               # Moderation desk
    api/                 # Client library (XRPC + lexicon types)
    dev-env/             # Local dev orchestrator + seed data
    dev-infra/           # Docker Compose, test DB/Redis helpers
    lexicon/             # Lexicon schema definitions
    lex-cli/             # Code-generation CLI for lexicons
    xrpc/                # XRPC client
    xrpc-server/         # XRPC server framework
    common/, crypto/, did/, identity/, repo/, sync/...
  lexicons/              # JSON schema definitions (AT Protocol + PARA extensions)
  services/              # Dockerfile contexts for deployable services

m8/                      # Identity broker
  atmosphere-console-poc/   # PoP Wallet (React Native Expo)
  identity-manager/         # Fastify service — proof broker, sessions, trust policies
  pds-moover-main/          # PDS migration tooling
```

---

## Technology Stack

### Backend (`WhatZatppa/`)

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js >= 24.15.0 |
| Package Manager | pnpm 8.15.9 |
| Language | TypeScript 5.8.3 |
| Monorepo | pnpm workspaces |
| Protocol | AT Protocol (XRPC over HTTPS, DIDs, PLC, repos, MST) |
| Databases | PostgreSQL 15 (production), SQLite (PDS actor stores in dev), Redis 7 (caching) |
| Blob Storage | Cloudflare R2 (S3-compatible) in production; local disk in dev |
| API Style | XRPC — typed RPC over HTTP with Lexicon schemas |

### Frontend (`PARA/`)

| Layer | Technology |
|-------|-----------|
| Framework | React Native 0.81.5 + Expo 54.0.33 |
| React | 19.1.0 |
| Package Manager | pnpm 11.1.1 |
| Language | TypeScript 6.0.2 |
| State | React Query (TanStack Query) v5 + persisted cache |
| Navigation | React Navigation v7 |
| Styling | Custom atomic design system (`alf`) |
| Localization | Lingui v5 |
| Maps | Google Maps (native) |
| Rich Text | Tiptap v2 |
| Build Targets | iOS, Android, Web |

### Go Services (`PARA/`)

| Service | Purpose |
|---------|---------|
| bskyweb | Echo-based web server rendering HTML for public profiles/feeds |
| indigo-main | Fork of Bluesky's Go AT Protocol library |

---

## Product Features

| Feature | Description |
|---------|-------------|
| **Cabildeo** | Structured policy proposals with for/against/amendment voting + liquid delegation |
| **Civic Tree** | Spatial tree of communities, collections, initiatives, evidence, links, notes |
| **Political Compass** | 9-position ideological grid for profile positioning and post highlights |
| **Communities** | Group spaces with governance rules and estandartes (banners) |
| **Collections** | Curated lists of posts or policies |
| **Highlights** | Inline color annotations on posts tied to compass positions |
| **Public-Figure Verification** | Manual verification workflow (`f/` prefix) backed by `com.para.identity` |

---

## Key Design Decisions

### Why both `com.para.identity` and `app.bsky.graph.verification`?

- `app.bsky.graph.verification` is what the current profile stack already understands
- `com.para.identity` is the PARA-specific policy layer for public-figure approval, proof references, and future verification metadata

### Why is Age Assurance bypassed?

The full age-assurance subsystem exists in `src/ageAssurance/` but is bypassed for MVP — all users get `Full` access. This avoids blocking demo users and keeps onboarding friction minimal. To re-enable, remove the bypass in `src/ageAssurance/state.ts` and ensure the PDS supports `app.bsky.ageassurance.*` endpoints.

### Why no Discover feed in dev?

`DEFAULT_DISCOVER_FEED_URI = null` in local-dev mode because the feed generator is not seeded. The home tab falls back to the Following timeline.

---

## Data Flow: Creating a Post

1. User taps "Post" in PARA client
2. Client calls `com.atproto.repo.createRecord` on PDS
3. PDS validates the record, writes to user's SQLite repo, stores blobs in R2
4. PDS emits a repo commit event to the firehose
5. AppView consumes the firehose, indexes the post into PostgreSQL
6. Other users' feeds now include the post via `app.bsky.feed.getTimeline`

---

## Chat Architecture: Matrix vs Bluesky

The PARA client has a production-grade frontend for Bluesky DMs and group chats. However, the WhatZatppa backend does **not** contain a production chat service — it only proxies `chat.bsky.*` requests to an external service. The group-chat lexicons are explicitly marked **unstable** and evolving rapidly upstream.

**Recommendation:** Use Bluesky chat for lightweight social DMs. For serious civic communities needing threaded discussion, encryption, or persistent archives, deploy a self-hosted Matrix homeserver. See `docs/RESEARCH.md` for the full analysis.
