# Research & Future Work

> Research documents, architecture decisions, and post-MVP plans. For the curious who want to read more.

---

## Liquid Democracy

### Overview

Liquid democracy combines direct voting with delegation. Users can vote directly on any issue, or delegate their voting power to a trusted representative. Delegations can be revoked or redirected at any time.

### Models Researched

| Model | Description | Status |
|-------|-------------|--------|
| **Proportional Liquid Democracy** | Delegation weights are proportional to trust network centrality | Researched, not implemented |
| **Quadratic Liquid Democracy** | Voting power scales with the square root of stake/delegation | Researched, not implemented |
| **Standard Liquid Delegation** | Simple 1:1 delegation with transitive chains | Implemented in cabildeo |

### Current Implementation

The cabildeo feature in PARA supports:
- For/against/amendment voting on policy proposals
- 1:1 vote delegation to other users
- Delegation revocation
- Position tracking (public stance on a policy)

### Future Research Directions

- Time-bounded delegations (auto-expire after N days)
- Domain-specific delegations (delegate only on "climate" or "education" topics)
- Delegation recommendation engine based on compass alignment

---

## Chat Architecture: Matrix vs Bluesky Permissioned Spaces

### Current State

The PARA client has a **production-grade frontend** for Bluesky DMs and group chats: full state-machine lifecycle, firehose polling, optimistic UI, reactions, rich-text composer, moderation integration, and group management.

The WhatZatppa backend, however, **does not contain a production chat service**. It only proxies `chat.bsky.*` requests to an external service resolved from the user's DID. The only "chat service" in the repo is `packages/dev-env/src/chat.ts` — an in-memory Express mock.

The group-chat lexicons (`chat.bsky.group.*`) are explicitly marked **unstable** and evolving rapidly upstream.

### Comparison

| Dimension | Bluesky Permissioned Spaces | Self-Hosted Matrix |
|-----------|---------------------------|-------------------|
| **Maturity** | Alpha/unstable; no open-source production server | Battle-tested (Synapse, Dendrite); 10+ years |
| **Encryption** | Not implemented; chat service holds plaintext | Native E2EE via Olm/Megolm |
| **Data Sovereignty** | Messages live on the chat service, not user's PDS | Messages live on your homeserver |
| **Operational Burden** | Would require building a production chat service | Well-documented, containerized deployments |
| **Identity** | Seamless — reuses atproto DIDs, handles, OAuth | Requires bridge or separate MXIDs |
| **Federation** | Designed for federation, but no production spec yet | Mature federation protocol |
| **Protocol Risk** | High — upstream can change lexicons at any time | Low — spec evolves through MSCs with long deprecation windows |

### Recommendation

1. **Keep Bluesky chat for lightweight social DMs.** The PARA client already implements this well.
2. **Do NOT rely on Bluesky group chats for civic communities yet.** Missing backend, unstable lexicons, no encryption, no robust moderation.
3. **Deploy self-hosted Matrix for community deliberation.** For "comunidades" and "cabildeos" that need threaded discussion, encrypted working groups, or persistent archives.
4. **Future convergence.** If Bluesky stabilizes group-chat lexicons and ships a reference service with encryption, migrate social groups back. Until then, Matrix alongside atproto is risk mitigation, not technical debt.

### Matrix ↔ PARA Integration Plan

When a user joins a PARA community, auto-invite them to the corresponding Matrix space. When they leave, remove them. Community owners become Matrix space admins.

**Architecture:**
```
PDS/BSKY firehose  →  para-matrix-bot (Node.js)  →  Synapse Admin API
                              │
                              ▼
                         SQLite (mappings)
```

**Why a bot instead of hooks inside PDS/BSKY?**
- Zero latency impact on user-facing APIs
- Can be restarted independently
- Bridge failures don't break community join/leave
- Follows the same pattern as existing Matrix appservices

**Estimated effort:** 3–4 days. See the full implementation plan in the git history (file: `docs/PLAN_MATRIX_INTEGRATION.md`, 2026-05-05).

---

## PDS Comparison: Tranquil vs rsky

### Research Context

Evaluated alternative PDS implementations for potential migration or feature inspiration.

| Aspect | Tranquil | rsky |
|--------|----------|------|
| Language | Rust | Rust |
| Maturity | Experimental | Experimental |
| Feature Set | Minimal PDS | Minimal PDS |
| Reason for rejection | Not mature enough for production | Not mature enough for production |

**Conclusion:** Stick with the Bluesky PDS fork in WhatZatppa. It has the most features, best documentation, and active upstream maintenance.

---

## SeaweedFS Integration

### Research Context

Evaluated SeaweedFS as a self-hosted blob storage alternative to Cloudflare R2.

**Findings:**
- SeaweedFS is a fast distributed object store and file system
- Can replace R2 for on-premise deployments
- Adds operational complexity (master + volume servers)
- Not needed if using R2 or another S3-compatible service

**Conclusion:** Documented for future on-premise deployments. Not required for current cloud-backed setup.

---

## Roadmap (Post-MVP)

### Phase 1: Performance & Scalability
- Advanced indexing for PARA namespace indexers
- Database partitioning for high-volume tables (`cabildeo_vote`, `para_policy_vote`)
- Caching hardening: circuit breaker for Redis failures, fallback to in-memory LRU
- Standardize cursor-based pagination across all PARA routes

### Phase 2: Security & Governance
- Record-level authorization (only creators/moderators can publish governance updates)
- Temporal eligibility (voting eligibility based on membership status at event creation time)
- Custom XRPC rate limits for PARA namespaces
- Verifiable audit log for critical governance actions
- Secret manager integration (move JWT secret, admin password, PLC rotation key out of env vars)

### Phase 3: UI/UX & Resilience
- Age Assurance re-enablement
- Polished auth UX with helpful login/role-specific prompts
- Empty state excellence for governance filters and feeds
- Privacy-preserving analytics

### Phase 4: Infrastructure & Ops
- CI/CD workflows (adapt from bluesky-social GitHub Actions)
- Prometheus metrics, structured logging, distributed tracing
- Postgres migration path from SQLite for horizontal scaling
- Self-hosted OTA updates

### Phase 5: Decentralized Verification (Long Term)
- ZKP verification against official ID systems (e.g., INE) preserving privacy
- Trust-less vote tallies
- Global scaling for diverse democratic models

---

## Blog Posts & External Writing

- **Horizontal Governance** — On distributed decision-making and community sovereignty
- **PARA Cost Analysis** — Detailed breakdown of self-hosting vs cloud for 300k concurrent users
- **Liquid Democracy Research** — Academic grounding for proportional and quadratic models

---

## Research Documents (Archived)

The following detailed research documents exist in the git history and can be retrieved if needed:

| Document | Topic | Date |
|----------|-------|------|
| `LIQUID_DEMOCRACY_PLAN.md` | Initial liquid democracy implementation plan | 2026-05 |
| `LIQUID_DEMOCRACY_RESEARCHED.md` | Academic research on liquid democracy models | 2026-05 |
| `PROPORTIONAL_LIQUID_DEMOCRACY_PLAN.md` | Proportional delegation model design | 2026-05 |
| `QUADRATIC_LIQUID_DEMOCRACY_PLAN.md` | Quadratic voting model design | 2026-05 |
| `TRANQUIL_PDS_VS_RSKY_RESEARCH_REPORT.md` | PDS implementation comparison | 2026-05 |
| `SEAWEEDFS_INTEGRATION_RESEARCH.md` | Self-hosted blob storage research | 2026-05 |
| `PLAN_MATRIX_INTEGRATION.md` | Matrix bridge implementation plan | 2026-05 |
| `COST_ANALYSIS.md` | Full production cost breakdown | 2026-05 |
| `PARA_INFORME_COSTOS_Y_SWARM.md` | Spanish cost analysis | 2026-05 |
| `PARA_INFORME_DEPLOY_FINAL.md` | Spanish deployment report | 2026-05 |
| `PARA_V3_ITERATION_2_PLAN.md` | V3 iteration planning | 2026-05 |
| `PARA_V3_SPRINT_PLAN.md` | V3 sprint breakdown | 2026-05 |
| `ALPHA_300_DEPLOY_PLAN.md` | Alpha 300 deployment plan | 2026-05 |
| `BLOG_POST.md` | General blog post draft | 2026-05 |
| `BLOG_POST_HORIZONTAL_GOVERNANCE.md` | Horizontal governance blog post | 2026-05 |
