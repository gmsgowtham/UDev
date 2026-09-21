# AGENTS.md — UDev

React Native 0.73 (RN CLI, not Expo) unofficial dev.to Android client. Entry: `index.js` → `App.tsx` → `src/router/index.tsx` (stack over bottom tabs).

## Commands (npm only, Node >=18)

- `npm ci` — CI install; `postinstall` runs `husky install && patch-package`, keep it working.
- `npm start` / `npm run android` / `npm run ios` — dev server / run. Native deps: `Gemfile` pins `cocoapods >=1.13, <1.15`.
- Verify (same order as CI in `.github/workflows/ci.yml`): `npm run check:tsc` → `npm run lint` → `npm run format` → `npm test`
  - `npm run lint` = `biome check ./` (fails on lint+format+import-organize issues); fix with `npm run lint:apply` (`--apply-unsafe`).
  - `npm run format` is check-only; fix with `npm run format:apply`.
  - `npm run check:tsc` = `tsc --noEmit` (extends `@react-native/typescript-config`).
- Tests: `npm test` (`jest`, preset `react-native`). Only coverage is `src/utils/__tests__/*.spec.ts`; single test: `npx jest src/utils/__tests__/url.spec.ts`.
- Release: `npm run android:release` (clean → bundleRelease → assembleRelease).

## Architecture

- `src/api/` — thin axios wrappers over `https://dev.to/api` (`src/utils/const.ts` for base URL, page size 10, 10s timeout). No auth.
- `src/store/` — zustand (`createWithEqualityFn` + `shallow`); one store per feed slice (`articles/feed.ts`, `articles/article.ts`, `videos/feed.ts`) with `fetch(page)` / `refresh()` / `reset()` pattern and `loading/error/refreshing` via `store/helpers.ts`.
- `src/mmkv/` — local persistence (`react-native-mmkv`): `bookmark.ts` (100 max, JSON blob + per-id boolean keys), `colorScheme.ts`, `searchHistory.ts`.
- `src/screens/` + `src/components/` — per-screen dirs with own `index.tsx`; `Markdown/` has custom tokenizer/renderer over `react-native-marked`.
- `src/theme/` — `react-native-paper` MD3; active palette is `colors/iris.ts` (pine/olive/russet/terracotta are unused alternates). Fonts: Inter in `assets/fonts/` wired via `react-native.config.js`.

## Gotchas

- `babel.config.js`: `react-native-worklets/plugin` must stay last (Reanimated 4 moved the Babel plugin out of `react-native-reanimated/plugin`).
- Pre-commit hook runs `npm run lint` (blocking); commits must pass commitlint conventional format (`commit-msg` hook, `.commitlintrc.json`).
- Biome ignores `android/ ios/ node_modules vendor coverage` — don't run Biome inside native dirs.
- Android-only behaviors (`ToastAndroid` in stores) — don't replace with cross-platform abstractions unprompted.
