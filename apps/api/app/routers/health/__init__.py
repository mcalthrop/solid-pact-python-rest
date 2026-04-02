"""Liveness router (not part of the recipe OpenAPI contract)."""

from .health_router import HealthPayload, health_router

__all__ = ["HealthPayload", "health_router"]
