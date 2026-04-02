"""Tests for OpenAPI Pydantic codegen CLI."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock

import pytest

from app.openapi import codegen


def test_main_exits_when_openapi_file_missing(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    missing = tmp_path / "missing.yaml"
    monkeypatch.setattr(
        "app.openapi.codegen.resolve_openapi_spec_path",
        lambda: missing,
    )
    with pytest.raises(SystemExit) as exc_info:
        codegen.main()
    assert exc_info.value.code == 1


def test_main_invokes_datamodel_generate(
    monkeypatch: pytest.MonkeyPatch,
    tmp_path: Path,
) -> None:
    spec = tmp_path / "openapi.yaml"
    spec.write_text(
        'openapi: "3.1.0"\n'
        "info:\n"
        '  title: "T"\n'
        '  version: "1"\n'
        '  description: "D"\n'
        "paths: {}\n",
        encoding="utf-8",
    )
    out = tmp_path / "gen" / "openapi_models.py"
    monkeypatch.setattr("app.openapi.codegen.resolve_openapi_spec_path", lambda: spec)
    monkeypatch.setattr("app.openapi.codegen._OUTPUT", out)
    mock_generate = MagicMock()
    monkeypatch.setattr("app.openapi.codegen.generate", mock_generate)
    codegen.main()
    mock_generate.assert_called_once()
    assert out.parent.is_dir()
