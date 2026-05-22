# Operations

> Deployment, provisioning, cost analysis, production readiness, and launch runbooks.

---

## Provisioning a Production Server

### Hetzner Cloud (Recommended)

1. Go to [console.hetzner.cloud](https://console.hetzner.cloud)
2. Create project → Add Server:
   - **Name**: `para-prod-01`
   - **Image**: Ubuntu 22.04 LTS
   - **Type**: CX32 (4 vCPU, 16 GB RAM, ~€13.50/mo)
   - **Location**: Falkenstein (fsn1) or Nuremberg (nbg1)
   - **SSH Key**: Add your public key
3. Copy the IPv4 address for DNS setup

> Budget tip: Start with CPX21 (2 vCPU, 4 GB RAM, ~€6/mo) for testing, upgrade before real users.

### Initial Server Setup

SSH in and run:
```bash
curl -fsSL https://get.docker.com | sh && \
  usermod -aG docker $USER && \
  apt-get update && \
  apt-get install -y git rsync make && \
  reboot
```

After reboot, verify:
```bash
docker --version          # Docker 24.x+
docker compose version    # v2.x+
```

### DNS (Cloudflare)

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `pds` | `YOUR_SERVER_IP` | DNS only |
| A | `appview` | `YOUR_SERVER_IP` | DNS only |
| A | `@` | `YOUR_SERVER_IP` | DNS only |

Leave proxy OFF (grey cloud). Caddy handles SSL.

Verify propagation:
```bash
dig pds.para.social +short
dig appview.para.social +short
```

---

## Deployment

### Generate Secrets

```bash
cd WhatZatppa
scripts/generate-secrets.sh
```

### Pre-Deploy Checks

```bash
cd WhatZatppa
scripts/pre-deploy.sh
```

### Deploy

```bash
./scripts/deploy-production.sh root@YOUR_SERVER_IP
```

This builds, uploads, starts the stack, and runs health checks.

### Verify Health

```bash
curl -f https://pds.para.social/xrpc/_health
curl -f https://appview.para.social/xrpc/_health
curl -f https://pds.para.social/xrpc/_ready
curl -f https://appview.para.social/xrpc/_ready
```

---

## Production Readiness

### Critical — Fix Before Any Production Traffic

| Issue | Current State | Fix |
|-------|--------------|-----|
| Dev-mode secrets | `ADMIN_PASSWORD = 'admin-pass'`, `JWT_SECRET` hardcoded | Inject from vault; fail startup if missing |
| PLC is a single JSON file | `~/.paramx-demo/plc/plc.json` | Move to Postgres-backed PLC |
| PDS actor stores are SQLite-per-DID | One SQLite file per user | Use Postgres for actor stores or sharded SQLite pool |
| Rate limits disabled in dev | `devMode = true` disables rate limits | Enable Redis-backed rate limits in production |

### Already Fixed

| Issue | Fix |
|-------|-----|
| No real blobstore | Cloudflare R2 bucket `para-production` wired into docker-compose.prod.yaml |
| Missing production indexes | Migration `20260509T164947000Z-add-missing-production-indexes.ts` added |
| Port conflict with native Postgres | Docker DB moved to port 5434 |
| `better-sqlite3` Node version mismatch | nvm default set to 24, rebuilt |

### Recommended Next 3 Actions

1. **Rotate all secrets**, disable `devMode`, switch PLC + blobstore to production backends (1 day)
2. **Add DB indexes** for the 5 hottest queries, verify with `EXPLAIN ANALYZE` (½ day)
3. **Add Error Boundaries** to every route, add `/health` to every service (½ day)

---

## Cost Analysis

### Monthly Recurring (Self-Hosted on Owned Hardware)

| Item | Spec | Cost (USD/mo) |
|------|------|---------------|
| VPS Proxy | 2 vCPU, 4GB RAM, unmetered | $5–$7 (Hetzner CX21) |
| Domain | `para.social` | ~$1/mo amortized |
| SSL | Let's Encrypt | $0 |
| Internet | Static IP upgrade | $0–$50 |
| Electricity | 5950X at ~200W, 24/7 | ~$22–$43 |
| **Total Monthly** | | **~$32–$55** |

### One-Time Costs (CapEx)

| Item | Cost |
|------|------|
| SSD Storage (2TB NVMe) | $80–$150 |
| UPS Battery Backup | $80–$150 |
| External Backup Drive (4TB) | $60–$100 |
| **Total CapEx** | **~$240–$440** |

### App Store Costs

| Item | Cost |
|------|------|
| Apple Developer Program | $99/yr |
| Google Play Console | $25 one-time |
| EAS Build | $0 (within free tier) |
| **Total App** | **~$10–$13/mo** amortized |

---

## Launch Day Checklist

### GO / NO-GO Criteria

Launch is GO when ALL are true:
- [ ] `pnpm test` passes — PARA
- [ ] `pnpm build` passes — WhatZatppa
- [ ] `npx tsc --noEmit` clean — PARA
- [ ] Docker images build and push successfully
- [ ] Production `.env` populated (no `<blank>` values)
- [ ] PostgreSQL + Redis reachable from backend containers
- [ ] PDS healthcheck returns 200 on `/_health`
- [ ] AppView healthcheck returns 200 on `/_health`
- [ ] Admin can log in via mobile app to production PDS
- [ ] Test post creates successfully end-to-end

### Launch Sequence

1. **Deploy Backend** (5 min): `docker compose -f docker-compose.prod.yaml up -d`
2. **Verify Health** (2 min): `curl` the `_health` and `_ready` endpoints
3. **Seed First Accounts** (3 min): `pnpm seed:civic:apply --pds-url https://pds.para.social --admin-pass <password>`
4. **Build Mobile App** (15 min): `eas build --platform ios --profile production`
5. **Smoke Test** (10 min): Create account, post with Policy flair, verify voting arrows, PartyShield, community join/leave

### Rollback Plan

1. Backend issues: `docker compose -f docker-compose.prod.yaml down`
2. App issues: Do NOT submit to App Store. Use TestFlight / internal testing first.
3. DNS issues: Flip DNS back to maintenance page.
4. Database corruption: Restore from `postgres_data` volume snapshot.

### Post-Launch Monitoring (T+1h → T+24h)

- Monitor Sentry for crash reports
- Monitor PDS logs: `docker logs -f para-pds`
- Monitor AppView logs: `docker logs -f para-bsky`
- Check Redis memory usage
- Check PostgreSQL disk usage
- First user sign-up within 1 hour?
- No 5xx errors in logs?

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `docker command not found` | Log out and SSH back in (group refresh) |
| `Permission denied` | Check SSH key is added to Hetzner |
| DNS not resolving | Wait 5 min, check Cloudflare propagation |
| Caddy HTTPS fails | Ensure port 443 is open (`ufw allow 443`) |
| Health checks fail | `ssh root@IP "cd /opt/para && docker compose logs -f"` |
