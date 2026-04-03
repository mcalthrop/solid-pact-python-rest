import type { RecipeSummary } from '@/api';
import { listRecipes } from '@/api';

/** Fetches recipe summaries for the home list; throws on transport or API error. */
export async function loadRecipes(): Promise<RecipeSummary[]> {
  const res = await listRecipes();
  if (res.error !== undefined) {
    const err = res.error;
    const message =
      typeof err === 'object' && err !== null && 'message' in err
        ? String((err as { message: unknown }).message)
        : 'Could not load recipes.';
    throw new Error(message);
  }
  return res.data ?? [];
}
