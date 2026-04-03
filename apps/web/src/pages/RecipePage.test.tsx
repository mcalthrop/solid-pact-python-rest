import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';
import { render, screen } from '@solidjs/testing-library';
import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';
import type { RecipeDetail } from '@/api';
import { API_BASE } from '@/test/msw/constants';
import { server } from '@/test/msw/server';
import { RecipePage } from './RecipePage';

const recipeDetail: RecipeDetail = {
  id: 'loaf-1',
  title: 'Test loaf',
  summary: 'Summary text',
  imageUrl: 'https://example.com/small.jpg',
  imageUrlLarge: 'https://example.com/large.jpg',
  ingredients: ['500g flour'],
  steps: ['Mix and bake'],
};

const renderRecipePage = (): ReturnType<typeof render> => {
  const history = createMemoryHistory();
  history.set({
    value: '/recipes/loaf-1',
    replace: true,
    scroll: false,
  });
  return render(() => (
    <MemoryRouter history={history}>
      <Route path="/recipes/:id" component={RecipePage} />
    </MemoryRouter>
  ));
};

describe('RecipePage', () => {
  it('renders the recipe heading when the API returns detail', async () => {
    server.use(
      http.get(`${API_BASE}/recipes/:recipeId`, ({ params }) => {
        if (params.recipeId !== 'loaf-1') {
          return HttpResponse.json({ message: 'Not found' }, { status: 404 });
        }
        return HttpResponse.json(recipeDetail);
      }),
    );
    renderRecipePage();
    expect(
      await screen.findByRole('heading', { level: 2, name: 'Test loaf' }),
    ).toBeTruthy();
  });

  it('shows an alert when the API fails', async () => {
    server.use(
      http.get(`${API_BASE}/recipes/:recipeId`, () =>
        HttpResponse.json({ message: 'Not found' }, { status: 404 }),
      ),
    );
    renderRecipePage();
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Not found');
  });
});
