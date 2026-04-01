"""Load OpenAPI document metadata from the monorepo ``packages/openapi/openapi.yaml`` file."""

from __future__ import annotations

from pathlib import Path
from typing import Any, TypedDict, cast

import yaml


class OpenApiInfo(TypedDict):
    """Subset of OpenAPI ``info`` used to configure FastAPI."""

    title: str
    version: str
    description: str


def monorepo_root() -> Path:
    """Repository root (parent of ``apps/``, ``packages/``, …)."""
    # recipes_api/main.py -> recipes_api -> apps/api -> apps -> repo root
    return Path(__file__).resolve().parent.parent.parent.parent


def default_openapi_spec_path() -> Path:
    """Path to the canonical OpenAPI YAML checked into the monorepo."""
    return monorepo_root() / "packages" / "openapi" / "openapi.yaml"


def load_openapi_info(path: Path | None = None) -> OpenApiInfo:
    """Read ``info.title``, ``info.version``, and ``info.description`` from the YAML spec."""
    spec_path = path if path is not None else default_openapi_spec_path()
    if not spec_path.is_file():
        msg = (
            f"OpenAPI spec not found at {spec_path}. "
            "Run the API from the monorepo checkout so packages/openapi is available."
        )
        raise FileNotFoundError(msg)

    raw: object = yaml.safe_load(spec_path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        raise ValueError("OpenAPI document root must be a mapping")
    document = cast(dict[str, Any], raw)
    info_raw = document.get("info")
    if not isinstance(info_raw, dict):
        raise ValueError("OpenAPI document must contain an info object")
    info = cast(dict[str, Any], info_raw)

    title = info.get("title")
    version = info.get("version")
    description = info.get("description")
    if not isinstance(title, str) or not isinstance(version, str) or not isinstance(
        description,
        str,
    ):
        raise ValueError(
            "OpenAPI info.title, info.version, and info.description must be strings",
        )

    return OpenApiInfo(title=title, version=version, description=description)
