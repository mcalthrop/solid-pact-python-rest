import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';

vi.mock('./api', () => ({
  listRecipes: vi.fn().mockResolvedValue({
    data: [],
    error: undefined,
    request: new Request('http://127.0.0.1:8000/recipes'),
    response: new Response(),
  }),
}));

describe('App', () => {
  it('renders the main heading', () => {
    render(() => <App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Bread Recipes');
  });
});
