"""Regenerate ``recipes_api/generated/openapi_models.py`` from ``packages/openapi/openapi.yaml``."""

import sys
from pathlib import Path

from datamodel_code_generator import (
    DataModelType,
    InputFileType,
    PythonVersion,
    generate,
)
from recipes_api.openapi_paths import resolve_openapi_spec_path

_RECIPES_PKG = Path(__file__).resolve().parent
OUTPUT = _RECIPES_PKG / "generated" / "openapi_models.py"


def main() -> None:
    openapi_yaml = resolve_openapi_spec_path()
    if not openapi_yaml.is_file():
        print(f"OpenAPI spec not found: {openapi_yaml}", file=sys.stderr)
        sys.exit(1)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    generate(
        openapi_yaml,
        input_filename=openapi_yaml.name,
        input_file_type=InputFileType.OpenAPI,
        output=OUTPUT,
        output_model_type=DataModelType.PydanticV2BaseModel,
        disable_timestamp=True,
        target_python_version=PythonVersion.PY_312,
    )


if __name__ == "__main__":
    main()
