"""Tests for the recipes router."""

from __future__ import annotations

import json
from collections.abc import Iterator
from pathlib import Path
from typing import Any

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.routers.recipes import get_recipe_repository
from app.routers.recipes.repository import StaticRecipeRepository


@pytest.fixture
def client(tmp_path: Path) -> Iterator[TestClient]:
    recipes_json_payload: list[dict[str, Any]] = [
        {
            "id": "alpha",
            "title": "Alpha loaf",
            "summary": "Summary A",
            "imageUrl": "https://example.com/a-thumb.jpg",
            "imageUrlLarge": "https://example.com/a-large.jpg",
            "ingredients": ["flour", "water"],
            "steps": ["mix", "bake"],
            "prepTimeMinutes": 10,
        },
        {
            "id": "beta",
            "title": "Beta loaf",
            "summary": "Summary B",
            "imageUrl": "https://example.com/b-thumb.jpg",
            "imageUrlLarge": "https://example.com/b-large.jpg",
            "ingredients": ["salt"],
            "steps": ["rest"],
        },
    ]
    path = tmp_path / "recipes.json"
    path.write_text(json.dumps(recipes_json_payload), encoding="utf-8")
    repo = StaticRecipeRepository(data_path=path)

    app.dependency_overrides[get_recipe_repository] = lambda: repo
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


def test_list_recipes_returns_summaries_in_file_order(client: TestClient) -> None:
    response = client.get("/recipes")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": "alpha",
            "title": "Alpha loaf",
            "summary": "Summary A",
            "imageUrl": "https://example.com/a-thumb.jpg",
        },
        {
            "id": "beta",
            "title": "Beta loaf",
            "summary": "Summary B",
            "imageUrl": "https://example.com/b-thumb.jpg",
        },
    ]


def test_get_recipe_returns_detail(client: TestClient) -> None:
    response = client.get("/recipes/alpha")
    assert response.status_code == 200
    body = response.json()
    assert body["id"] == "alpha"
    assert body["title"] == "Alpha loaf"
    assert body["summary"] == "Summary A"
    assert body["imageUrl"] == "https://example.com/a-thumb.jpg"
    assert body["imageUrlLarge"] == "https://example.com/a-large.jpg"
    assert body["ingredients"] == ["flour", "water"]
    assert body["steps"] == ["mix", "bake"]
    assert body["prepTimeMinutes"] == 10
    assert "bakeTimeMinutes" not in body


def test_get_recipe_not_found_returns_error_message_shape(client: TestClient) -> None:
    response = client.get("/recipes/unknown")
    assert response.status_code == 404
    assert response.json() == {"message": "Recipe not found"}


def test_bundled_recipes_list_matches_repository() -> None:
    """Integration check against packaged ``recipes.json`` (default dependency)."""
    with TestClient(app) as integration_client:
        r = integration_client.get("/recipes")
    assert r.status_code == 200
    ids = [item["id"] for item in r.json()]
    assert ids == ["country-loaf", "seeded-sourdough"]
