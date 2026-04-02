"""Domain exceptions for recipe HTTP handling."""


class RecipeNotFoundError(Exception):
    """No recipe exists for the requested identifier."""
