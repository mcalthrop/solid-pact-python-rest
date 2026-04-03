import { A, useParams } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { createResource, Show } from 'solid-js';
import type { RecipeDetail } from '@/api';
import { getRecipeById } from '@/api';
import { RecipeDetailBody } from '@/components/recipe-detail/RecipeDetailBody';
import './Page.css';

export const RecipePage = (): JSX.Element => {
  const params = useParams<{ id: string }>();
  const [recipe] = createResource(
    () => params.id,
    async (id: string | undefined) => {
      if (!id) {
        throw new Error('Missing recipe id.');
      }
      const { data } = await getRecipeById({
        path: { recipe_id: id },
        throwOnError: true,
      });
      return data;
    },
  );

  return (
    <article class="page recipe-detail" aria-labelledby="recipe-title">
      <p class="recipe-detail-back">
        <A href="/" class="recipe-detail-back-link">
          ← All recipes
        </A>
      </p>

      <Show when={recipe.loading}>
        <p class="recipe-list-status" aria-live="polite">
          Loading recipe…
        </p>
      </Show>

      <Show when={recipe.error} keyed>
        {(err: unknown) => (
          <p role="alert" class="recipe-list-error">
            {err instanceof Error ? err.message : String(err)}
          </p>
        )}
      </Show>

      <Show when={!recipe.loading && !recipe.error}>
        <Show when={recipe()} keyed>
          {(detail: RecipeDetail) => <RecipeDetailBody {...detail} />}
        </Show>
      </Show>
    </article>
  );
};
