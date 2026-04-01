"""Paths to bundled recipe data (editable install vs wheel)."""

from pathlib import Path


def resolve_recipes_json_path() -> Path:
    """Return ``apps/api/data/recipes.json`` in the repo; ``recipes_api/data/recipes.json`` in an installed wheel."""
    here = Path(__file__).resolve().parent
    peer = here.parent / "data" / "recipes.json"
    packaged = here / "data" / "recipes.json"
    if peer.is_file():
        return peer
    return packaged
