import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';
import { render, screen } from '@solidjs/testing-library';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { RecipeDetail } from '@/api';
import { getRecipeById } from '@/api';
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

const detailOk = (
  data: RecipeDetail,
): {
  data: RecipeDetail;
  error: undefined;
  request: Request;
  response: Response;
} => ({
  data,
  error: undefined,
  request: new Request(`http://127.0.0.1:8000/recipes/${data.id}`),
  response: new Response(),
});

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

vi.mock('@/api', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/api')>();
  return {
    ...mod,
    getRecipeById: vi.fn(),
  };
});

describe('RecipePage', () => {
  beforeEach(() => {
    vi.mocked(getRecipeById).mockReset();
  });

  it('renders the recipe heading when the API returns detail', async () => {
    vi.mocked(getRecipeById).mockResolvedValue(detailOk(recipeDetail));
    renderRecipePage();
    expect(
      await screen.findByRole('heading', { level: 2, name: 'Test loaf' }),
    ).toBeTruthy();
  });

  it('shows an alert when the API fails', async () => {
    vi.mocked(getRecipeById).mockRejectedValue(new Error('Not found'));
    renderRecipePage();
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Not found');
  });
});
