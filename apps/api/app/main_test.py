"""Smoke tests for the minimal ASGI app (``main``)."""

import importlib
from unittest.mock import patch

import app.main as main_module


def test_app_metadata_comes_from_load_openapi_info() -> None:
    fake = {
        "title": "Mock API",
        "version": "2.0.0",
        "description": "Loaded via mock",
    }
    with patch("app.openapi.spec.load_openapi_info", return_value=fake):
        importlib.reload(main_module)
        assert main_module.app.title == fake["title"]
        assert main_module.app.version == fake["version"]
        assert main_module.app.description == fake["description"]
    importlib.reload(main_module)
