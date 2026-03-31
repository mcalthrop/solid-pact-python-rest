# Bread Recipes API (Python)

FastAPI ASGI service. Recipe HTTP handlers and tests land in later PLAN tasks; this package wires a minimal app for local development.

## Prerequisites

- Python **3.12** or newer
- A virtual environment (recommended)

## Setup

From `apps/api`:

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

## Run (development)

```bash
python -m uvicorn recipes_api.main:app --reload --host 127.0.0.1 --port 8000
```

Open `http://127.0.0.1:8000/docs` for interactive OpenAPI UI, or `GET /health` for a simple JSON response.

## Monorepo scripts

From the repository root, Turborepo delegates to this package’s `package.json` scripts (see root `README.md`).
