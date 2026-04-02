# Bread Recipes (web)

SolidJS + Vite + TypeScript app in the monorepo (`apps/web`). Linting and formatting use **[Biome](https://biomejs.dev/)** (not ESLint/Prettier). Tests use **[Vitest](https://vitest.dev/)** only (no Jest): **`vitest`**, **jsdom**, and **`@solidjs/testing-library`**.

## Prerequisites

Use the repo **`.nvmrc`** (Node **24.14.0**) and **pnpm** (**>=10.18.1**) as in the [root README](../../README.md).

## Install

From the **repository root**:

```bash
nvm use
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

## OpenAPI

Typed client generation for the UI is **PLAN §4.2**. Until then, **`openapi:generate`** / **`openapi:validate`** here are placeholders so Turborepo tasks stay aligned.
