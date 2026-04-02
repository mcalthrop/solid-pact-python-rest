"""Regenerate ``app/openapi/generated/openapi_models.py`` from ``packages/openapi/openapi.yaml``."""

import sys
from pathlib import Path

from datamodel_code_generator import (
    DataModelType,
    InputFileType,
    PythonVersion,
    generate,
)

from app.openapi.paths import resolve_openapi_spec_path

_PKG = Path(__file__).resolve().parent
_OUTPUT = _PKG / "generated" / "openapi_models.py"


def main() -> None:
    openapi_yaml = resolve_openapi_spec_path()
    if not openapi_yaml.is_file():
        print(f"OpenAPI spec not found: {openapi_yaml}", file=sys.stderr)
        sys.exit(1)
    _OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    generate(
        openapi_yaml,
        input_filename=openapi_yaml.name,
        input_file_type=InputFileType.OpenAPI,
        output=_OUTPUT,
        output_model_type=DataModelType.PydanticV2BaseModel,
        disable_timestamp=True,
        target_python_version=PythonVersion.PY_312,
    )


if __name__ == "__main__":  # pragma: no cover
    main()
