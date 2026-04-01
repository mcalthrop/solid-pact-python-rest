"""Load OpenAPI document metadata from a YAML spec file."""

from __future__ import annotations

from pathlib import Path
from typing import Any, TypedDict, cast

import yaml


class OpenApiInfo(TypedDict):
    """Subset of OpenAPI ``info`` used to configure FastAPI."""

    title: str
    version: str
    description: str


def load_openapi_info(path: Path) -> OpenApiInfo:
    """Read ``info.title``, ``info.version``, and ``info.description`` from the YAML spec."""
    if not path.is_file():
        msg = (
            f"OpenAPI spec not found at {path}. "
            "Run the API from the monorepo checkout so packages/openapi is available."
        )
        raise FileNotFoundError(msg)

    parsed = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(parsed, dict):
        raise ValueError("OpenAPI document root must be a mapping")
    root = cast(dict[str, Any], parsed)
    info_raw = root.get("info")
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
