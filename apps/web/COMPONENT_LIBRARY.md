# Component library (PLAN §4.5)

## Decision: [shadcn-solid](https://shadcn-solid.com/)

We standardise on **shadcn-solid** — the SolidJS port of **[shadcn/ui](https://ui.shadcn.com/)**: copy-in components under **`src/components/ui/`**, **Tailwind CSS**, **class-variance-authority**, **`cn()`** (`clsx` + `tailwind-merge`), and the **registry CLI** to add or refresh blocks.

Implementation details (Kobalte, CVA, etc.) are whatever the **published registry** uses for each component; we do **not** pick a separate primitive stack as the product decision — **shadcn-solid** is the choice.

## Options considered (summary)

| Option | Notes |
| ------ | ----- |
| **shadcn-solid** | Same mental model as shadcn/ui: own the source, consistent variants, CLI adds components. |
| **Ad hoc Tailwind only** | Fast for one-offs; diverges from a shared design system. |
| **A full component npm package** | Version churn; less control than vendored registry files. |

## Tooling in this repo

- **Tailwind CSS v4** via **`@tailwindcss/vite`** (`vite.config.ts`).
- **`tailwindcss-animate`** (`@plugin` in `src/index.css`).
- **Path alias `@/`** for imports (aligned with [shadcn-solid manual install](https://shadcn-solid.com/docs/installation/manual)).
- **`src/lib/utils.ts`** — **`cn()`** helper as in the docs.

## Adding or updating UI

1. From **`apps/web`**, run **`pnpm dlx shadcn-solid@latest init`** once if **`components.json`** is missing (needs registry access).
2. Add components: **`pnpm dlx shadcn-solid@latest add <name>`** (e.g. **`button`**, **`card`**). Use **`--overwrite`** when refreshing an existing file.
3. Prefer **`@/`** imports; use **`./`** for same-folder modules where Biome allows (see project rules).

## Adoption so far

- **`src/components/ui/button.tsx`** — **shadcn-solid-style** `Button` + **`buttonVariants`** (see [Button](https://shadcn-solid.com/docs/components/button)). For router links, the docs recommend **`buttonVariants` on `<A>`** — used on **recipe detail** for “← All recipes” (`RecipePage`).
- Existing bread **CSS variables** in **`src/index.css`** remain the source of theme tokens; utility classes reference them where the default shadcn HSL tokens are not wired yet.
