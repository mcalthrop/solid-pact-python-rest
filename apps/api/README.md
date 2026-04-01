# Bread Recipes API (Python)

FastAPI ASGI service: **`GET /health`**, **`GET /recipes`**, and **`GET /recipes/{recipe_id}`**; further PLAN work covers coverage and tooling.

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

## Run (development)

```bash
pnpm dev
```

(or **`.venv/bin/python -m uvicorn recipes_api.main:app --reload --host 127.0.0.1 --port 8000`**)

Open `http://127.0.0.1:8000/docs` for interactive OpenAPI UI, or `GET /health` for a simple JSON response.

## OpenAPI → Pydantic (generated)

**`recipes_api/generated/openapi_models.py`** is produced from **`packages/openapi/openapi.yaml`** using **`datamodel-code-generator`**. After you change the spec, regenerate and commit the output (from the repository root):

```bash
pnpm openapi:generate
pnpm openapi:validate
```

**`pnpm openapi:generate`** runs **`.venv/bin/python -m recipes_api.openapi_codegen`** (after **`pnpm install`**, which creates **`apps/api/.venv`** via **`postinstall`**). **`datamodel-code-generator`** is a normal dependency in **`pyproject.toml`**.

CI runs **`pnpm openapi:validate`** after **`pnpm openapi:generate`** (see `.github/workflows/ci.yml`). Runtime handlers continue to use **`TypedDict`** types in **`models.py`**; the generated Pydantic models are the checked mirror of the spec.

## Data layer

Recipe payloads match **`packages/openapi/openapi.yaml`**. The **`RecipeRepository`** protocol and **`StaticRecipeRepository`** implementation live under **`recipes_api/`**; static content is **`apps/api/data/recipes.json`** (a JSON array of full recipe objects). HTTP handlers use **`RecipeRepository`** for **`GET /recipes`** and **`GET /recipes/{recipe_id}`**; swapping to a database or CMS means providing another implementation without changing route signatures.

## Monorepo scripts

From the repository root, Turborepo delegates to this package’s `package.json` scripts (see root `README.md`).

## IDE / type checking

After **`pip install -e ".[dev]"`**, point your editor at this virtual environment so imports such as **`recipes_api`** resolve and Pyright/basedpyright match **`pyrightconfig.json`**. **`recipes_api/py.typed`** marks the package for typing tools.

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

**Why this path:** analysis runs with `sys.path` set for that interpreter; the editable install of **`recipes-api`** is only guaranteed for the venv you created with **`pip install -e ".[dev]"`**.
