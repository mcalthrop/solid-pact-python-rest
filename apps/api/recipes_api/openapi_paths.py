"""Monorepo paths for OpenAPI artefacts."""

from pathlib import Path


def resolve_openapi_spec_path() -> Path:
    """Resolve the path to ``packages/openapi/openapi.yaml`` in the monorepo checkout."""
    # recipes_api/this file -> recipes_api -> apps/api -> apps -> repo root
    root = Path(__file__).resolve().parent.parent.parent.parent
    return root / "packages" / "openapi" / "openapi.yaml"
