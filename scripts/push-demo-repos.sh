#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

push_repo() {
  local name="$1"
  local dir="$2"
  local remote="$3"
  local branch="${4:-main}"

  printf '\n==> %s\n' "$name"
  git -C "$dir" push "$remote" "$branch"
}

push_repo "server-demo" "$ROOT_DIR" "git@github-new:mexico-parasocial/server-demo.git" main
push_repo "WatZappa" "$ROOT_DIR/WatZappa" origin main
push_repo "mubEZ" "$ROOT_DIR/mubEZ" origin main
push_repo "PARA" "$ROOT_DIR/PARA" origin main

printf '\n==> iM8\n'
printf 'iM8 remote main has separate history; push explicitly with one of:\n'
printf '  git -C "%s/iM8" push origin main:demo-sync\n' "$ROOT_DIR"
printf '  git -C "%s/iM8" push --force-with-lease origin main\n' "$ROOT_DIR"
