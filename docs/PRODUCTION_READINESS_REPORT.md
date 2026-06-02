# Production Readiness Report

Last updated: 2026-06-02

This report captures the remaining work before opening PARA to production traffic. It is based on the current repository state, the deployment scripts, and the existing operations notes.

## Summary

The immediate deployment blocker was a backend directory mismatch: operational scripts expected `WhatZatppa/`, while the checkout uses `WatZappa/`. The production, local, predeploy, R2, blob migration, alpha doctor, and admin bootstrap scripts now default to `WatZappa` through `BACKEND_DIR`.

Runbooks and long-form docs still contain some old `WhatZatppa` references. Those are documentation cleanup items, but the executable deployment path is now fixed.

## Current Check Result

`./scripts/pre-deploy-check.sh` was run after the path fix. It now finds `WatZappa/.env`, `WatZappa/docker-compose.prod.yaml`, and `WatZappa/services/caddy/Caddyfile.prod`, and Docker Compose syntax validates.

Current blocker:

- `ADMIN_DIDS` is empty, so Ozone moderation does not yet have an admin DID.

Current warnings:

- `OZONE_ADMIN_DIDS` is empty until admin bootstrap runs.
- GrowthBook is not configured, so feature gates use defaults.
- Matrix configuration is incomplete; skip Matrix or complete the missing variable.
- Local Caddy validation was skipped because `caddy` is not installed locally.
- PDS/AppView Docker images are not built in the local cache.
- Local Postgres/Redis containers are not running, so DB connectivity checks were skipped.

## Go / No-Go

Production is a no-go until all critical items below are resolved or explicitly accepted as launch risk.

## Critical Items

| Priority | Item | Risk | How to solve | Verification |
| --- | --- | --- | --- | --- |
| P0 | Production secrets | Weak, placeholder, or reused secrets can compromise accounts, repo signing, sessions, and admin access. | Regenerate all production secrets with `./scripts/generate-secrets.sh`, fill R2 values, set `ADMIN_DIDS` and `OZONE_ADMIN_DIDS`, and store final values in a password manager or vault. | `./scripts/pre-deploy-check.sh` reports no env errors. |
| P0 | Backend env path consistency | Scripts fail before deploy or operate on the wrong env file. | Use the patched scripts with default `BACKEND_DIR=WatZappa`. If the backend ever moves, run scripts with `BACKEND_DIR=/path/to/backend`. | `./scripts/pre-deploy-check.sh` finds `WatZappa/.env`, compose, and Caddyfile. |
| P0 | PLC storage | A single JSON PLC state file is fragile for production identity state. | Move PLC persistence to Postgres or an object-store-backed/snapshotted path with strict backups before public traffic. | Restart the stack and verify DID creation/resolution survives restart and backup restore. |
| P0 | PDS actor storage | SQLite-per-DID can become an operational bottleneck and complicates backup/restore at scale. | For public launch, prefer Postgres actor stores. For a small alpha, document the user cap and use frequent snapshots plus restore tests. | Create accounts, restart services, run smoke tests, and restore a snapshot in staging. |
| P0 | Rate limits | Disabled or dev-mode limits invite abuse and resource exhaustion. | Enable production Redis-backed rate limits and confirm bypass keys are only used internally. | Attempt repeated account/login/post operations and confirm throttling behavior. |
| P0 | Backup and restore | Backups without restore testing are not protection. | Install cron/systemd timer for `./scripts/backup-postgres.sh /backups/para`, configure retention, and run a full restore rehearsal on staging. | Restore succeeds and smoke tests pass against restored DB. |

## High Priority

| Priority | Item | Risk | How to solve | Verification |
| --- | --- | --- | --- | --- |
| P1 | R2 blobstore | Media uploads fail or store locally by mistake. | Run `./scripts/setup-r2.sh`; confirm bucket, endpoint, and access keys. If migrating existing local blobs, run `./scripts/migrate-blobs-to-r2.sh`. | `./scripts/smoke-test-production.sh` uploads a blob successfully. |
| P1 | Admin bootstrap | Ozone moderation is unusable without admin DIDs. | Start the backend, then run `./scripts/create-admin-and-update-env.sh admin.your-domain admin@your-domain "strong-password"`. Restart the stack. | `ADMIN_DIDS` and `OZONE_ADMIN_DIDS` are populated; admin can log in. |
| P1 | Health and readiness endpoints | Deploy may look successful while dependencies are unhealthy. | Use the deploy script health checks and public smoke tests. Add alerts on `_health`, `_ready`, and container restarts. | PDS/AppView health and ready checks return 200 from public URLs. |
| P1 | Observability | Failures will be discovered by users instead of operators. | Configure Sentry for frontend, log retention for backend, and basic host metrics for disk, memory, CPU, Postgres, Redis, and Docker restarts. | A test error appears in Sentry/logs; alerts fire to the chosen channel. |
| P1 | Staging rehearsal | Production deploy path remains unproven. | Deploy to a staging host or isolated domain with production-like env values. Run predeploy and smoke tests there first. | Staging completes deploy, admin bootstrap, account creation, post creation, feed read, and blob upload. |

## Medium Priority

| Priority | Item | Risk | How to solve | Verification |
| --- | --- | --- | --- | --- |
| P2 | Documentation naming drift | Humans copy old `WhatZatppa` commands and fail. | Update AGENTS.md and docs to use `WatZappa` consistently. | `rg -n "WhatZatppa" docs AGENTS.md scripts` has only intentional historical references. |
| P2 | App route error boundaries | A client crash can blank route-level experiences. | Add route-level error boundaries for primary screens before broad launch. | Force a test render error and confirm graceful fallback. |
| P2 | Hot query indexes | Under load, feeds/search/tallies may degrade. | Identify top queries with Postgres logs and run `EXPLAIN ANALYZE`; add targeted indexes only where plans justify them. | Query plans use indexes and latency improves under staging load. |
| P2 | Mobile production config | App can point at dev services or stale local IPs. | Confirm `EXPO_PUBLIC_DEFAULT_SERVICE`, constants, app config, and build profiles point to production URLs. | Production TestFlight/internal build logs in and posts against production/staging PDS. |
| P2 | Rollback runbook | Recovery is improvised during outage. | Document exact rollback commands, DNS fallback, DB restore path, and app release rollback path. | Run a staging rollback drill. |

## Recommended Command Sequence

From the repository root:

```bash
./scripts/pre-deploy-check.sh
./scripts/setup-r2.sh

cd WatZappa
make build
make test

cd ../PARA
pnpm typecheck
pnpm test

cd ..
./scripts/deploy-production.sh user@server
./scripts/create-admin-and-update-env.sh admin.your-domain admin@your-domain "strong-password"
./scripts/smoke-test-production.sh https://pds.your-domain https://appview.your-domain
```

## Alpha Launch Acceptance

If the team wants a small private alpha before solving every architecture item, make that explicit:

- Limit users with invites.
- Keep frequent Postgres and host-volume snapshots.
- Monitor logs during the first 24 hours.
- Do not enable open signups until rate limits, backups, admin moderation, R2, and smoke tests are all green.
- Treat PLC JSON storage and SQLite actor stores as time-boxed alpha risks, not the final production design.
