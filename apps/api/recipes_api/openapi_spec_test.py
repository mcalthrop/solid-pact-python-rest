"""Tests for ``openapi_spec`` (load ``info`` from YAML)."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from recipes_api.openapi_spec import load_openapi_info


@patch("recipes_api.openapi_spec.yaml.safe_load")
def test_load_openapi_info_returns_info_from_yaml(mock_safe_load: MagicMock, tmp_path: Path) -> None:
    mock_safe_load.return_value = {
        "info": {
            "title": "Bread Recipes API",
            "version": "0.1.0",
            "description": "REST API for browsing bread recipes (list overview and full detail).",
        }
    }
    path = tmp_path / "spec.yaml"
    path.write_text("ignored: true\n", encoding="utf-8")
    info = load_openapi_info(path)
    assert info == {
        "title": "Bread Recipes API",
        "version": "0.1.0",
        "description": "REST API for browsing bread recipes (list overview and full detail).",
    }
    mock_safe_load.assert_called_once()


def test_load_openapi_info_missing_file_raises() -> None:
    path = MagicMock(spec=Path)
    path.is_file.return_value = False
    with pytest.raises(FileNotFoundError, match="OpenAPI spec not found"):
        load_openapi_info(path)
