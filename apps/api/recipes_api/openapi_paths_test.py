"""Tests for ``openapi_paths``."""

from pathlib import Path
from unittest.mock import patch

from recipes_api import openapi_paths


def test_resolve_openapi_spec_path() -> None:
    with patch.object(
        openapi_paths,
        "__file__",
        "/workspace/apps/api/recipes_api/openapi_paths.py",
    ):
        resolved = openapi_paths.resolve_openapi_spec_path()
    assert resolved == Path("/workspace/packages/openapi/openapi.yaml")
