"""Tests for ``repository`` (static JSON loader and bundled data)."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import pytest

from recipes_api.data_paths import resolve_recipes_json_path
from recipes_api.repository import StaticRecipeRepository


@pytest.fixture
def repo_path(tmp_path: Path) -> Path:
    recipes_json_payload: list[dict[str, Any]] = [
        {
            "id": "a",
            "title": "Title A",
            "summary": "Sum A",
            "imageUrl": "https://example.com/a-small.jpg",
            "imageUrlLarge": "https://example.com/a-large.jpg",
            "ingredients": ["flour", "water"],
            "steps": ["mix", "bake"],
        },
        {
            "id": "b",
            "title": "Title B",
            "summary": "Sum B",
            "imageUrl": "https://example.com/b-small.jpg",
            "imageUrlLarge": "https://example.com/b-large.jpg",
            "ingredients": ["salt"],
            "steps": ["rest"],
            "prepTimeMinutes": 5,
        },
    ]
    path = tmp_path / "recipes.json"
    path.write_text(json.dumps(recipes_json_payload), encoding="utf-8")
    return path


def test_list_summaries_order_matches_file(repo_path: Path) -> None:
    repo = StaticRecipeRepository(data_path=repo_path)
    summaries = repo.list_summaries()
    assert [summary["id"] for summary in summaries] == ["a", "b"]
    assert summaries[0] == {
        "id": "a",
        "title": "Title A",
        "summary": "Sum A",
        "imageUrl": "https://example.com/a-small.jpg",
    }


@pytest.mark.parametrize(
    ("recipe_id", "expected_title"),
    [
        ("a", "Title A"),
        ("b", "Title B"),
    ],
)
def test_get_detail_found(
    repo_path: Path,
    recipe_id: str,
    expected_title: str,
) -> None:
    repo = StaticRecipeRepository(data_path=repo_path)
    detail = repo.get_detail(recipe_id)
    assert detail is not None
    assert detail["title"] == expected_title
    assert detail["imageUrlLarge"].startswith("https://")


def test_get_detail_missing_returns_none(repo_path: Path) -> None:
    repo = StaticRecipeRepository(data_path=repo_path)
    assert repo.get_detail("unknown") is None


@pytest.mark.parametrize(
    "bad_payload",
    [
        '"not-an-array"',
        '[{"id": "only-id"}]',
    ],
)
def test_invalid_file_raises(tmp_path: Path, bad_payload: str) -> None:
    path = tmp_path / "bad.json"
    path.write_text(bad_payload, encoding="utf-8")
    with pytest.raises(ValueError):
        StaticRecipeRepository(data_path=path)


def test_duplicate_ids_raise(tmp_path: Path) -> None:
    recipes_with_duplicate_ids: list[dict[str, Any]] = [
        {
            "id": "x",
            "title": "T",
            "summary": "S",
            "imageUrl": "https://example.com/1.jpg",
            "imageUrlLarge": "https://example.com/2.jpg",
            "ingredients": list[str](),
            "steps": list[str](),
        },
        {
            "id": "x",
            "title": "T2",
            "summary": "S2",
            "imageUrl": "https://example.com/3.jpg",
            "imageUrlLarge": "https://example.com/4.jpg",
            "ingredients": list[str](),
            "steps": list[str](),
        },
    ]
    path = tmp_path / "duplicate-ids.json"
    path.write_text(json.dumps(recipes_with_duplicate_ids), encoding="utf-8")
    with pytest.raises(ValueError, match="duplicate recipe id"):
        StaticRecipeRepository(data_path=path)


def test_bundled_recipes_json_loads() -> None:
    """Packaged ``recipes.json`` loads (wheel/sdist layout)."""
    repo = StaticRecipeRepository(data_path=resolve_recipes_json_path())
    summaries = repo.list_summaries()
    ids = [summary["id"] for summary in summaries]
    assert "country-loaf" in ids
    assert "seeded-sourdough" in ids
    assert repo.get_detail("country-loaf") is not None
