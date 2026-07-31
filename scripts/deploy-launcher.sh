#!/usr/bin/env bash
#
# Stable entrypoint for the production deploy, installed on the server as
# /usr/local/bin/deploy-portfolio and pinned as the forced command for the
# GitHub Actions deploy key in /root/.ssh/authorized_keys.
#
# Why this exists: deploy.sh lives inside the repo, and the deploy itself
# rewrites the repo. Bash reads a script incrementally as it executes, so a
# script that overwrites itself mid-run behaves unpredictably. This launcher
# extracts the target commit's deploy.sh to a temp file first, then runs that.
#
# Keep this file in sync with /usr/local/bin/deploy-portfolio if you edit it:
#     install -m 0755 scripts/deploy-launcher.sh /usr/local/bin/deploy-portfolio
#
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/root/kittipong/portfolio}"
BRANCH="${DEPLOY_BRANCH:-master}"

cd "$APP_DIR" || { echo "[fail] app directory not found: $APP_DIR" >&2; exit 1; }

git fetch --prune origin "$BRANCH"

TMP="$(mktemp /tmp/portfolio-deploy.XXXXXXXX.sh)"
trap 'rm -f "$TMP"' EXIT

git show "origin/$BRANCH:scripts/deploy.sh" > "$TMP"
chmod +x "$TMP"

bash "$TMP"
