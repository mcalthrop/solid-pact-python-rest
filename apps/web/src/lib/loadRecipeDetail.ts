import type { RecipeDetail } from '@/api';
import { getRecipeById } from '@/api';

/** Fetches one recipe by id; throws on transport, 404, or other API errors. */
export const loadRecipeDetail = async (id: string): Promise<RecipeDetail> => {
  const res = await getRecipeById({ path: { recipe_id: id } });
  if (res.error !== undefined) {
    const err = res.error;
    const message =
      typeof err === 'object' && err !== null && 'message' in err
        ? String((err as { message: unknown }).message)
        : 'Could not load recipe.';
    throw new Error(message);
  }
  if (res.data === undefined) {
    throw new Error('Recipe not found.');
  }
  return res.data;
};
