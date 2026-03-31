# Agent notes (Python tests)

When writing tests for the Python API:

- Use `pytest.raises` to assert that a specific exception is raised (including the expected type and, where useful, the message).
- Prefer `@pytest.mark.parametrize` to exercise several inputs or cases without duplicating test bodies.

These conventions align with `.cursor/rules/idiomatic-python.mdc`.
