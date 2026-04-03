import { MemoryRouter, Route } from '@solidjs/router';
import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { RecipePage } from './RecipePage';

vi.mock('@solidjs/router', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@solidjs/router')>();
  return {
    ...mod,
    /** Solid skips the fetcher when the source is `undefined`; an empty id still runs it. */
    useParams: () => ({ id: '' }),
  };
});

describe('RecipePage (missing id)', () => {
  it('shows an error when the route param id is empty', async () => {
    render(() => (
      <MemoryRouter>
        <Route path="/" component={RecipePage} />
      </MemoryRouter>
    ));
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Missing recipe id');
  });
});
