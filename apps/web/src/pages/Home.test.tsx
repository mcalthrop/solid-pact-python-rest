import { MemoryRouter, Route } from '@solidjs/router';
import { render, screen } from '@solidjs/testing-library';
import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';
import type { RecipeSummary } from '@/api';
import { API_BASE } from '@/test/msw/constants';
import { server } from '@/test/msw/server';
import { Home } from './Home';

const renderHome = (): ReturnType<typeof render> =>
  render(() => (
    <MemoryRouter>
      <Route path="/" component={Home} />
    </MemoryRouter>
  ));

describe('Home', () => {
  it('shows a loading state while recipes are fetched', async () => {
    const gate = Promise.withResolvers<void>();
    server.use(
      http.get(`${API_BASE}/recipes`, async () => {
        await gate.promise;
        return HttpResponse.json([]);
      }),
    );
    renderHome();
    expect(await screen.findByText('Loading recipes…')).toBeTruthy();
    gate.resolve();
    expect(await screen.findByText(/No recipes to show yet/i)).toBeTruthy();
  });

  it('shows empty state when the API returns no recipes', async () => {
    server.use(http.get(`${API_BASE}/recipes`, () => HttpResponse.json([])));
    renderHome();
    expect(await screen.findByText(/No recipes to show yet/i)).toBeTruthy();
  });

  it('renders linked recipe cards when the API returns recipes', async () => {
    server.use(
      http.get(`${API_BASE}/recipes`, () =>
        HttpResponse.json<RecipeSummary[]>([
          {
            id: 'sourdough-1',
            title: 'Seeded sourdough',
            summary: 'Overnight ferment',
            imageUrl: 'https://example.com/thumb.jpg',
          },
        ]),
      ),
    );
    renderHome();
    expect(await screen.findByText('Seeded sourdough')).toBeTruthy();
    const link = screen.getByRole('link', { name: /Seeded sourdough/i });
    expect(link.getAttribute('href')).toBe('/recipes/sourdough-1');
  });

  it('shows an alert when the API returns an error', async () => {
    server.use(
      http.get(`${API_BASE}/recipes`, () =>
        HttpResponse.json({ message: 'Bad gateway' }, { status: 502 }),
      ),
    );
    renderHome();
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Bad gateway');
  });
});
