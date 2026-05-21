# PARA on the Web: A Deep Analysis of the Desktop Experience

_A technical audit of how a React Native app built for mobile translates to the desktop browser — what's elegant, what's held together with webpack duct tape, and what's still missing._

---

## Executive Summary

PARA is a civic operating system built on React Native + Expo. It runs on iOS, Android, and — via `react-native-web` — in the browser. After merging two major feature branches (`maplibre-experiment` with Agora/QV-LD, and `next-feature` with voting UI hardening), the web build **compiles successfully** but carries a 9.4 MB JavaScript payload, 578 TypeScript errors (mostly missing type packages), and a desktop layout that is surprisingly well-architected for a mobile-first codebase.

**Build Status:** ✅ Compiles with warnings  
**Bundle Size:** ⚠️ 9.4 MB entrypoint (4.6 + 4.8 MB chunks)  
**TypeScript:** 🔴 578 errors (non-blocking, mostly missing `@types`)  
**Desktop UX:** 🟡 Functional but mobile patterns leak through  
**Agora on Web:** ✅ Fully wired, renders correctly in flat navigator

---

## 1. Architecture: How a Native App Becomes a Website

### Entry Point

The web boot sequence is almost insultingly simple:

```js
// index.web.js
import {registerRootComponent} from 'expo'
import App from '#/App'
registerRootComponent(App)
```

Expo handles the `ReactDOM.render` call. `App.web.tsx` — selected via platform extension — wraps the app in a massive provider tree and imports `./style.css`, the **only** global CSS file in the entire app. Everything else is `StyleSheet.create`.

### The `alf` Design System

PARA doesn't use Tailwind or styled-components. It uses `alf` — a custom atomic design system from `@bsky.app/alf` that exposes:

- **Atoms:** `t.atoms.bg`, `t.atoms.text`, `t.atoms.border_contrast_low`
- **Palette:** `t.palette.primary_500`, `t.palette.positive_500`
- **Web-only injection:** `web({minHeight: '100dvh'})` for CSS that only applies on desktop

This means the same component can render a native view on mobile and a CSS-styled `div` on web without branching logic. It's elegant — until you need a breakpoint.

---

## 2. Desktop Layout: Three Columns, Fixed Everything

The web shell (`src/view/shell/index.web.tsx`) abandons the mobile tab navigator entirely and uses a **flat navigator** with three fixed columns:

```
┌──────────┬──────────────────────────────┬──────────┐
│  240px   │         600px max            │  250px   │
│ Left Nav │      Center (scrollable)     │ Right Nav│
│ (fixed)  │                              │ (fixed)  │
└──────────┴──────────────────────────────┴──────────┘
```

### Left Nav (`DesktopLeftNav.tsx`)

- **Normal mode:** 240px, shows icons + labels
- **Minimal mode (≤1300px):** 86px, icons only
- **Logged out:** 245px with wider compose button
- Contains: Home, Search, Notifications, Base, My Base, Messages, Communities, Cabildeo (lobbying), Feeds, Lists, Saved, Profile, Settings

### Right Nav (`DesktopRightNav.tsx`)

- 250px or 300px depending on viewport
- **Hidden on:** Map and Compass screens (they go full-width)
- **Hidden when:** viewport < 1100px
- Contains: Search widget, feeds list, progress guide, trending topics, live events, footer links

### Center Column

- Max width 600px (enforced by `Layout.Center`)
- Scrollable
- The only part of the layout that moves

This is essentially **Twitter's desktop layout cloned in React Native**. The left/right sidebars are `position: fixed` and manually offset using `left: 50%` plus translation math. It's not responsive in the fluid sense — it's **adaptive** with hard breakpoints.

### Breakpoints

| Breakpoint        | Width   | What Changes                                                          |
| ----------------- | ------- | --------------------------------------------------------------------- |
| `gtPhone`         | ≥500px  | Minor padding tweaks                                                  |
| `gtMobile`        | ≥800px  | `Layout.Center` activates (max-width 600px); tablet/desktop threshold |
| `gtTablet`        | ≥1300px | Drawer suppressed; left nav goes full; right nav appears              |
| `rightNavVisible` | ≥1100px | Right sidebar renders                                                 |

These are detected via `react-responsive` (`useMediaQuery`), not CSS media queries. On native, `gtMobile` and `gtTablet` are hardcoded to `false`.

---

## 3. Navigation: URL Routing That Actually Works

For a React Native app, PARA has shockingly good web URL routing:

```ts
// src/routes.ts
export const router = new Router<AllNavigatableRoutes>({
  Home: ['/', '/download'],
  Search: '/search',
  Profile: ['/profile/:name', '/profile/:name/rss'],
  Agora: '/agora',
  ProposalDetail: '/agora/proposals/:proposalUri',
  Map: '/map',
  Compass: '/compass',
  // ... 100+ routes
})
```

### Deep Linking

- Native: `bsky://` and `bluesky://` prefixes
- Web: `https://bsky.app` prefix + browser history integration
- `history.pushState` is used in the lightbox so **browser back closes the lightbox instead of navigating away** — a delightful UX detail

### Scroll Restoration

`useWebScrollRestoration()` is attached to the flat navigator and restores scroll position on browser back/forward. This is web-native behavior that most SPA frameworks struggle with; PARA implements it manually via scroll event listeners.

---

## 4. The 61 `.web.tsx` Files: Platform Specialization

When a component needs fundamentally different behavior on web, PARA creates a `.web.tsx` variant. There are **61** of these. The most architecturally significant:

### `List.web.tsx` — The FlatList Replacement

Native `FlatList` doesn't exist on web. The web variant is a **custom DOM-based virtual list** using `IntersectionObserver`, `ResizeObserver`, and manual scroll event wiring. It supports:

- `onStartReached` / `onEndReached` (infinite scroll)
- `onItemSeen` (viewability tracking)
- Full-window scroll AND container-scrolled modes

This is ~400 lines of complex DOM code. It's impressive and fragile.

### `Lightbox.web.tsx` — Browser History Integration

Uses `radix-ui` focus scope, `RemoveScrollBar`, and `history.pushState`. Pressing the browser back button closes the lightbox. Keyboard arrow keys and Escape work. Backdrop uses `backdrop-filter: blur(10px)`.

### `Composer.web.tsx` — Fixed Modal

Renders as a centered fixed modal (`position: fixed`, `maxWidth: 600`, `maxHeight: calc(100% - 80px)`) rather than a bottom sheet. Uses `RemoveScrollBar` to lock body scroll.

### `MapScreen.web.tsx` — Google Maps via Web Components

Uses `@teovilla/react-native-web-maps` (aliased in webpack) to render Google Maps. Desktop gets a 380px sidebar + map split pane. Mobile gets an 85% width slide-out drawer with `backdropFilter: blur(10px)`.

### Context Menu, Tooltip, Dialog

All use Radix UI primitives on web with CSS animations defined in `style.css`. Native uses custom gesture-based implementations.

---

## 5. Agora on the Desktop

The new Agora screens (merged from `maplibre-experiment`) are **web-ready without any `.web.tsx` variants**:

### `AgoraScreen.tsx`

- Uses `Layout.Screen` + `Layout.Header.Outer` correctly
- Does **NOT** use `Layout.Content` — instead uses a raw `<ScrollView>` for full-width cards
- This is intentional: the feed cards stretch edge-to-edge in the 600px center column
- Floating action button positioned absolute bottom-right

### `ProposalDetailScreen.tsx`

- Uses `Layout.Content` (standard centered scroll view)
- 4 tabs: Vote / Deliberate / Delegate / Tally
- `VoteComposer`, `ShadowTallyChart`, deliberation statements, delegation cards
- All render correctly in the flat navigator

### Drawer Integration

- `Agora` appears in the left nav sidebar
- `AgoraMenuItem` is in `Drawer.tsx` with proper `isAtAgora` active state detection
- Routes are registered in `routes.ts` with `/agora` and `/agora/proposals/:proposalUri`

**Verdict:** The Agora civic OS is fully functional on desktop. No web-specific fixes were needed.

---

## 6. Webpack: A Museum of Workarounds

The `webpack.config.js` is a testament to the pain of running React Native in a browser:

```js
// The standard trio
'react-native$': 'react-native-web',
'react-native-webview': 'react-native-web-webview',
'react-native-maps': '@teovilla/react-native-web-maps',

// UITextView doesn't exist on web
'react-native-uitextview': path.resolve(__dirname, 'src/platform/react-native-uitextview-mock.web.tsx'),

// ESM packages that break webpack
'unicode-segmenter/grapheme': require.resolve('unicode-segmenter/grapheme').replace(/\.cjs$/, '.js'),

// Yarn 1 hoists tslib; @atproto source maps reference non-existent nested paths
sourceMapLoaderRule.exclude = /node_modules/

// abort-controller/polyfill.mjs omits file extensions
// Webpack's strict ESM resolution requires them
{
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto',
  resolve: {fullySpecified: false},
}

// expo-contacts type-only re-export doesn't exist at runtime on web
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/ContactAccessButton$/,
  contextRegExp: /expo-contacts/,
})
```

Every line is a bug report that was never filed upstream.

---

## 7. The Numbers: Build, Bundle, TypeScript

### Webpack Build

```
✅ Compiled with warnings

Warnings:
- MexicoGeoJSON named export (pre-existing)
- createQueryKey not exported from '../util' (pre-existing, 2 files)
- Bundle size: 9.41 MiB entrypoint
  - static/js/main.7490d5d1.js     (4.57 MiB)
  - static/js/731.4b8dd003.js      (4.83 MiB)
  - static/css/main.2315ece1.css   (small)
```

**9.4 MB** is large but not catastrophic for a social app. The two JS chunks suggest code splitting is working. For comparison, Twitter's web app loads ~15 MB of JS on first visit. Still, there's room for tree-shaking optimization.

### TypeScript

```
🔴 578 errors

Top error categories:
- TS18046: 'x' is of type 'unknown' (55 instances)
- TS7006: Parameter implicitly has 'any' (33 instances)
- TS2307: Cannot find module '@heroicons/react/24/outline' (10 instances)
- TS2307: Cannot find module 'react-router-dom' (8 instances)
- TS2307: Cannot find module 'kysely' (7 instances)
- TS2304: Cannot find name 'IS_WEB' (8 instances)
- TS2769: No overload matches this call (11 instances)
```

**None of these are blocking.** They're almost entirely:

1. Missing type declarations for dev dependencies (`@heroicons/react`, `react-router-dom`, `kysely`, `@headlessui/react`)
2. Implicit `any` in utility functions
3. `unknown` types in generic hooks

The app compiles and runs despite these errors because TypeScript is configured with `noEmit` for type checking only; Babel handles transpilation.

---

## 8. What's Broken / Missing on Desktop

### 🔴 Critical

| Issue                            | Impact                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Missing `Language` icon**      | Merge conflict — `MessageContextMenu` imports a non-existent icon. **Fixed during this analysis.**                                          |
| **Map markers need coordinates** | Cities/districts have names but no lat/lng lookup table. Neither `react-native-maps` nor `MapLibre` can render markers without coordinates. |

### 🟠 High

| Issue                                           | Impact                                                                                                                        |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Bundle size (9.4 MB)**                        | First load is heavy. No lazy loading for Agora screens.                                                                       |
| **Drawer is mobile-only**                       | On desktop, the drawer is suppressed (`!gtTablet`). This is correct, but the hamburger menu still appears in some edge cases. |
| **No keyboard shortcuts**                       | No `Ctrl+K` for search, `J/K` for navigation, `Esc` to close modals (except lightbox).                                        |
| **Composer is a modal, not an inline textarea** | On desktop Twitter/Bluesky, the composer is inline at the top of the feed. PARA uses a fixed modal.                           |

### 🟡 Medium

| Issue                              | Impact                                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Agora list uses raw ScrollView** | Bypasses `Layout.Content` centering. Works but breaks the "scroll to top on tab switch" behavior.   |
| **Right nav hides on Map/Compass** | Correct behavior, but the transition is abrupt (no animation).                                      |
| **No hover states**                | Most `TouchableOpacity` components don't have `:hover` CSS. Desktop feels like a ported mobile app. |
| **Context menu is native-style**   | Right-click shows the browser context menu, not a custom radial/menu.                               |

### 🟢 Low / Polish

| Issue                            | Impact                                                                            |
| -------------------------------- | --------------------------------------------------------------------------------- |
| **Pre-existing TS errors**       | 578 errors create noise. Missing `@types` packages should be installed.           |
| `IS_WEB` global missing types    | 8 instances of `Cannot find name 'IS_WEB'`. Should be declared in a `.d.ts` file. |
| **MexicoGeoJSON import warning** | Named export from default-exporting module. Cosmetic.                             |
| **createQueryKey missing**       | 2 message query files reference a deleted utility. Pre-existing.                  |

---

## 9. The Civic OS on Desktop: Does It Work?

### Agora (Proposals Feed)

✅ Renders correctly. Cards stretch full width. Filters work. FAB is positioned correctly.

### Proposal Detail

✅ 4 tabs render. Vote composer works. Shadow tally chart displays. Delegation cards show.

### My Base / Civic Dashboard

✅ Civic Score ring renders. Metric tiles align. Community chips wrap correctly. Compass mini shows center position by default.

### Voting Flow

✅ Option cards are tappable. Vote button is prominent. Change vote works. Toast notifications appear.

### Map

⚠️ Renders but **no markers** — the coordinate lookup table is the real blocker, not the map library.

### Drawer Navigation

✅ All new routes (Agora, PolicyDetails, CabildeoDetail) are in the left nav. Active states work.

---

## 10. Recommendations

### Immediate (This Week)

1. **Install missing type packages:** `@heroicons/react`, `react-router-dom`, `kysely`, `@headlessui/react`
2. **Add `IS_WEB` to a `.d.ts` file** to silence 8 errors
3. **Fix `createQueryKey`** — either restore the utility or fix the 2 message query files
4. **Add coordinate data** for Mexican cities/districts so map markers render

### Short Term (Next Sprint)

5. **Code-split Agora screens** with `React.lazy()` to reduce initial bundle
6. **Add `:hover` states** to primary buttons and cards for desktop polish
7. **Keyboard shortcuts:** `Ctrl+K` → Search, `Esc` → Close modal, `J/K` → Navigate feed
8. **Hover tooltips** on the compass mini and signal bars

### Long Term (Backlog)

9. **Replace raw `ScrollView` in Agora** with `Layout.Content` + `List.web.tsx` for virtualized rendering
10. **Investigate bundle size:** 9.4 MB suggests large dependencies (possibly `react-native-pdf`, `expo-camera`, or the lexicon schemas). Run webpack-bundle-analyzer.
11. **Desktop composer:** Consider an inline composer at the top of feeds instead of a modal
12. **Right-click context menus:** Use Radix ContextMenu on desktop for proposal cards

---

## Conclusion

PARA's web/desktop experience is **significantly more mature than expected** for a mobile-first React Native app. The three-column layout is well-executed, URL routing is comprehensive, and the new Agora civic OS works on desktop without any web-specific patches. The architecture — `alf` atoms, platform extensions, and the flat navigator — demonstrates disciplined cross-platform thinking.

The real issues are **paper cuts, not structural failures:** missing type packages, a heavy bundle, no hover states, and no keyboard shortcuts. The foundation is solid. The polish is what separates a working web app from a native-feeling desktop experience.

**Grade: B+**

- **Architecture:** A
- **Desktop Layout:** A-
- **Bundle/Performance:** C+
- **TypeScript Hygiene:** D+ (578 errors)
- **Desktop Polish (hover, keyboard):** C
- **Agora Web Readiness:** A

---

_Analysis conducted on 2026-05-06 after merging `maplibre-experiment` → `next-feature`. Webpack 5, Expo SDK ~50, React Native Web 0.19, Node 24.15.0._
