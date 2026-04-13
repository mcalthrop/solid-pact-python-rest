#!/usr/bin/env bash

set -euo pipefail

package_root="$(dirname "${0}")/.."
readonly package_root
readonly repo_root="${package_root}/../.."

get_branch() {
  if [[ -n "${PACT_CONSUMER_BRANCH:-}" ]]; then
    echo "${PACT_CONSUMER_BRANCH}"
    return
  fi

  if [[ -n "${GITHUB_HEAD_REF:-}" ]]; then
    echo "${GITHUB_HEAD_REF}"
    return
  fi

  if [[ -n "${GITHUB_REF_NAME:-}" ]]; then
    echo "${GITHUB_REF_NAME}"
    return
  fi

  git -C "${repo_root}" branch --show-current
}

get_version() {
  if [[ -n "${PACT_CONSUMER_VERSION:-}" ]]; then
    echo "${PACT_CONSUMER_VERSION}"
    return
  fi

  if [[ -n "${GITHUB_SHA:-}" ]]; then
    echo "${GITHUB_SHA}"
    return
  fi

  git -C "${repo_root}" rev-parse HEAD
}

main() {
  local broker_url
  local branch
  local version

  broker_url="${PACT_BROKER_BASE_URL:?Missing required environment variable: PACT_BROKER_BASE_URL}"
  branch="$(get_branch)"
  version="$(get_version)"

  cd "${package_root}"

  ./node_modules/.bin/pact-broker publish \
    "${package_root}/pacts" \
    "--consumer-app-version=${version}" \
    "--branch=${branch}" \
    "--broker-base-url=${broker_url}"
}

main "$@"
