# Bread Recipes (web)

SolidJS + Vite + TypeScript app in the monorepo (`apps/web`). Linting and formatting use **[Biome](https://biomejs.dev/)** (not ESLint/Prettier). Tests use **[Vitest](https://vitest.dev/)** only (no Jest): **`vitest`**, **jsdom**, and **`@solidjs/testing-library`**.

## Prerequisites

Use the repo **`.nvmrc`** (Node **24.14.0**) and **pnpm** (**>=10.18.1**) as in the [root README](../../README.md).

## Install

From the **repository root**:

```bash
nvm install
pnpm install
```

That links workspace dependencies and installs this package’s **`node_modules`**.

## Scripts

Run from **`apps/web`** (or via **`pnpm --filter web <script>`** from the root):

| Script            | Purpose                                      |
| ----------------- | -------------------------------------------- |
| **`pnpm dev`**    | Vite dev server                              |
| **`pnpm build`**  | `tsc -b` then production build to **`dist`** |
| **`pnpm preview`**| Preview production build                     |
| **`pnpm lint`**   | Biome check (lint + format + import organise) |
| **`pnpm lint:fix`**| Biome with **`--write`** (fix + format)     |
| **`pnpm test`**   | Vitest once (`vitest run`)                   |
| **`pnpm test:watch`** | Vitest watch                             |

Configuration: **`biome.json`** (Biome **2.4.x**), **`vite.config.ts`** (includes Vitest), **`tsconfig.*.json`**.

## OpenAPI client

The UI uses a **full fetch-based client** generated from **`../../packages/openapi/openapi.yaml`** via [**`@hey-api/openapi-ts`**](https://github.com/hey-api/openapi-ts). Generated output lives under **`src/api/generated/`** (do not edit by hand; regenerate after spec changes).

| Script                 | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| **`pnpm openapi:generate`** | Regenerate the client from the spec (`openapi-ts.config.ts`).      |
| **`pnpm openapi:validate`** | Runs **`redocly lint`** on **`packages/openapi/openapi.yaml`** via **`@solid-pact/openapi`** (same as **`pnpm --filter @solid-pact/openapi run lint`**). |

Import the wrapped SDK from **`src/api/index.ts`** (e.g. **`listRecipes`**, **`getRecipeById`**, **`apiClient`**, and schema types). By default, **`VITE_API_BASE_URL`** is unset in production builds (same-origin requests). In **`pnpm dev`**, the client targets **`http://127.0.0.1:8000`** unless you set **`VITE_API_BASE_URL`**. See **`.env.example`**.
