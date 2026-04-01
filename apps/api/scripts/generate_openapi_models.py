#!/usr/bin/env python3
"""Regenerate ``recipes_api/generated/openapi_models.py`` from ``packages/openapi/openapi.yaml``."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
OPENAPI_YAML = REPO_ROOT / "packages" / "openapi" / "openapi.yaml"
OUTPUT = REPO_ROOT / "apps" / "api" / "recipes_api" / "generated" / "openapi_models.py"


def _datamodel_codegen() -> str:
    next_to_python = Path(sys.executable).parent / "datamodel-codegen"
    if next_to_python.is_file():
        return str(next_to_python)
    found = shutil.which("datamodel-codegen")
    if found:
        return found
    print(
        "datamodel-codegen not found (install apps/api with dev extras: pip install -e '.[dev]').",
        file=sys.stderr,
    )
    sys.exit(1)


def main() -> None:
    if not OPENAPI_YAML.is_file():
        print(f"OpenAPI spec not found: {OPENAPI_YAML}", file=sys.stderr)
        sys.exit(1)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        _datamodel_codegen(),
        "--input",
        str(OPENAPI_YAML),
        "--input-file-type",
        "openapi",
        "--output",
        str(OUTPUT),
        "--output-model-type",
        "pydantic_v2.BaseModel",
        "--disable-timestamp",
        "--target-python-version",
        "3.12",
    ]
    subprocess.run(cmd, check=True)


if __name__ == "__main__":
    main()
