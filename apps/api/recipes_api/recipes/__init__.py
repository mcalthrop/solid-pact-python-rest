"""Recipe HTTP routes and dependencies."""

from recipes_api.recipes.recipes_routes import get_recipe_repository, recipes_router

__all__ = ["get_recipe_repository", "recipes_router"]
