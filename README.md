# solid-pact-python-rest

Monorepo for the bread recipes app (SolidJS, Python REST, OpenAPI, Pact).

## Package manager

Use **pnpm** only. Do not use `npm install` or `yarn`; this repository sets `packageManager` in the root `package.json` and `package-manager-strict` in `.npmrc`.

```bash
pnpm install
```

Install pnpm globally if needed: `corepack enable && corepack prepare pnpm@9.15.9 --activate` (or see [pnpm installation](https://pnpm.io/installation)).

## Scripts

Run from the repository root:

- `pnpm run build` — build all packages via Turborepo
- `pnpm run dev` — dev tasks (placeholders until apps are implemented)
- `pnpm run lint` — lint all packages
- `pnpm run test` — test all packages
