import { fireEvent, render, screen } from '@solidjs/testing-library';
import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';
import type { RecipeDetail, RecipeSummary } from '@/api';
import { API_BASE } from '@/test/msw/constants';
import { server } from '@/test/msw/server';
import { App } from './App';

const listItem: RecipeSummary = {
  id: 'nav-loaf',
  title: 'Navigation loaf',
  summary: 'For routing test',
  imageUrl: 'https://example.com/t.jpg',
};

const detail: RecipeDetail = {
  ...listItem,
  imageUrlLarge: 'https://example.com/l.jpg',
  ingredients: ['flour'],
  steps: ['bake'],
};

describe('App', () => {
  it('renders the main heading', () => {
    render(() => <App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Bread Recipes');
  });

  it('navigates from the home list to a recipe detail route', async () => {
    server.use(
      http.get(`${API_BASE}/recipes`, () => HttpResponse.json([listItem])),
      http.get(`${API_BASE}/recipes/:recipeId`, ({ params }) => {
        if (params.recipeId !== 'nav-loaf') {
          return HttpResponse.json({ message: 'Not found' }, { status: 404 });
        }
        return HttpResponse.json(detail);
      }),
    );
    render(() => <App />);
    const link = await screen.findByRole('link', { name: /Navigation loaf/i });
    fireEvent.click(link);
    expect(
      await screen.findByRole('heading', { level: 2, name: 'Navigation loaf' }),
    ).toBeTruthy();
  });
});
