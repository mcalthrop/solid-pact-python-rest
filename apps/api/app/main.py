"""ASGI application entrypoint."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import JSONResponse

from app.routers.recipes.data_paths import resolve_recipes_json_path
from app.openapi.paths import resolve_openapi_spec_path
from app.openapi.spec import load_openapi_info
from app.routers import health_router, recipes_router
from app.routers.recipes.exceptions import RecipeNotFoundError
from app.routers.recipes.repository import StaticRecipeRepository
from app.routers.recipes.state import RecipeAppState

_openapi_info = load_openapi_info(resolve_openapi_spec_path())


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.recipe_state = RecipeAppState(
        recipe_repository=StaticRecipeRepository(
            data_path=resolve_recipes_json_path(),
        ),
    )
    yield


app = FastAPI(
    title=_openapi_info["title"],
    version=_openapi_info["version"],
    description=_openapi_info["description"],
    lifespan=lifespan,
)


@app.exception_handler(RecipeNotFoundError)
def recipe_not_found_handler(_request: Request, _exc: RecipeNotFoundError) -> JSONResponse:
    return JSONResponse(
        status_code=404,
        content={"message": "Recipe not found"},
    )


app.include_router(health_router)
app.include_router(recipes_router)
