#!/bin/sh

set -eu

APK_SOURCE="${ANDROID_APK_SOURCE:-../PARA/android/app/build/outputs/apk/debug/app-debug.apk}"
R2_BUCKET="${CLOUDFLARE_R2_BUCKET:-}"
R2_PUBLIC_BASE_URL="${CLOUDFLARE_R2_PUBLIC_BASE_URL:-}"
OBJECT_KEY="${ANDROID_APK_OBJECT_KEY:-para-android-latest.apk}"
CONTENT_TYPE="application/vnd.android.package-archive"

if [ -z "$R2_BUCKET" ]; then
	echo "Set CLOUDFLARE_R2_BUCKET before uploading." >&2
	exit 1
fi

if [ -z "$R2_PUBLIC_BASE_URL" ]; then
	echo "Set CLOUDFLARE_R2_PUBLIC_BASE_URL before uploading." >&2
	exit 1
fi

if [ ! -f "$APK_SOURCE" ]; then
	echo "APK not found at $APK_SOURCE" >&2
	exit 1
fi

pnpm dlx wrangler@latest r2 object put "${R2_BUCKET}/${OBJECT_KEY}" \
	--remote \
	--file="$APK_SOURCE" \
	--content-type="$CONTENT_TYPE"

APK_URL="${R2_PUBLIC_BASE_URL%/}/${OBJECT_KEY}"

printf '\nUploaded Android APK.\n'
printf 'Source: %s\n' "$APK_SOURCE"
printf 'Public URL: %s\n' "$APK_URL"
printf '\nSet this for the website build:\n'
printf 'PUBLIC_ANDROID_APK_URL=%s\n' "$APK_URL"
