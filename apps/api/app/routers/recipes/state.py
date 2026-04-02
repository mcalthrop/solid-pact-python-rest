"""Typed values attached to ``app.state`` for the recipes feature."""

from dataclasses import dataclass

from .repository import RecipeRepository


@dataclass(frozen=True, slots=True)
class RecipeAppState:
    """State wired in ``main`` lifespan; read via dependencies (see ``deps``)."""

    recipe_repository: RecipeRepository
