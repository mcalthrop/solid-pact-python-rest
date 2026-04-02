"""FastAPI dependencies for recipe routes."""

from typing import cast

from fastapi import Request

from .repository import RecipeRepository
from .state import RecipeAppState


def get_recipe_repository(request: Request) -> RecipeRepository:
    """Return the configured repository (wired in ``main`` lifespan)."""
    # ``starlette.datastructures.State`` attributes are typed as ``Any``; narrow once.
    recipe_state = cast(RecipeAppState, request.app.state.recipe_state)
    return recipe_state.recipe_repository
