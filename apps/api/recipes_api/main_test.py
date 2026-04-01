"""Smoke tests for the minimal ASGI app (``main``)."""

import importlib
from unittest.mock import patch

from fastapi.testclient import TestClient

import recipes_api.main as main_module


def test_health_returns_ok_status() -> None:
    client = TestClient(main_module.app)
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_app_metadata_comes_from_load_openapi_info() -> None:
    fake = {
        "title": "Mock API",
        "version": "2.0.0",
        "description": "Loaded via mock",
    }
    with patch("recipes_api.openapi_spec.load_openapi_info", return_value=fake):
        importlib.reload(main_module)
        assert main_module.app.title == fake["title"]
        assert main_module.app.version == fake["version"]
        assert main_module.app.description == fake["description"]
    importlib.reload(main_module)
