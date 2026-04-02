#!/usr/bin/env bash
# Fail if app/openapi/generated does not match the working tree (run from repo root via git).
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || :)"
if [[ -z "${ROOT}" ]]; then
  echo "validate_openapi_generated.sh: not inside a git repository" >&2
  exit 1
fi
cd "${ROOT}"

GENERATED_PATH="apps/api/app/openapi/generated"
if ! git diff --quiet -- "${GENERATED_PATH}"; then
  echo "Generated OpenAPI files under ${GENERATED_PATH} are out of date." >&2
  echo "Please run 'pnpm openapi:generate' and commit the updated files." >&2
  git diff -- "${GENERATED_PATH}" >&2
  exit 1
fi

PORCELAIN_CHANGES=$(git status --porcelain -- "${GENERATED_PATH}") || exit $?
if [[ -n "${PORCELAIN_CHANGES}" ]]; then
  echo "Untracked or uncommitted changes under ${GENERATED_PATH}. Regenerate with 'pnpm openapi:generate' and commit." >&2
  printf '%s\n' "${PORCELAIN_CHANGES}" >&2
  exit 1
fi
