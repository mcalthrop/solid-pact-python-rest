"""ASGI application entrypoint."""

from typing import TypedDict

from fastapi import FastAPI


class HealthPayload(TypedDict):
    """Response body for the health check."""

    status: str


app = FastAPI(
    title="Bread Recipes API",
    version="0.1.0",
    description="REST API for browsing bread recipes (list overview and full detail).",
)


@app.get("/health")
def health() -> HealthPayload:
    """Liveness endpoint for local development and process managers."""
    return {"status": "ok"}
