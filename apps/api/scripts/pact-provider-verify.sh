#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
readonly script_dir

package_root="$(cd "${script_dir}/.." && pwd)"
readonly package_root

repo_root="$(cd "${package_root}/../.." && pwd)"
readonly repo_root

provider_name="${PACT_PROVIDER_NAME:?Missing required environment variable: PACT_PROVIDER_NAME}"
readonly provider_name

provider_base_url="${PACT_PROVIDER_BASE_URL:?Missing required environment variable: PACT_PROVIDER_BASE_URL}"
readonly provider_base_url

provider_hostname="${PACT_PROVIDER_HOSTNAME:?Missing required environment variable: PACT_PROVIDER_HOSTNAME}"
readonly provider_hostname

provider_port="${PACT_PROVIDER_PORT:?Missing required environment variable: PACT_PROVIDER_PORT}"
readonly provider_port

provider_transport="${PACT_PROVIDER_TRANSPORT:?Missing required environment variable: PACT_PROVIDER_TRANSPORT}"
readonly provider_transport

wait_for_healthy_provider() {
  local healthcheck_url="${provider_base_url}/health"
  local attempt

  for ((attempt = 1; attempt <= 60; attempt += 1)); do
    if wget --quiet --output-document=/dev/null "${healthcheck_url}"; then
      return
    fi
    sleep 0.5
  done

  echo "Provider did not become healthy at ${healthcheck_url}" >&2
  exit 1
}

cleanup() {
  if [[ -n "${provider_pid:-}" ]]; then
    kill -TERM "${provider_pid}" 2>/dev/null || true
    wait "${provider_pid}" 2>/dev/null || true
  fi
}

run_local_verification() {
  local command=(
    "${package_root}/node_modules/.bin/pact-verifier"
    --dir "${repo_root}/apps/web/pacts"
    --provider-name "${provider_name}"
    --hostname "${provider_hostname}"
    --port "${provider_port}"
    --transport "${provider_transport}"
  )

  "${command[@]}"
}

run_broker_verification() {
  local command

  command=(
    "${package_root}/node_modules/.bin/pact-verifier"
    --broker-url "${PACT_BROKER_BASE_URL}"
    --provider-name "${provider_name}"
    --hostname "${provider_hostname}"
    --port "${provider_port}"
    --transport "${provider_transport}"
    --consumer-version-selectors '{"mainBranch":true}'
    --consumer-version-selectors '{"matchingBranch":true}'
    --enable-pending
    --provider-branch "${PACT_PROVIDER_BRANCH:?Missing required environment variable: PACT_PROVIDER_BRANCH}"
    --user "${PACT_BROKER_USERNAME:?Missing required environment variable: PACT_BROKER_USERNAME}"
    --password "${PACT_BROKER_PASSWORD:?Missing required environment variable: PACT_BROKER_PASSWORD}"
  )

  if [[ "${CI:-}" == "true" ]]; then
    command+=(
      --publish
      --provider-version "${PACT_PROVIDER_VERSION:?Missing required environment variable: PACT_PROVIDER_VERSION}"
    )
  fi

  "${command[@]}"
}

main() {
  cd "${package_root}"

  ./.venv/bin/python -m uvicorn app.main:app --host "${provider_hostname}" --port "${provider_port}" &
  provider_pid=$!
  readonly provider_pid

  trap cleanup EXIT

  wait_for_healthy_provider

  if [[ -n "${PACT_BROKER_BASE_URL:-}" ]]; then
    run_broker_verification
    return
  fi

  run_local_verification
}

main "$@"
