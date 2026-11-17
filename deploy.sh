#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# hunter-blog deploy, part 1 (dev machine): build -> tag -> pack.
#
#   ./deploy.sh
#
# Produces /tmp/blog.tar.gz and prints the exact scp/ssh commands for
# part 2 (you run those, they need your SSH access). On the VPS the image
# loads as hunter-blog:prod; Dokploy's compose service
# (docker-compose.dokploy.yml) runs that tag — final step is pressing
# Deploy in the Dokploy UI.
#
# Requires: docker, git. No registry, no credentials, nothing leaves
# this machine except the tarball you scp yourself.
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

IMAGE="hunter-blog"
SHA="$(git rev-parse --short HEAD)"
TARBALL="/tmp/blog.tar.gz"
SITE_URL="https://kavlabs.ir"

# 1. Build with prod args baked in (NEXT_PUBLIC_* only exist at build time)
echo "==> [1/3] Building ${IMAGE}:${SHA}"
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL="${SITE_URL}" \
  -t "${IMAGE}:${SHA}" \
  -t "${IMAGE}:prod" \
  .

# 2. Pack for transfer
echo "==> [2/3] Packing ${TARBALL}"
docker save "${IMAGE}:prod" | gzip > "${TARBALL}"
echo "==> [3/3] Done: $(ls -lh "${TARBALL}" | awk '{print $5}') at ${TARBALL}"

cat <<EOF

-----------------------------------------------------------------------------
PART 2 — you run these (replace <VPS_USER> and <VPS_IP>):

  scp ${TARBALL} <VPS_USER>@<VPS_IP>:/tmp/
  ssh <VPS_USER>@<VPS_IP> 'gunzip -c /tmp/blog.tar.gz | sudo docker load && rm /tmp/blog.tar.gz'

PART 3 — Dokploy UI: hunter-blog service -> Deploy.
  Routing/TLS: Domains tab -> service `app`, port 3000 -> kavlabs.ir

Rollback on the VPS if needed (previous SHA image is still there):
  docker tag ${IMAGE}:<older-sha> ${IMAGE}:prod && docker compose -p <proj> up -d --force-recreate app
-----------------------------------------------------------------------------
EOF
