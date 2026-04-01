"""ASGI application entrypoint."""

from typing import TypedDict

from fastapi import FastAPI

from recipes_api.openapi_spec import load_openapi_info


class HealthPayload(TypedDict):
    """Response body for the health check."""

    status: str


_openapi_info = load_openapi_info()

app = FastAPI(
    title=_openapi_info["title"],
    version=_openapi_info["version"],
    description=_openapi_info["description"],
)


@app.get("/health")
def health() -> HealthPayload:
    """Liveness endpoint for local development and process managers."""
    return {"status": "ok"}
