"""Smoke tests for the minimal ASGI app (``main``)."""

from fastapi.testclient import TestClient

from recipes_api.main import app

client = TestClient(app)


def test_health_returns_ok_status() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
