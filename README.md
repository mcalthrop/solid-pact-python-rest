# solid-pact-python-rest

Monorepo for the bread recipes app (SolidJS, Python REST, OpenAPI, Pact).

This repository is **designed to be used with [Cursor](https://cursor.com)** (the VS Code–based editor with integrated AI).

Shared editor settings live under **`.vscode/`**, and Cursor-specific rules live under **`.cursor/`**.

You can work in other editors, but Cursor is the intended environment.

## OpenAPI contract

The REST API is defined in **`packages/openapi/openapi.yaml`** (shared by the Python API and the front end). Lint it with **[Redocly](https://redocly.com/docs/cli/)** from the repo root:

```bash
pnpm --filter @solid-pact/openapi run lint
```

The **Validate OpenAPI** workflow (`.github/workflows/validate-openapi.yml`) runs that command on pushes to `main` and on every pull request.

When you add or upgrade Node dependencies, run **`pnpm install`** with the **pnpm** version pinned in **`packageManager`** (via Corepack). Using a different pnpm release can rewrite **`pnpm-lock.yaml`** in an incompatible way (for example changing the lockfile format).

## Node.js

Use **[nvm](https://github.com/nvm-sh/nvm)** so your runtime matches CI. The repo pins **Node `24.14.0`** in both **`.nvmrc`** and the root **`package.json`** `engines.node` field.

From the repository root:

```bash
nvm install
```

If your shell does not switch versions automatically after `nvm install`, run `nvm use` so `node -v` prints `v24.14.0`.

With **`engine-strict=true`** in **`.npmrc`**, `pnpm` will not run unless the active Node version satisfies **`engines.node`**.

## Package manager

Use **pnpm** only. The root **`package.json`** declares:

- **`packageManager`**: `pnpm@10.18.1`
- **`engines.pnpm`**: `>=10.18.1`
- **`engines.npm`**: a non-semver reminder (`please-use-pnpm`) so mistaken `npm install` attempts are visibly wrong

**`package-manager-strict`** in **`.npmrc`** enforces the declared package manager.

```bash
pnpm install
```

Install pnpm via Corepack if needed:

```bash
corepack enable && corepack prepare pnpm@10.18.1 --activate
```

See [pnpm installation](https://pnpm.io/installation) for other options.

## Scripts (root delegates to workspaces)

All root **`package.json`** scripts delegate to **Turborepo**, which runs the matching script in each workspace (e.g. `apps/web`, `apps/api`). Run them from the repository root with **pnpm** only:

```bash
pnpm build
pnpm dev
pnpm lint
pnpm test
```

(`pnpm run <script>` is equivalent if you prefer the explicit form.)

To run a script in a single workspace, use **pnpm**’s filter (examples):

```bash
pnpm --filter web build
pnpm --filter api test
```

Or use Turborepo’s filter directly:

```bash
pnpm turbo build --filter=web
```
