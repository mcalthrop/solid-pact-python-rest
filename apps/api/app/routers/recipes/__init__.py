"""Recipe HTTP routes (OpenAPI contract) and dependencies."""

from .deps import get_recipe_repository
from .recipes_router import recipes_router

__all__ = ["get_recipe_repository", "recipes_router"]
