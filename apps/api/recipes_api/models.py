"""Payload shapes aligned with ``packages/openapi/openapi.yaml`` (RecipeSummary, RecipeDetail)."""

from typing import NotRequired, TypedDict


class RecipeSummary(TypedDict):
    """Overview for the recipe list (``GET /recipes``)."""

    id: str
    title: str
    summary: str
    imageUrl: str


class RecipeDetail(TypedDict):
    """Full recipe (``GET /recipes/{recipe_id}``)."""

    id: str
    title: str
    summary: str
    imageUrl: str
    imageUrlLarge: str
    ingredients: list[str]
    steps: list[str]
    prepTimeMinutes: NotRequired[int]
    bakeTimeMinutes: NotRequired[int]


def recipe_summary_from_detail(detail: RecipeDetail) -> RecipeSummary:
    """Derive a list card payload from a full recipe."""
    return {
        "id": detail["id"],
        "title": detail["title"],
        "summary": detail["summary"],
        "imageUrl": detail["imageUrl"],
    }
