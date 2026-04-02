"""HTTP routers (FastAPI ``APIRouter`` trees)."""

from app.routers.health import health_router
from app.routers.recipes import recipes_router

__all__ = ["health_router", "recipes_router"]
