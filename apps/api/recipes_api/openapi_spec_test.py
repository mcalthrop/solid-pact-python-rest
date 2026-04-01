"""Tests for ``openapi_spec`` (load ``info`` from committed YAML)."""

from __future__ import annotations

from pathlib import Path

import pytest

from recipes_api.openapi_spec import (
    default_openapi_spec_path,
    load_openapi_info,
    monorepo_root,
)


def test_monorepo_root_contains_packages_openapi() -> None:
    root = monorepo_root()
    assert (root / "packages" / "openapi" / "openapi.yaml").is_file()


def test_default_openapi_spec_path_exists() -> None:
    assert default_openapi_spec_path().is_file()


def test_load_openapi_info_matches_known_baseline() -> None:
    info = load_openapi_info()
    assert info == {
        "title": "Bread Recipes API",
        "version": "0.1.0",
        "description": "REST API for browsing bread recipes (list overview and full detail).",
    }


def test_load_openapi_info_missing_file_raises(tmp_path: Path) -> None:
    missing = tmp_path / "nope.yaml"
    with pytest.raises(FileNotFoundError, match="OpenAPI spec not found"):
        load_openapi_info(path=missing)
