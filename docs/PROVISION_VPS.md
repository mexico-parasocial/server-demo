# VPS Provisioning Guide — PARA Production

> **Goal**: Get a server running with Docker, ready for `deploy-production.sh`.

---

## Step 1 — Create Server (Hetzner Cloud)

1. Go to [console.hetzner.cloud](https://console.hetzner.cloud)
2. Create a new project (e.g. "PARA Production")
3. **Add Server**:
   - **Name**: `para-prod-01`
   - **Image**: Ubuntu 22.04 LTS
   - **Type**: Shared vCPU → **CX32** (4 vCPU, 16 GB RAM, ~€13.50/mo)
   - **Location**: Falkenstein (fsn1) or Nuremberg (nbg1)
   - **SSH Key**: Add your public key (`cat ~/.ssh/id_rsa.pub`)
   - **Firewalls**: Skip for now (we use `scripts/setup-firewall.sh` later)
   - **Backups**: Optional (€1.50/mo) — or use our `scripts/backup-postgres.sh`
4. Click **Create & Buy**
5. **Copy the IPv4 address** — you'll need it for DNS

> **Budget tip**: You can start with **CPX21** (2 vCPU, 4 GB RAM, ~€6/mo) for testing, but you'll need to upgrade before real users. The AppView alone can eat 2 GB.

---

## Step 2 — Initial Server Setup

SSH into your server:

```bash
ssh root@YOUR_SERVER_IP
```

Run this one-liner (copy-paste):

```bash
curl -fsSL https://get.docker.com | sh && \
  usermod -aG docker $USER && \
  apt-get update && \
  apt-get install -y git rsync make && \
  reboot
```

After reboot, reconnect:

```bash
ssh root@YOUR_SERVER_IP
```

Verify Docker:

```bash
docker --version   # Docker 24.x+
docker compose version  # v2.x+
```

---

## Step 3 — DNS Setup (Cloudflare)

In your Cloudflare dashboard for `para-g0v.app`:

| Type | Name | Content | Proxy status |
|---|---|---|---|
| A | `pds` | `YOUR_SERVER_IP` | DNS only |
| A | `appview` | `YOUR_SERVER_IP` | DNS only |
| A | `@` | `YOUR_SERVER_IP` | DNS only |

Leave proxy **OFF** (grey cloud) for now. Caddy will handle SSL.

Wait 1–5 minutes, then verify:

```bash
dig pds.para-g0v.app +short
dig appview.para-g0v.app +short
```

---

## Step 4 — Deploy

From your local machine (repo root):

```bash
# 1. Ensure .env is populated
WhatZatppa/scripts/generate-secrets.sh

# 2. Pre-deploy checks
WhatZatppa/scripts/pre-deploy.sh

# 3. Deploy!
./scripts/deploy-production.sh root@YOUR_SERVER_IP
```

That's it. The script builds, uploads, starts the stack, and runs health checks.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `docker command not found` | Log out and SSH back in (group membership refresh) |
| `Permission denied` | Check SSH key is added to Hetzner |
| DNS not resolving | Wait 5 min, check Cloudflare DNS propagation |
| Caddy HTTPS fails | Ensure port 443 is open (`ufw allow 443`) |
| Health checks fail | Check logs: `ssh root@IP "cd /opt/para && docker compose logs -f"` |
