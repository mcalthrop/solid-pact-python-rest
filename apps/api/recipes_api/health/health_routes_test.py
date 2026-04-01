"""Tests for ``health`` routes."""

from fastapi import FastAPI
from fastapi.testclient import TestClient

from recipes_api.health import health_router


def test_health_returns_ok_status() -> None:
    app = FastAPI()
    app.include_router(health_router)
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}
