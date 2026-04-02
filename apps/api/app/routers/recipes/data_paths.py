"""Paths to bundled recipe data (editable install vs wheel)."""

from pathlib import Path


def resolve_recipes_json_path() -> Path:
    """Return ``app/data/recipes.json`` (repo checkout or installed wheel).

    This module lives under ``app/routers/recipes/``; data stays at ``app/data/``.
    """
    app_pkg = Path(__file__).resolve().parent.parent.parent
    return app_pkg / "data" / "recipes.json"
