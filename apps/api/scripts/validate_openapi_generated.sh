#!/usr/bin/env bash
# Fail if recipes_api/generated does not match the working tree (run from repo root via git).
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || :)"
if [[ -z "${ROOT}" ]]; then
  echo "validate_openapi_generated.sh: not inside a git repository" >&2
  exit 1
fi
cd "${ROOT}"

GENERATED_PATH="apps/api/recipes_api/generated"
git diff --exit-code -- "${GENERATED_PATH}"
PORCELAIN_CHANGES=$(git status --porcelain -- "${GENERATED_PATH}")
if [[ -n "${PORCELAIN_CHANGES}" ]]; then
  echo "Untracked or uncommitted changes under ${GENERATED_PATH}. Regenerate and commit." >&2
  printf '%s\n' "${PORCELAIN_CHANGES}" >&2
  exit 1
fi
