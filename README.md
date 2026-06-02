# PARA

PARA is a civic-social platform for early adopters who want social networking to do more than distribute attention. It combines an AT Protocol social stack, a React Native client, and identity infrastructure for democratic participation: communities, cabildeos, civic maps, collections, public-interest profiles, and liquid-delegation workflows.

This repository is the demo workspace for the `mexico-parasocial` project. It is meant to help contributors, testers, organizers, and infrastructure partners understand what PARA is, where each subsystem lives, and how to start exploring the platform safely.

## Why PARA Exists

Most social platforms optimize for speed, engagement, and private ownership of public conversation. PARA is built around a different premise: civic life needs trustworthy identity, open protocol infrastructure, public-interest deliberation, and interfaces that make collective decisions easier to understand.

PARA is not only a client. It is a full ecosystem:

- A forked AT Protocol backend for accounts, repos, indexing, moderation, lexicons, and civic APIs.
- A mobile and web app for communities, posts, cabildeos, maps, highlights, feeds, and political-compass context.
- Identity-manager services for selective disclosure, proof workflows, and future vote/personhood guarantees.
- Deployment scripts and runbooks for moving from local demo to production infrastructure.

## Repository Map

| Directory | What It Contains | Primary Tech |
|-----------|------------------|--------------|
| `WatZappa/` | Backend monorepo: PDS, AppView, Ozone, PLC, lexicons, data-plane services, dev environment | Node.js / TypeScript / pnpm |
| `PARA/` | Mobile and web client for iOS, Android, and browser | React Native / Expo / TypeScript |
| `iM8/` | Frontend for identity-manager and credential-wallet experiences | React Native / Expo / TypeScript |
| `mubEZ/` | Backend for identity management, ZKP-oriented identity flows, metadata disclosure, and profile-linked trust | TypeScript |
| `scripts/` | Deployment, provisioning, environment, and push helpers | Bash |
| `docs/` | Architecture notes, operations runbooks, provisioning docs, and research | Markdown |
| `plurality/` | Research notes on digital democracy and liquid-democracy models | Markdown |

> Naming note: the backend repository is **WatZappa**. Use this spelling in docs, scripts, deployments, and GitHub references.

## What Early Adopters Can Test

Early adopters should expect a working but fast-moving civic-social demo. The platform is especially useful for testing:

- **Cabildeo**: structured policy proposals, positions, votes, amendments, and delegation experiments.
- **Civic Tree**: map-like civic spaces for communities, collections, initiatives, evidence, links, and notes.
- **Communities**: group spaces with governance rules, estandartes, membership surfaces, and public context.
- **Political Compass**: a 9-position ideological grid used for profile alignment, post highlights, filters, and dashboards.
- **Highlights**: inline annotations tied to political-compass context and civic interpretation.
- **Identity Flows**: proof-oriented identity experiments for public figures, selective metadata, and future personhood guarantees.
- **AT Protocol Interop**: PDS/AppView behavior, repo records, lexicons, handles, DIDs, feeds, and Bluesky-derived compatibility.

This is not yet a consumer-polished product. It is a real stack for serious testing, civic design feedback, technical review, and early community pilots.

## Current Stability

| Area | Status |
|------|--------|
| Local backend dev environment | Active demo path |
| PARA web client | Active demo path |
| Native iOS/Android client | In progress, Expo-based |
| Civic lexicons and generated types | Active and changing |
| Identity/ZKP services | Experimental, security-sensitive |
| Production deployment scripts | Available, review before use |
| Public-figure verification | Manual process today, stronger verification planned |

Because governance and identity features can affect real people, treat demo data, verification status, and identity proofs carefully. Do not use production secrets in local demos. Do not publish private credentials, personal documents, private keys, or non-consensual identity data.

## Quick Start

### Prerequisites

- Node.js `>= 24.15.0`
- pnpm, using each repo's pinned `packageManager`
- Docker, for Postgres, Redis, and local service dependencies
- Go `>= 1.25`, for `PARA/bskyweb` and Indigo-derived services
- Zulu JDK 17, only for Android/native workflows

### Backend: `WatZappa/`

```bash
cd WatZappa
make deps
make codegen
make build
cp -n .env.shared-demo.example .env.shared-demo
make run-dev-env-persistent
```

The persistent dev environment stores local demo data under `~/.paramx-demo/` by default.

Useful backend commands:

```bash
make test
make lint
make fmt
make doctor
make pds-doctor
make bsky-doctor
```

### Client: `PARA/`

```bash
cd PARA
pnpm install
pnpm web
```

Native targets:

```bash
pnpm ios
pnpm android
```

Seed civic demo data after the backend is running:

```bash
cd PARA
pnpm seed:civic:apply --introspect-url http://127.0.0.1:2581
```

### Identity Frontend: `iM8/`

```bash
cd iM8
pnpm install
pnpm start
```

### Identity Backend: `mubEZ/`

```bash
cd mubEZ
pnpm install
pnpm dev
```

## Full Local Demo Flow

Use separate terminal windows:

1. Start the backend:
   ```bash
   cd WatZappa
   make run-dev-env-persistent
   ```

2. Start PARA web:
   ```bash
   cd PARA
   pnpm web
   ```

3. Optional: start `bskyweb`:
   ```bash
   cd PARA/bskyweb
   go run ./cmd/bskyweb serve --appview-host http://127.0.0.1:2584 --http-address :8100
   ```

4. Optional: seed civic data:
   ```bash
   cd PARA
   pnpm seed:civic:apply --introspect-url http://127.0.0.1:2581
   ```

## Development Rules

- Use **pnpm** for JavaScript/TypeScript packages unless a subproject explicitly documents otherwise.
- Do not commit secrets, `.env` files, private keys, identity documents, or production credentials.
- If you change lexicons under `WatZappa/lexicons/`, run backend codegen before committing:
  ```bash
  cd WatZappa
  make codegen
  make build
  ```
- Keep political-compass colors centralized in `PARA/src/lib/compass/compassColors.ts`.
- Use `#/` imports for PARA source files where existing code does so.
- Treat identity and verification code as security-sensitive. Prefer small, reviewable changes.

## Push Helpers

This demo workspace includes a helper for pushing the demo root and the child repositories:

```bash
./scripts/push-demo-repos.sh
```

Individual push commands:

```bash
git -C /Users/mlv/Desktop/TH1 push
git -C /Users/mlv/Desktop/TH1/WatZappa push origin main
git -C /Users/mlv/Desktop/TH1/PARA push origin main
git -C /Users/mlv/Desktop/TH1/mubEZ push origin main
git -C /Users/mlv/Desktop/TH1/iM8 push origin main:demo-sync
```

`iM8` currently uses `demo-sync` for non-destructive pushes because its remote `main` has separate history.

## Documentation

| File | Purpose |
|------|---------|
| `AGENTS.md` | Orientation for AI coding agents and maintainers |
| `docs/ARCHITECTURE.md` | System architecture and boundaries |
| `docs/GETTING_STARTED.md` | Local setup guide |
| `docs/OPERATIONS.md` | Operational checks and deployment notes |
| `docs/PROVISION_VPS.md` | VPS provisioning guide |
| `docs/CONTRIBUTING.md` | Contribution workflow |
| `WatZappa/PARA_BACKEND_DEVOPS.md` | Backend-specific operational notes |
| `WatZappa/TESTING.md` | Backend testing strategy |

## Early-Adopter Feedback

When testing, the most useful feedback is specific:

- Which civic workflow were you trying to complete?
- Which community, cabildeo, map, identity, or voting surface was confusing?
- Did the interface make the source of a claim, vote, identity, or delegation clear?
- Did any screen imply legal, verification, or public-office authority it should not imply?
- What would make the platform feel trustworthy enough for a real civic pilot?

PARA is being built in public with a bias toward civic usefulness, protocol compatibility, and careful identity design. Early feedback should help make those commitments sharper.
