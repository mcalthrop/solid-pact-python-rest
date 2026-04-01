"""HTTP routes for recipes (aligned with ``packages/openapi/openapi.yaml``)."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Path
from fastapi.responses import JSONResponse

from recipes_api.models import RecipeSummary
from recipes_api.repository import RecipeRepository, StaticRecipeRepository

_repository = StaticRecipeRepository()


def get_recipe_repository() -> RecipeRepository:
    return _repository


recipes_router = APIRouter(prefix="/recipes", tags=["Recipes"])


@recipes_router.get("", operation_id="listRecipes")
def list_recipes(
    repo: RecipeRepository = Depends(get_recipe_repository),
) -> list[RecipeSummary]:
    return repo.list_summaries()


@recipes_router.get(
    "/{recipe_id}",
    operation_id="getRecipeById",
    response_model=None,
)
def get_recipe_by_id(
    recipe_id: Annotated[str, Path(min_length=1)],
    repo: RecipeRepository = Depends(get_recipe_repository),
):
    detail = repo.get_detail(recipe_id)
    if detail is None:
        return JSONResponse(
            status_code=404,
            content={"message": "Recipe not found"},
        )
    return detail
