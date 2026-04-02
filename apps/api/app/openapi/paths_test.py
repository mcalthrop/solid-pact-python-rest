"""Tests for ``paths`` (OpenAPI spec file location)."""

from pathlib import Path
from unittest.mock import patch

from app.openapi import paths


def test_resolve_openapi_spec_path() -> None:
    with patch.object(
        paths,
        "__file__",
        "/workspace/apps/api/app/openapi/paths.py",
    ):
        resolved = paths.resolve_openapi_spec_path()
    assert resolved == Path("/workspace/packages/openapi/openapi.yaml")
