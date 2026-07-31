#!/usr/bin/env bash
#
# Production deploy for kittipong.org
#
# Runs ON THE SERVER. Invoked by the GitHub Actions "Deploy to production"
# workflow over SSH (via /usr/local/bin/deploy-portfolio), or by hand:
#
#     /usr/local/bin/deploy-portfolio
#
# Guarantees:
#   - uncommitted work on the server is stashed, never destroyed
#   - the previous build is kept until the new one is proven healthy
#   - a failed build OR a failed health check rolls the site back automatically
#
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/root/kittipong/portfolio}"
PM2_APP="${PM2_APP:-portfolio}"
BRANCH="${DEPLOY_BRANCH:-master}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3000/}"
HEALTH_RETRIES="${HEALTH_RETRIES:-20}"
HEALTH_DELAY="${HEALTH_DELAY:-2}"
BACKUP_DIR=".next.prev"

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m[warn] %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31m[fail] %s\033[0m\n' "$*" >&2; exit 1; }

command -v npm >/dev/null || die "npm not found on PATH"
command -v pm2 >/dev/null || die "pm2 not found on PATH"
cd "$APP_DIR" || die "app directory not found: $APP_DIR"

PREV_COMMIT="$(git rev-parse HEAD)"
log "deploy starting — current commit ${PREV_COMMIT:0:8}"

# Never destroy in-progress work. This repo doubles as a live working tree
# (VS Code Remote), so park anything uncommitted instead of resetting over it.
# -u includes untracked files but leaves gitignored files (.env, .next) alone.
if [ -n "$(git status --porcelain)" ]; then
    warn "working tree is dirty — stashing it (recover with: git stash list)"
    git stash push -u -m "pre-deploy autostash $(date -u +%Y-%m-%dT%H:%M:%SZ)" \
        || die "could not stash local changes; aborting rather than discarding them"
fi

log "fetching origin/$BRANCH"
git fetch --prune origin "$BRANCH"
TARGET_COMMIT="$(git rev-parse "origin/$BRANCH")"

if [ "$PREV_COMMIT" = "$TARGET_COMMIT" ]; then
    log "already at ${TARGET_COMMIT:0:8} — rebuilding anyway to pick up dependency changes"
fi

git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" "origin/$BRANCH"
git reset --hard "origin/$BRANCH"

log "installing dependencies (npm ci)"
npm ci --no-audit --no-fund

# Keep the live build until the new one is proven good.
rm -rf "$BACKUP_DIR"
[ -d .next ] && cp -a .next "$BACKUP_DIR"

rollback() {
    warn "rolling back to ${PREV_COMMIT:0:8}"
    git reset --hard "$PREV_COMMIT" || true
    npm ci --no-audit --no-fund || warn "rollback npm ci failed — dependencies may be inconsistent"
    if [ -d "$BACKUP_DIR" ]; then
        rm -rf .next
        mv "$BACKUP_DIR" .next
    fi
    pm2 restart "$PM2_APP" --update-env || true
}

log "building"
if ! npm run build; then
    rollback
    die "build failed — previous version restored"
fi

log "restarting pm2 app: $PM2_APP"
if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
    pm2 restart "$PM2_APP" --update-env
else
    warn "pm2 app '$PM2_APP' not registered — starting it"
    pm2 start npm --name "$PM2_APP" -- start
fi

log "health check: $HEALTH_URL"
healthy=0
for _ in $(seq 1 "$HEALTH_RETRIES"); do
    code="$(curl -fsS -o /dev/null -w '%{http_code}' "$HEALTH_URL" 2>/dev/null || echo 000)"
    if [ "$code" = "200" ]; then
        healthy=1
        break
    fi
    sleep "$HEALTH_DELAY"
done

if [ "$healthy" != "1" ]; then
    rollback
    die "health check never returned 200 — previous version restored"
fi

rm -rf "$BACKUP_DIR"
pm2 save --force >/dev/null 2>&1 || true

log "deployed ${TARGET_COMMIT:0:8} successfully ✓"
git --no-pager log -1 --format='    %h  %s  (%an, %ad)' --date=short
