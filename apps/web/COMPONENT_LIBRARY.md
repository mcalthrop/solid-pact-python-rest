# Component library (PLAN §4.5 / §4.7)

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

If the registry is unreachable, add components by porting the [shadcn/ui](https://ui.shadcn.com/) (React) registry output to Solid primitives, matching existing files in **`src/components/ui/`** (same **`cn()`**, CVA, and bread theme tokens **`var(--*)`** from **`src/index.css`**).

## Adoption (§4.7 complete)

| Component | Role |
| --------- | ---- |
| **`button.tsx`** | **`Button`**, **`buttonVariants`** — links use **`buttonVariants` on `<A>`** (e.g. recipe detail “← All recipes”). |
| **`card.tsx`** | **`Card`**, **`CardHeader`**, **`CardTitle`**, **`CardDescription`**, **`CardContent`**, **`CardFooter`** — home recipe **cards**, recipe **hero** image, **ingredients** / **steps** panels. |
| **`alert.tsx`** | **`Alert`**, **`AlertDescription`** — API **error** states on home and recipe pages. |
| **`skeleton.tsx`** | **`Skeleton`** — **loading** placeholders (lists and detail). |
| **`separator.tsx`** | **`Separator`** — between **ingredients** and **steps** on the recipe detail view. |
| **`typography.tsx`** | **`SiteTitle`**, **`Heading2`**, **`Heading3Panel`**, **`RecipeCardTitle`**, **`TextLede`**, **`TextMuted`**, **`RecipeTimes`**, etc. — shared **type scales** and **meta** text so screens do not repeat long class strings. |
| **`cover-image.tsx`** | **`CoverImage`** — framed **thumbnail / hero** images (aspect ratio and **`object-cover`** on the frame). |
| **`loading-region.tsx`** | **`LoadingRegion`** — **`role="status"`**, **`aria-busy`**, and **skeleton** spacing for list/detail loading. |
| **`layout/shell.tsx`** | **`Shell`**, **`ShellHeader`**, **`ShellMain`**, **`ShellFooter`**, **`SiteBrand`**, **`ShellFooterNote`** — **app chrome** structure. |
| **`layout/PageBackLink.tsx`** | **`PageBackLink`** — back navigation row using **`buttonVariants`**. |
| **`recipe-detail/RecipeDetailPanel.tsx`** | **`RecipeDetailPanel`** — shared **card + panel heading** for **ingredients** and **steps**. |
| **`RecipeList.tsx`** | **`RecipeList`** — home **recipe grid** (`<ul>`). |

Layout (**`AppShell`**) composes **`layout/shell`** primitives; page copy uses **`typography`** and recipe-specific building blocks above. Legacy **`AppShell.css`** / **`Page.css`** are removed.

## Theme tokens

Physical palette and fonts live on **`:root`** in **`src/index.css`** (e.g. **`--accent`**, **`--border`**, **`--heading`**). A Tailwind v4 **`@theme { ... }`** block **maps** those to semantic utilities so components use names like **`text-foreground`**, **`text-heading`**, **`border-border`**, **`bg-card`**, **`text-primary`**, **`font-heading`**, **`shadow-bread`**, **`bg-header`**, **`bg-footer`**, **`bg-accent-subtle`**, **`border-accent-border`**, etc. Light/dark behaviour is unchanged: **`prefers-color-scheme`** still swaps the **`:root`** values; the **`@theme`** aliases follow automatically.
