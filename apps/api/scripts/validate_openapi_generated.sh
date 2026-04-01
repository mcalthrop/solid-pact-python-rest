#!/usr/bin/env bash
# Fail if recipes_api/generated does not match the working tree (run from repo root via git).
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${ROOT}" ]]; then
  echo "validate_openapi_generated.sh: not inside a git repository" >&2
  exit 1
fi
cd "${ROOT}"

GENERATED_PATH="apps/api/recipes_api/generated"
git diff --exit-code -- "${GENERATED_PATH}"
if [[ -n "$(git status --porcelain -- "${GENERATED_PATH}")" ]]; then
  echo "Untracked or uncommitted changes under ${GENERATED_PATH}. Regenerate and commit." >&2
  git status --porcelain -- "${GENERATED_PATH}"
  exit 1
fi
