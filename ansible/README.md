# PARA Ansible — Horizontal Scaling Infrastructure

> Infrastructure-as-Code for deploying the PARA backend (WhatZatppa) across multiple nodes with Docker Swarm, Traefik, and rolling updates.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   Traefik (443)   │  ← SSL termination, rate limit
                    │  [all managers]   │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────┴────┐           ┌────┴────┐           ┌────┴────┐
   │   PDS   │           │ AppView │           │  Ozone  │
   │(stateful│           │(×N reps)│           │(stateful│
   │  SQLite)│           │         │           │         │
   └────┬────┘           └────┬────┘           └────┬────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │  Postgres + Redis │  ← data layer (manager nodes)
                    │   (internal net)  │
                    └───────────────────┘
```

**Why Docker Swarm instead of Kubernetes?**
- Your team already knows `docker-compose`
- Swarm uses the same YAML format with `deploy:` blocks
- Built into Docker — no extra control plane to babysit
- Rolling updates and rollback out of the box
- Easier to reason about for a civic-tech team without a dedicated SRE

**When to move to K8s:** When you need pod autoscaling, complex CRDs, or multi-cloud federation (probably Year 2).

---

## Prerequisites

1. **Ansible 2.14+** on your control machine (laptop or CI runner)
2. **SSH key access** to all target servers
3. **Ubuntu 22.04/24.04** on all nodes (adaptable to Debian)
4. **Generated secrets**: Run `../scripts/generate-secrets.sh > ../WhatZatppa/.env`
5. **Filled .env**: Replace all `<blank>` values in `WhatZatppa/.env`

---

## Quick Start

### 1. Configure Inventory

Edit `inventory/production.yml`:

```yaml
swarm_managers:
  hosts:
    para-manager-01:
      ansible_host: YOUR_MANAGER_IP
      ansible_user: root

swarm_workers:
  hosts:
    para-worker-01:
      ansible_host: YOUR_WORKER_1_IP
      ansible_user: root
    para-worker-02:
      ansible_host: YOUR_WORKER_2_IP
      ansible_user: root
```

### 2. Run the Playbook

```bash
cd /Users/mlv/Desktop/MASTER/mvp/ansible
ansible-playbook -i inventory/production.yml playbooks/site.yml
```

This will:
1. Harden all nodes (UFW, fail2ban, sysctl)
2. Install Docker
3. Initialize Swarm on the manager and join workers
4. Deploy Traefik with Let's Encrypt SSL
5. Deploy the PARA stack
6. Verify health checks

### 3. Verify Deployment

```bash
ssh root@YOUR_MANAGER_IP

# Check Swarm nodes
docker node ls

# Check services
docker service ls

# Check logs
docker service logs -f para_pds
docker service logs -f para_appview

# Scale AppView horizontally
docker service scale para_appview=4
```

### 4. DNS

Point your domains to the manager node IPs:
```
pds.yourdomain.com     A → MANAGER_IP
appview.yourdomain.com A → MANAGER_IP
ozone.yourdomain.com   A → MANAGER_IP
```

Traefik handles SSL automatically via Let's Encrypt.

---

## Horizontal Scaling

### Scale AppView (stateless, safe to replicate)

```bash
# Via Ansible vars (persistent)
# Edit group_vars/all/vars.yml → appview_replicas: 4
ansible-playbook -i inventory/production.yml playbooks/site.yml --tags deploy

# Via Docker CLI (immediate, not persistent)
docker service scale para_appview=4
```

### Scale Workers

Add a new worker to `inventory/production.yml`, then run:

```bash
ansible-playbook -i inventory/production.yml playbooks/site.yml --limit swarm_workers
```

The new node automatically joins the Swarm and can host AppView replicas.

---

## Rolling Updates

When you push new code:

```bash
# 1. Build new images
ansible-playbook -i inventory/production.yml playbooks/site.yml --tags build

# 2. Deploy with zero-downtime rolling update
ansible-playbook -i inventory/production.yml playbooks/site.yml --tags deploy
```

Swarm updates one replica at a time (`parallelism: 1`) and rolls back automatically if health checks fail.

---

## Security

| Layer | Protection |
|-------|-----------|
| Network | UFW — only 22, 443, 2377, 4789, 7946 |
| SSH | fail2ban — 3 strikes = 1h ban |
| Edge | Traefik — rate limit 100 req/s, auto SSL |
| Internal | Overlay network — containers only, no host exposure |
| Secrets | Ansible Vault ready (see below) |

### Using Ansible Vault for Secrets

Instead of a plain `.env` file:

```bash
# Create vault
ansible-vault create group_vars/all/vault.yml

# Encrypt existing .env content
ansible-vault encrypt_string --stdin-name pds_admin_password < <(cat WhatZatppa/.env | grep PDS_ADMIN_PASSWORD)
```

Then run with:
```bash
ansible-playbook -i inventory/production.yml playbooks/site.yml --ask-vault-pass
```

---

## Monitoring

The playbook deploys:
- **Node Exporter** (global) — CPU, memory, disk, network per node
- **cAdvisor** (global) — Container metrics per node

Point Prometheus at `:9100` (node-exporter) and `:8080` (cAdvisor) on any node.

For a full Grafana stack, add the `prometheus` + `grafana` roles (template provided, uncomment in `site.yml`).

---

## Rollback

If a deployment goes bad:

```bash
ssh root@MANAGER_IP
docker service update --rollback para_appview
docker service update --rollback para_pds
```

Or destroy everything and redeploy:
```bash
docker stack rm para
ansible-playbook -i inventory/production.yml playbooks/site.yml
```

---

## Cost Estimate (3-node setup)

| Component | Spec | Monthly |
|-----------|------|---------|
| Manager (1×) | 4 vCPU / 8 GB | ~$40 |
| Worker (2×) | 4 vCPU / 8 GB | ~$80 |
| Managed Postgres | db.t3.medium | ~$50 |
| S3 Blob Storage | 100 GB | ~$5 |
| **Total** | | **~$175/mo** |

Swap managed Postgres for self-hosted on the manager to save $50/mo (risk: single point of failure).

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Connection refused` on 443 | Traefik didn't start — check `docker service logs traefik` |
| PDS health fails | Postgres not ready — `docker service logs para_postgres` |
| AppView 500s | Dataplane not reachable — verify overlay network |
| SSL not working | DNS not propagated — `dig pds.yourdomain.com` |
| Swarm join fails | Firewall blocking 2377/4789/7946 — check UFW rules |

---

## Roadmap

| Feature | Priority | Effort |
|---------|----------|--------|
| Ansible Vault for all secrets | P1 | ½ day |
| Prometheus + Grafana roles | P2 | 1 day |
| Backup automation (Postgres + PDS blobs) | P2 | ½ day |
| Multi-region Swarm (manager in 2 DCs) | P3 | 2 days |
| Migrate to Kubernetes (EKS/GKE) | P3 | 1 week |
