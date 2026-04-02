"""Monorepo paths for OpenAPI artefacts."""

from pathlib import Path


def resolve_openapi_spec_path() -> Path:
    """Resolve the path to ``packages/openapi/openapi.yaml`` in the monorepo checkout."""
    # .parent chain from this file: openapi/ → app/ → apps/api/ → apps/ → monorepo root (five times).
    root = Path(__file__).resolve().parent.parent.parent.parent.parent
    return root / "packages" / "openapi" / "openapi.yaml"
