"""Smoke tests for the minimal ASGI app (``main``)."""

from fastapi.testclient import TestClient

from recipes_api.main import app
from recipes_api.openapi_spec import load_openapi_info

client = TestClient(app)


def test_health_returns_ok_status() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_app_metadata_matches_packages_openapi_yaml() -> None:
    expected = load_openapi_info()
    assert app.title == expected["title"]
    assert app.version == expected["version"]
    assert app.description == expected["description"]
