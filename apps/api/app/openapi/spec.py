"""Load OpenAPI document metadata from a YAML spec file."""

from __future__ import annotations

from pathlib import Path
from typing import TypedDict

import yaml
from pydantic import BaseModel, ConfigDict, ValidationError


class OpenApiInfo(TypedDict):
    """Subset of OpenAPI ``info`` used to configure FastAPI."""

    title: str
    version: str
    description: str


class _OpenApiInfoBlock(BaseModel):
    """``info`` object: only the fields we need; other OpenAPI keys are ignored."""

    model_config = ConfigDict(extra="ignore")

    title: str
    version: str
    description: str


class _OpenApiRootForInfo(BaseModel):
    """Minimal root shape: must include ``info``; other top-level keys are ignored."""

    model_config = ConfigDict(extra="ignore")

    info: _OpenApiInfoBlock


def load_openapi_info(path: Path) -> OpenApiInfo:
    """Read ``info.title``, ``info.version``, and ``info.description`` from the YAML spec."""
    if not path.is_file():
        msg = (
            f"OpenAPI spec not found at {path}. "
            "Run the API from the monorepo checkout so packages/openapi is available."
        )
        raise FileNotFoundError(msg)

    parsed = yaml.safe_load(path.read_text(encoding="utf-8"))
    try:
        root = _OpenApiRootForInfo.model_validate(parsed)
    except ValidationError as exc:
        raise ValueError("OpenAPI document is invalid or missing required info fields") from exc

    return OpenApiInfo(
        title=root.info.title,
        version=root.info.version,
        description=root.info.description,
    )
