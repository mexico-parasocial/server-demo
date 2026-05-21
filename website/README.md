# PARA web monorepo

One primary SvelteKit app ships the full public experience (home, product pages, and the `/docs` reference tree). A second app exists only as a slim landing mirror for previews or split deploys.

- **`apps/website`** (`@parasocial/website`): canonical site — everything lives here as one app.
- **`apps/landing`** (`@parasocial/landing`): optional standalone landing variant so branding and links can be checked without the full tree.

Shared packages:

- `packages/content-schema`: versioned content contract, validation, and generated schema fixtures
- `packages/ui`: shared brand tokens and typography

## Commands

```bash
pnpm install
pnpm dev
pnpm dev:website
pnpm dev:landing
pnpm check
pnpm lint
pnpm test
pnpm build
```

`pnpm dev` runs the full public site from `apps/website`. `pnpm dev:landing` runs the standalone landing variant.
