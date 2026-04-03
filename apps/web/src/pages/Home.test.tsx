import { MemoryRouter, Route } from '@solidjs/router';
import { render, screen } from '@solidjs/testing-library';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { RecipeSummary } from '@/api';
import { listRecipes } from '@/api';
import { Home } from './Home';

const renderHome = (): ReturnType<typeof render> =>
  render(() => (
    <MemoryRouter>
      <Route path="/" component={Home} />
    </MemoryRouter>
  ));

vi.mock('@/api', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/api')>();
  return {
    ...mod,
    listRecipes: vi.fn(),
  };
});

const listOk = (
  data: RecipeSummary[],
): {
  data: RecipeSummary[];
  error: undefined;
  request: Request;
  response: Response;
} => ({
  data,
  error: undefined,
  request: new Request('http://127.0.0.1:8000/recipes'),
  response: new Response(),
});

describe('Home', () => {
  beforeEach(() => {
    vi.mocked(listRecipes).mockReset();
  });

  it('shows empty state when the API returns no recipes', async () => {
    vi.mocked(listRecipes).mockResolvedValue(listOk([]));
    renderHome();
    expect(await screen.findByText(/No recipes to show yet/i)).toBeTruthy();
  });

  it('renders linked recipe cards when the API returns recipes', async () => {
    vi.mocked(listRecipes).mockResolvedValue(
      listOk([
        {
          id: 'sourdough-1',
          title: 'Seeded sourdough',
          summary: 'Overnight ferment',
          imageUrl: 'https://example.com/thumb.jpg',
        },
      ]),
    );
    renderHome();
    expect(await screen.findByText('Seeded sourdough')).toBeTruthy();
    const link = screen.getByRole('link', { name: /Seeded sourdough/i });
    expect(link.getAttribute('href')).toBe('/recipes/sourdough-1');
  });

  it('shows an alert when the API returns an error payload', async () => {
    vi.mocked(listRecipes).mockResolvedValue({
      data: undefined,
      error: { message: 'Bad gateway' },
      request: new Request('http://127.0.0.1:8000/recipes'),
      response: new Response(),
    });
    renderHome();
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Bad gateway');
  });
});
