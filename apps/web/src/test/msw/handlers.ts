import type { RequestHandler } from 'msw';
import { HttpResponse, http } from 'msw';
import { API_BASE } from './constants';

/** Defaults: empty recipe list and 404 recipe detail; override per test with `server.use(...)`. */
export const handlers: RequestHandler[] = [
  http.get(`${API_BASE}/recipes`, () => HttpResponse.json([])),
  http.get(`${API_BASE}/recipes/:recipeId`, () =>
    HttpResponse.json({ message: 'Not found' }, { status: 404 }),
  ),
];
