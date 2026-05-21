## Cloudflare Pages Deployment

Use `apps/website` for the production public site on `paramx.social`.

Why:
- `apps/website` builds the marketing homepage, the `/docs` tree, and additional routes together.

Verified locally:
- `pnpm --filter @parasocial/website build`
- static output written to `apps/website/build`

### Recommended Pages project settings

Repository root:
- `website`

Framework preset:
- `None`

Build command:
- `pnpm build:site`

Build output directory:
- `apps/website/build`

Root directory:
- `website`

Node / package manager:
- `pnpm` from `website/package.json`

### If you do not set Root directory

If you leave the Pages root directory at the repo root, then the build command
should include the folder change explicitly:

- `cd website && pnpm build:site`

The output directory would still be:

- `apps/website/build`

### Domain plan

Primary production domain:
- `paramx.social`

Optional aliases:
- `www.paramx.social`
- `docs.paramx.social`

### Important DNS note

If you want the apex domain `paramx.social` on Cloudflare Pages, move the zone to
Cloudflare nameservers from Porkbun first. Keeping Porkbun as the registrar is fine;
the nameservers are the part that should point to Cloudflare.

## Android APK hosting

Do not try to ship the Android APK as a normal Pages static asset.

Why:
- the current local artifact at `../PARA/android/app/build/outputs/apk/debug/app-debug.apk` is much larger than the current Cloudflare Pages per-file limit of `25 MiB`
- Pages is still the right host for the public site, but the APK itself should live in R2 behind a public bucket or custom domain

Recommended split:
- `paramx.social` stays on Cloudflare Pages
- Android APK lives in an R2 bucket, for example `https://downloads.paramx.social/android/para-android-debug.apk`
- the site reads that URL from `PUBLIC_ANDROID_APK_URL` at build time and turns `/try-app` into a direct download path

### One-time setup

1. Create an R2 bucket for downloads.
2. Expose it through a public/custom domain such as `downloads.paramx.social`.
3. In the Pages project environment variables, set:
   - `PUBLIC_ANDROID_APK_URL=https://downloads.paramx.social/android/para-android-debug.apk`
   - optional: `PUBLIC_ANDROID_APK_LABEL=Download Android debug APK`

### Upload command

From `website`, upload the current local APK to R2:

```bash
cd website
export CLOUDFLARE_R2_BUCKET=paramx-downloads
export CLOUDFLARE_R2_PUBLIC_BASE_URL=https://downloads.paramx.social
pnpm upload:android-apk
```

Optional overrides:
- `ANDROID_APK_SOURCE` to point at a different local APK or AAB-derived artifact
- `ANDROID_APK_OBJECT_KEY` to change the public object path

After the upload completes, rebuild or redeploy the Pages site so the `/try-app`
page picks up the updated `PUBLIC_ANDROID_APK_URL`.

### First deploy checklist

1. Create a Cloudflare Pages project from the GitHub repo.
2. Point the project at the `website` directory in the monorepo.
3. Set build command to `pnpm build:site`.
4. Set output directory to `apps/website/build`.
5. Deploy once and verify:
   - `/`
   - `/about`
   - `/docs`
   - `/docs/product`
   - `/try-app`
6. Add `paramx.social` as the custom domain.
7. Add `www.paramx.social` and redirect it to the apex if desired.

### Manual deploy command

For direct uploads from your machine or CI, use:

```bash
cd website
export CLOUDFLARE_PAGES_PROJECT=paramx-social
pnpm deploy:site
```

That script:
- builds `apps/website`
- uploads `apps/website/build` with Wrangler Pages

Required auth is whatever Wrangler uses in your environment, for example:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

If you use Git integration in Pages, pushes to the connected branch remain the
normal production deploy path. The manual deploy command is for explicit uploads
when you want tighter control.
