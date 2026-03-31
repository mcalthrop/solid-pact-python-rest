"""Recipe data access: protocol + static file implementation."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Protocol, cast, runtime_checkable

from recipes_api.models import RecipeDetail, RecipeSummary, recipe_summary_from_detail

_REQUIRED_DETAIL_KEYS = frozenset(
    {
        "id",
        "title",
        "summary",
        "imageUrl",
        "imageUrlLarge",
        "ingredients",
        "steps",
    }
)


@runtime_checkable
class RecipeRepository(Protocol):
    """Contract for listing and fetching recipes (DB/CMS can implement this later)."""

    def list_summaries(self) -> list[RecipeSummary]:
        """Return every recipe overview, stable order (JSON array order)."""
        ...

    def get_detail(self, recipe_id: str) -> RecipeDetail | None:
        """Return the full recipe or ``None`` if unknown."""
        ...


class StaticRecipeRepository:
    """Load recipes from a JSON file committed with the package."""

    def __init__(self, data_path: Path | None = None) -> None:
        self._path = data_path or (Path(__file__).resolve().parent / "data" / "recipes.json")
        self._by_id: dict[str, RecipeDetail] = {}
        self._order: list[str] = []
        self._load()

    def _load(self) -> None:
        raw = self._path.read_text(encoding="utf-8")
        decoded: Any = json.loads(raw)
        if not isinstance(decoded, list):
            raise ValueError("recipes.json must contain a JSON array")
        records: list[Any] = cast(list[Any], decoded)
        for index, raw_item in enumerate(records):
            if not isinstance(raw_item, dict):
                raise ValueError(f"recipes.json[{index}] must be an object")
            row: dict[str, Any] = cast(dict[str, Any], raw_item)
            missing = _REQUIRED_DETAIL_KEYS - row.keys()
            if missing:
                raise ValueError(f"recipes.json[{index}] missing keys: {sorted(missing)}")
            ingredients_raw = row["ingredients"]
            steps_raw = row["steps"]
            if not isinstance(ingredients_raw, list) or not isinstance(steps_raw, list):
                raise ValueError(
                    f"recipes.json[{index}] ingredients and steps must be arrays",
                )
            ingredients_list: list[Any] = cast(list[Any], ingredients_raw)
            steps_list: list[Any] = cast(list[Any], steps_raw)
            detail: RecipeDetail = {
                "id": str(row["id"]),
                "title": str(row["title"]),
                "summary": str(row["summary"]),
                "imageUrl": str(row["imageUrl"]),
                "imageUrlLarge": str(row["imageUrlLarge"]),
                "ingredients": [str(line) for line in ingredients_list],
                "steps": [str(line) for line in steps_list],
            }
            if "prepTimeMinutes" in row and row["prepTimeMinutes"] is not None:
                detail["prepTimeMinutes"] = int(row["prepTimeMinutes"])
            if "bakeTimeMinutes" in row and row["bakeTimeMinutes"] is not None:
                detail["bakeTimeMinutes"] = int(row["bakeTimeMinutes"])
            recipe_id = detail["id"]
            if recipe_id in self._by_id:
                raise ValueError(f"duplicate recipe id: {recipe_id!r}")
            self._by_id[recipe_id] = detail
            self._order.append(recipe_id)

    def list_summaries(self) -> list[RecipeSummary]:
        return [
            recipe_summary_from_detail(self._by_id[recipe_id])
            for recipe_id in self._order
        ]

    def get_detail(self, recipe_id: str) -> RecipeDetail | None:
        return self._by_id.get(recipe_id)
