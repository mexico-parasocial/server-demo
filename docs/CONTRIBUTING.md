# Contributing to PARA

Thanks for helping build digital democracy tooling. This doc gets you from zero to a working dev environment and first commit.

---

## Dev Environment

### Required

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | >= 24.15.0 | Use `.nvmrc` in subprojects: `nvm use` |
| pnpm | >= 8.15.9 | Enforced via `packageManager` in `package.json` |
| Docker | any recent | Postgres 15 + Redis 7 for local dev |
| Java 17 (Zulu) | 17 | Only for Android builds / full backend |
| Go | >= 1.25 | Only for `bskyweb` and `indigo` |

Install pnpm:
```bash
npm install -g pnpm@8.15.9
```

Switch Node version in any subproject:
```bash
nvm use        # reads .nvmrc
```

### Repo Layout

```
PARA/           # React Native / Expo client
WhatZatppa/     # AT Protocol backend monorepo
m8/             # Identity broker (PoP Wallet + Identity Manager)
scripts/        # Deploy & ops scripts
docs/           # Architecture docs & runbooks
```

Each directory is independently installable. There is no root `package.json`.

---

## Workflow

### 1. Fork & Branch

```bash
git checkout -b feat/your-feature-name
```

### 2. Install & Build

**Backend:**
```bash
cd WhatZatppa
make deps
make codegen
make build
```

**Frontend:**
```bash
cd PARA
pnpm install
```

**m8 Identity Manager:**
```bash
cd m8/identity-manager
pnpm install
pnpm build
```

### 3. Run Tests

Backend:
```bash
cd WhatZatppa
make test
```

m8:
```bash
cd m8/identity-manager
pnpm test:integration
```

PARA:
```bash
cd PARA
pnpm test
```

### 4. Type Check & Lint

Backend:
```bash
cd WhatZatppa
make lint
make fmt
```

PARA:
```bash
cd PARA
pnpm typecheck
pnpm lint
```

### 5. Commit

We follow conventional commits:
```
feat: add vote delegation UI
fix: correct compass grid alignment on web
docs: update dev setup instructions
refactor: extract usePolicyTree hook
```

---

## Code Conventions

### Package Manager

**pnpm only.** Each subproject has `packageManager` pinned in `package.json`. Using npm or yarn will break lockfile consistency.

### TypeScript

- Strict mode enabled everywhere.
- No `any` without a comment explaining why.
- Prefer explicit return types on exported functions.

### Styling (`Alf`)

Use the atomic design system:
```tsx
import {atoms as a} from '#/alf'

// Good
<View style={[a.flex_1, a.px_lg, a.gap_sm]} />

// Bad — ad-hoc StyleSheet
<View style={{flex: 1, paddingHorizontal: 16, gap: 8}} />
```

### Module Aliases

`#/` maps to `src/`:
```ts
import {useSession} from '#/state/session'
import {COMPASS_COLORS} from '#/lib/compass/compassColors'
```

### Lexicons

If you modify a lexicon (`WhatZatppa/lexicons/com/para/...`):
1. Edit the JSON schema
2. Run `make codegen` in `WhatZatppa/`
3. Run `make build`
4. Commit both the schema and generated types

### Political Compass Colors

Import from the canonical source:
```ts
import {COMPASS_COLORS} from '#/lib/compass/compassColors'
```
Never hardcode hex values like `#efb9bb` in components.

### React Query

- Persisted queries: prefix query key with `PERSISTED_QUERY_ROOT`
- Paginated feeds: use `truncateAndInvalidate` for pull-to-refresh, not bare `refetch`

---

## Reporting Issues

- Use GitHub Issues.
- Include reproduction steps, expected vs actual behavior.
- Check existing issues first.

## Security

Do not open public issues for security vulnerabilities. Contact maintainers directly.

---

By contributing, you agree your work is licensed under the project's MIT and Apache 2.0 licenses.
