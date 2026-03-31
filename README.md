# solid-pact-python-rest

Monorepo for the bread recipes app (SolidJS, Python REST, OpenAPI, Pact).

## Node.js

Use **[nvm](https://github.com/nvm-sh/nvm)** so everyone runs the same major version as CI. The repo pins a release line in **`.nvmrc`**; install it once, then select it in each shell:

```bash
nvm install
nvm use
```

The minimum supported version is declared under **`engines`** in the root **`package.json`**. With **`engine-strict=true`** in **`.npmrc`**, `pnpm` will refuse to run if your Node version is older than that minimum. Newer Node releases (for example the current LTS) are fine; use **`.nvmrc`** when you want the same patch release as everyone else.

## Package manager

Use **pnpm** only. Do not use `npm install` or `yarn`; this repository sets `packageManager` in the root `package.json` and `package-manager-strict` in `.npmrc`.

```bash
pnpm install
```

Install pnpm via Corepack if needed:

```bash
corepack enable && corepack prepare pnpm@9.15.9 --activate
```

See [pnpm installation](https://pnpm.io/installation) for other options.

## Scripts (root delegates to workspaces)

All root **`package.json`** scripts delegate to **Turborepo**, which runs the matching script in each workspace (e.g. `apps/web`, `apps/api`). Run them from the repository root with **pnpm** only:

```bash
pnpm run build
pnpm run dev
pnpm run lint
pnpm run test
```

To run a script in a single workspace, use **pnpm**’s filter (examples):

```bash
pnpm --filter web run build
pnpm --filter api run test
```

Or use Turborepo’s filter directly:

```bash
pnpm exec turbo run build --filter=web
```
