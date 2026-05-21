# PARA Client

React Native / Expo client for the PARA civic platform. Targets iOS, Android, and Web.

---

## Quick Start

```bash
cd PARA

# Install dependencies (pnpm only)
pnpm install

# Start Expo dev server
pnpm web        # Web
pnpm ios        # iOS simulator
pnpm android    # Android emulator
```

---

## Requirements

- Node.js >= 24.15.0 (see `.nvmrc`)
- pnpm >= 11.1.1 (enforced via `packageManager` in `package.json`)
- Java 17 (Zulu) — for Android builds
- Xcode — for iOS builds

---

## Project Structure

```
src/
  screens/        # Route-level screens (Agora, Communities, Map, Cabildeo, etc.)
  components/     # Reusable UI components
  state/          # React Query hooks, persisted state, modals
  lib/
    api/          # PARA lexicon TypeScript types + API wrappers
    compass/      # Political compass colors & logic (canonical source)
    cabildeo-*    # Policy voting helpers
    civic-*       # Civic map, insignias, communities
  view/           # Presentation-layer components
  alf/            # Atomic design system ("Alf")
  locale/         # i18n message catalogs (Lingui v5)
  platform/       # Platform-specific shims
bskyweb/          # Go web server — browser-facing demo frontend
indigo-main/      # Fork of bluesky-social/indigo (Go AT Protocol lib)
bskyembed/        # Embeddable post widget (Vite + Tailwind)
bskylink/         # Link-card resolver service
bskyogcard/       # OpenGraph card generator
dev-env/          # Local mock server for E2E tests
__tests__/        # Jest unit tests
__e2e__/          # Maestro E2E flow definitions
```

---

## Key Conventions

### Design System (`Alf`)

Use `atoms` (aliased as `a`) and `useTheme` for all styling:
```tsx
import {atoms as a, useTheme} from '#/alf'

const t = useTheme()

<View style={[a.flex_1, a.px_lg, a.gap_sm, t.atoms.bg]} />
```

No ad-hoc `StyleSheet.create` unless absolutely necessary for animations.

### Web Layout Standard

Center-column screens follow this pattern:
```tsx
<Layout.Screen>
  <Header>...</Header>
  <Layout.Center style={styles.center}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* content */}
    </ScrollView>
  </Layout.Center>
</Layout.Screen>

const styles = StyleSheet.create({
  center: {flex: 1},
  container: {flex: 1},
  contentContainer: {padding: 16, paddingBottom: 100},
})
```

Reference: `RepresentativesScreen`.

### Compass Colors

All 9 political-compass position colors live in `src/lib/compass/compassColors.ts`. Import from there — never hardcode hex values.

### Module Aliases

`#/` maps to `src/`:
```ts
import {useSession} from '#/state/session'
import {COMPASS_COLORS} from '#/lib/compass/compassColors'
```

### React Query

- Persisted queries: prefix query key with `PERSISTED_QUERY_ROOT`
- Paginated feeds: use `truncateAndInvalidate` for pull-to-refresh

---

## Local Dev Notes

### iOS App Clip

The `PARAAppClip` target has been removed from the Xcode project because personal (free) Apple Developer accounts cannot provision App Clips. This unblocks physical device deployment. To restore for production builds, re-add the target to `ios/PARA.xcodeproj/project.pbxproj`.

### Local PDS Connection

`src/lib/constants.ts` hardcodes the local PDS IP (`192.168.100.31:2583`). Update this to match your host machine's local IP when testing on physical devices.

### JDK

macOS requires Zulu 17:
```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

On Apple Silicon, if building RN 0.74+ for the first time:
```bash
arch -arm64 brew install llvm
sudo gem install ffi
```

---

## Scripts

```bash
pnpm web              # Expo web dev server
pnpm ios              # iOS simulator
pnpm android          # Android emulator
pnpm test             # Jest unit tests
pnpm typecheck        # TypeScript check
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm seed:civic:apply --introspect-url http://127.0.0.1:2581   # Seed demo data
```

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

## Paused Features (Post-MVP)

### Age Assurance

Full age-assurance subsystem exists in `src/ageAssurance/` but is **bypassed** for MVP — all users get `Full` access. To re-enable, remove the bypass in `src/ageAssurance/state.ts` and ensure the PDS supports `app.bsky.ageassurance.*` endpoints.

### Discover Feed

Disabled in local-dev mode (`DEFAULT_DISCOVER_FEED_URI = null`) because the feed generator is not seeded. Home tab falls back to Following timeline.
