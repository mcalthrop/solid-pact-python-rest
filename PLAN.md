# Plan

Tasks and subtasks for building the bread-recipes app (SolidJS + Python REST + OpenAPI + Pact + Turborepo). Each subtask is sized for a single, reviewable PR. Mark items with `[x]` when done.

## 1. Monorepo foundation

- [x] **1.1** Initialise Turborepo with pnpm workspaces; root `package.json`, `turbo.json`, and workspace layout (e.g. `apps/web`, `apps/api`, `packages/` as needed).
- [x] **1.2** Pin Node: `.nvmrc`, `engines` in root `package.json`, and a short note in the root README on required Node version.
- [x] **1.3** Root-level scripts that delegate to packages; ensure `pnpm` is the only package manager documented.

## 2. OpenAPI as single source of truth

- [x] **2.1** Author the OpenAPI spec for recipes (list + detail, shared schemas for overview vs full recipe, image URLs).
- [x] **2.2** Store the spec in a shared location (e.g. `packages/openapi` or `openapi/`) and add CI validation (lint/validate the spec on every PR).

## 3. Python REST API

- [x] **3.1** Create the Python project layout, dependency files, and a minimal ASGI app (e.g. FastAPI) wired for local dev.
- [x] **3.2** Implement a data-access abstraction and a static implementation (files under repo) so swapping to DB/CMS later does not reshape route handlers.
- [x] **3.3** Wire FastAPI/OpenAPI **`info`** (title, version, description) from **`packages/openapi/openapi.yaml`** so the running app matches the committed spec and those values are not duplicated in code (e.g. `main.py`).
- [x] **3.4** Implement REST handlers to match the OpenAPI spec (response shapes and status codes); keep behaviour aligned with the spec.
- [x] **3.5** Generate Pydantic models from **`packages/openapi/openapi.yaml`** (e.g. **datamodel-code-generator**), commit generated output, and add CI that fails when the spec changes without regenerating (drift check).
- [x] **3.6** Tests with 100% coverage and a coverage gate in CI for the API package; add `README.md` for install, run, and test commands.
- [x] **3.7** Select and configure a Python import-ordering tool (PEP 8–aligned; e.g. **Ruff**’s isort rules or **isort**), apply it across **`apps/api`**, and document how to run it (CI enforcement can align with §3.6 / §6.1).

## 4. SolidJS front end

- [x] **4.1** Scaffold SolidJS + Vite + TypeScript in `apps/web`; **Biome** (lint + format + import organise); Vitest configured; exact dependency versions only; `README.md` for the app.
- [ ] **4.2** Generate or synchronise typed API usage from the OpenAPI spec (client/types) so API calls stay strictly typed.
- [ ] **4.3** App shell: router, layout, and global styles (clean, minimalist, bread-appropriate palette, responsive).
- [ ] **4.4** Home page: fetch and list bread recipes with overview + thumbnail; navigate to detail on click.
- [ ] **4.5** Recipe page: full recipe content and larger image; deep-linkable route (e.g. by id).
- [ ] **4.6** MSW for tests; knip configured; Vitest coverage at 100% with a CI gate.

## 5. Contract testing (Pact)

- [ ] **5.1** Consumer: add Pact tests for the API usage the UI relies on; publish pacts (targeting your broker URL via secrets in CI).
- [ ] **5.2** Provider: verify the Python API against published pacts in CI; fail the build on verification failures.
- [ ] **5.3** Document self-hosted Pact Broker expectations (URL, auth, tags/branches) and wire GitHub Actions secrets accordingly.

## 6. CI/CD and local quality gates

- [ ] **6.1** GitHub Actions: enforce Node version; run lint, format checks, tests, and coverage for front end and API; optional Turborepo pipeline filters.
- [ ] **6.2** Husky: `pre-commit` and `pre-push` hooks running the same checks as CI (or a fast subset with clear docs).
- [ ] **6.3** Deployment workflows (staging/production or placeholders) consistent with how you intend to host the static site and API.

## 7. Root documentation

- [ ] **7.1** Root `README.md`: clone, prerequisites (Node via nvm, pnpm, Python version), monorepo commands, where the OpenAPI spec lives, and pointers to app/API READMEs.

---

**Maintenance:** As subtasks finish, tick them above. If scope shifts, add or split subtasks so each PR stays small and reviewable.
