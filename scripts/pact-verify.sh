#!/usr/bin/env bash

set -euo pipefail

repo_root="$(dirname "${0}")/.."
readonly repo_root
cd "${repo_root}"

export PACT_BROKER_BASE_URL="${PACT_BROKER_BASE_URL:-http://127.0.0.1:9292}"
export PACT_BROKER_USERNAME="${PACT_BROKER_USERNAME:-pact}"
export PACT_BROKER_PASSWORD="${PACT_BROKER_PASSWORD:-pact}"
export PACT_PROVIDER_NAME="${PACT_PROVIDER_NAME:-Bread Recipes API}"
export PACT_PROVIDER_BASE_URL="${PACT_PROVIDER_BASE_URL:-http://127.0.0.1:8000}"
export PACT_PROVIDER_HOSTNAME="${PACT_PROVIDER_HOSTNAME:-127.0.0.1}"
export PACT_PROVIDER_PORT="${PACT_PROVIDER_PORT:-8000}"
export PACT_PROVIDER_TRANSPORT="${PACT_PROVIDER_TRANSPORT:-http}"
export PACT_PROVIDER_BRANCH="${PACT_PROVIDER_BRANCH:-$(git branch --show-current)}"
export PACT_PROVIDER_VERSION="${PACT_PROVIDER_VERSION:-$(git rev-parse HEAD)}"

if [[ -n "${PACT_PROVIDER_BASE_PATH:-}" ]]; then
  export PACT_PROVIDER_BASE_PATH
fi

docker compose up --detach

for i in $(seq 1 30); do
  if wget --quiet --output-document=/dev/null "${PACT_BROKER_BASE_URL}/diagnostic/status/heartbeat"; then
    break
  fi
  if [[ "${i}" -eq 30 ]]; then
    exit 1
  fi
  sleep 5
done

pnpm pact:consumer-test
PACT_BROKER_BASE_URL="${PACT_BROKER_BASE_URL}" \
  PACT_BROKER_USERNAME="${PACT_BROKER_USERNAME}" \
  PACT_BROKER_PASSWORD="${PACT_BROKER_PASSWORD}" \
  pnpm pact:consumer-publish
PACT_BROKER_BASE_URL="${PACT_BROKER_BASE_URL}" \
  PACT_BROKER_USERNAME="${PACT_BROKER_USERNAME}" \
  PACT_BROKER_PASSWORD="${PACT_BROKER_PASSWORD}" \
  pnpm pact:provider-verify

docker compose down
