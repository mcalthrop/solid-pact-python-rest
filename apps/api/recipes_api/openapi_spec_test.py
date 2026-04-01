"""Tests for ``openapi_spec`` (load ``info`` from YAML)."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest
from pydantic import ValidationError

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


@patch("recipes_api.openapi_spec.yaml.safe_load")
def test_load_openapi_info_ignores_extra_openapi_keys(mock_safe_load: MagicMock, tmp_path: Path) -> None:
    mock_safe_load.return_value = {
        "openapi": "3.1.0",
        "info": {
            "title": "T",
            "version": "1.0.0",
            "description": "D",
            "license": {"name": "MIT"},
        },
        "paths": {},
    }
    path = tmp_path / "spec.yaml"
    path.write_text("x", encoding="utf-8")
    assert load_openapi_info(path) == {
        "title": "T",
        "version": "1.0.0",
        "description": "D",
    }


@patch("recipes_api.openapi_spec.yaml.safe_load")
@pytest.mark.parametrize(
    "parsed",
    [
        None,
        [],
        {},
        {"openapi": "3.1.0"},
        {"info": {"title": "only title"}},
        {"info": {"title": "t", "version": "v", "description": 123}},
    ],
)
def test_load_openapi_info_invalid_document_raises_value_error(
    mock_safe_load: MagicMock,
    tmp_path: Path,
    parsed: object,
) -> None:
    mock_safe_load.return_value = parsed
    path = tmp_path / "spec.yaml"
    path.write_text("x", encoding="utf-8")
    with pytest.raises(ValueError, match="invalid or missing required info") as exc_info:
        load_openapi_info(path)
    assert isinstance(exc_info.value.__cause__, ValidationError)


def test_load_openapi_info_missing_file_raises() -> None:
    path = MagicMock(spec=Path)
    path.is_file.return_value = False
    with pytest.raises(FileNotFoundError, match="OpenAPI spec not found"):
        load_openapi_info(path)
