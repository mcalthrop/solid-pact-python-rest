"""ASGI application entrypoint."""

from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import JSONResponse

from recipes_api.health import health_router
from recipes_api.openapi_paths import resolve_openapi_spec_path
from recipes_api.openapi_spec import load_openapi_info
from recipes_api.recipes import recipes_router
from recipes_api.recipes.exceptions import RecipeNotFoundError

_openapi_info = load_openapi_info(resolve_openapi_spec_path())

app = FastAPI(
    title=_openapi_info["title"],
    version=_openapi_info["version"],
    description=_openapi_info["description"],
)


@app.exception_handler(RecipeNotFoundError)
def recipe_not_found_handler(_request: Request, _exc: RecipeNotFoundError) -> JSONResponse:
    return JSONResponse(
        status_code=404,
        content={"message": "Recipe not found"},
    )


app.include_router(health_router)
app.include_router(recipes_router)
