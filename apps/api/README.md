# Bread Recipes API (Python)

FastAPI ASGI service: **`GET /health`**, **`GET /recipes`**, and **`GET /recipes/{recipe_id}`**.

### Package layout

- **`app/routers/`** — FastAPI **`APIRouter`** trees: **`health/`** (liveness) and **`recipes/`** (OpenAPI contract).
- **`app/`** (elsewhere) — app entry (**`main.py`**), **`models`**, etc.; recipe persistence lives under **`app/routers/recipes/`** (**`repository.py`**).
- **`app/openapi/`** — spec path resolution, **`info`** loading, **`codegen`** entrypoint, and generated Pydantic models (**`generated/openapi_models.py`**).

## Prerequisites

- Python **3.12** or newer
- A virtual environment (recommended)

## Setup

From the **repository root**, **`pnpm install`** runs this package’s **`postinstall`**: create **`apps/api/.venv`** if it is missing, then **`pip install -e .`** inside it so **`datamodel-code-generator`** and the rest of the core dependencies are available to **`pnpm openapi:generate`**.

For tests and optional dev tools, from **`apps/api`** with the venv activated:

```bash
source .venv/bin/activate
pip install -e ".[dev]"
```

Alternatively, create the venv and install everything in one go manually:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

## Testing

From **`apps/api`** with dev dependencies installed (**`pip install -e ".[dev]"`**):

```bash
pnpm test
```

This runs **`pytest`** with **line coverage** for the **`app`** package, **fails under 100%**, and **omits** generated **`app/openapi/generated/`** (codegen output). To run tests without coverage (faster iteration):

```bash
.venv/bin/python -m pytest --no-cov
```

Configuration lives in **`pyproject.toml`** (**`[tool.pytest.ini_options]`**, **`[tool.coverage.*]`**).

## Import order (Ruff / isort)

Imports are checked with **[Ruff](https://docs.astral.sh/ruff/)** using the **`I`** rules (PEP 8–style ordering compatible with **isort**). Configuration lives under **`[tool.ruff]`** in **`pyproject.toml`** (`known-first-party = ["app"]`; generated OpenAPI models under **`app/openapi/generated/`** are excluded).

Check (matches CI):

```bash
pnpm lint
```

Auto-fix import order:

```bash
pnpm lint:fix
```

## Run (development)

```bash
pnpm dev
```

(or **`.venv/bin/python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000`**)

Open `http://127.0.0.1:8000/docs` for interactive OpenAPI UI, or `GET /health` for a simple JSON response.

## OpenAPI → Pydantic (generated)

**`app/openapi/generated/openapi_models.py`** is produced from **`packages/openapi/openapi.yaml`** using **`datamodel-code-generator`**. After you change the spec, regenerate and commit the output (from the repository root):

```bash
pnpm openapi:generate
pnpm openapi:validate
```

**`pnpm openapi:generate`** runs **`.venv/bin/python -m app.openapi.codegen`** (after **`pnpm install`**, which creates **`apps/api/.venv`** via **`postinstall`**). **`datamodel-code-generator`** is a normal dependency in **`pyproject.toml`**.

CI runs **`pnpm openapi:validate`** after **`pnpm openapi:generate`** (see `.github/workflows/ci.yml`). Runtime handlers continue to use **`TypedDict`** types in **`models.py`**; the generated Pydantic models are the checked mirror of the spec.

## Data layer

Recipe payloads match **`packages/openapi/openapi.yaml`**. The **`RecipeRepository`** protocol and **`StaticRecipeRepository`** implementation live under **`app/routers/recipes/`** (routers depend on them via **`Depends`**); static content is **`app/data/recipes.json`** (a JSON array of full recipe objects). HTTP handlers use **`RecipeRepository`** for **`GET /recipes`** and **`GET /recipes/{recipe_id}`**; swapping to a database or CMS means providing another implementation without changing route signatures.

## Monorepo scripts

From the repository root, Turborepo delegates to this package’s `package.json` scripts (see root `README.md`).

## IDE / type checking

After **`pip install -e ".[dev]"`**, point your editor at this virtual environment so imports such as **`app`** resolve and Pyright/basedpyright match **`pyrightconfig.json`**. **`app/py.typed`** marks the package for typing tools.

### VS Code, Cursor, and similar forks

These editors use the **Python** extension (Cursor ships with equivalent behaviour). The interpreter must be the one inside **`apps/api/.venv`**, not a global **`python3`** on your `PATH`.

1. Create and fill the venv as in [Setup](#setup) above (so **`.venv`** exists under **`apps/api`**).
2. Open the **Command Palette**:
   - **macOS:** `Cmd` + `Shift` + `P`
   - **Windows / Linux:** `Ctrl` + `Shift` + `P`
3. Run **`Python: Select Interpreter`**.
4. Pick the interpreter for this workspace:
   - **If it appears in the list:** choose the entry whose path ends with **`apps/api/.venv/bin/python`**.
   - **If it does not:** choose **Enter interpreter path…**, then **Find…**, and browse to that same file.

5. Optionally click the Python version in the **status bar** (bottom right) to switch interpreters without opening the palette again.

If analysis still looks wrong, reload the window (**Developer: Reload Window** from the Command Palette) after changing the interpreter.

**Why this path:** analysis runs with `sys.path` set for that interpreter; the editable install of the **`recipes-api`** package (**`app`**) is only guaranteed for the venv you created with **`pip install -e ".[dev]"`**.
