"""HTTP routes for liveness (not part of the recipe OpenAPI contract)."""

from typing import TypedDict

from fastapi import APIRouter


class HealthPayload(TypedDict):
    """Response body for the health check."""

    status: str


health_router = APIRouter(tags=["Health"])


@health_router.get("/health")
def health() -> HealthPayload:
    """Liveness endpoint for local development and process managers."""
    return {"status": "ok"}
