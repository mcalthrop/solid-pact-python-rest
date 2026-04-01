"""HTTP routes for recipes (aligned with ``packages/openapi/openapi.yaml``)."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Path, status
from pydantic import BaseModel, ConfigDict

from recipes_api.data_paths import resolve_recipes_json_path
from recipes_api.models import RecipeDetail, RecipeSummary
from recipes_api.recipes.exceptions import RecipeNotFoundError
from recipes_api.repository import RecipeRepository, StaticRecipeRepository

_repository = StaticRecipeRepository(data_path=resolve_recipes_json_path())


def get_recipe_repository() -> RecipeRepository:
    return _repository


class _ErrorMessageBody(BaseModel):
    """OpenAPI ``ErrorMessage`` shape for documented error responses."""

    model_config = ConfigDict(extra="forbid")

    message: str


recipes_router = APIRouter(prefix="/recipes", tags=["Recipes"])


@recipes_router.get("", operation_id="listRecipes")
def list_recipes(
    repo: RecipeRepository = Depends(get_recipe_repository),
) -> list[RecipeSummary]:
    return repo.list_summaries()


@recipes_router.get(
    "/{recipe_id}",
    operation_id="getRecipeById",
    response_model=RecipeDetail,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "Recipe does not exist",
            "model": _ErrorMessageBody,
        },
    },
)
def get_recipe_by_id(
    recipe_id: Annotated[str, Path(min_length=1)],
    repo: RecipeRepository = Depends(get_recipe_repository),
) -> RecipeDetail:
    detail = repo.get_detail(recipe_id)
    if detail is None:
        raise RecipeNotFoundError
    return detail
