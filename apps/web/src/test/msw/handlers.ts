import type { RequestHandler } from 'msw';
import { HttpResponse, http } from 'msw';
import { API_BASE } from './constants';

/** Default: empty list; override per test with `server.use(...)`. */
export const handlers: RequestHandler[] = [
  http.get(`${API_BASE}/recipes`, () => HttpResponse.json([])),
  http.get(`${API_BASE}/recipes/:recipeId`, () =>
    HttpResponse.json({ message: 'Not found' }, { status: 404 }),
  ),
];
