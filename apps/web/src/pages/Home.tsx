import type { JSX } from 'solid-js';
import { createResource, For, Show } from 'solid-js';
import type { RecipeSummary } from '@/api';
import { listRecipes } from '@/api';
import { RecipeCard } from '@/components/RecipeCard';
import './Page.css';

export const Home = (): JSX.Element => {
  const [recipes] = createResource(() =>
    listRecipes({ throwOnError: true }).then(({ data }) => data ?? []),
  );

  return (
    <section class="page" aria-labelledby="home-heading">
      <h2 id="home-heading" class="page-title">
        Recipes
      </h2>
      <p class="lede home-lede">
        Browse sourdough and yeasted breads from the API. Select a recipe for
        full ingredients and steps.
      </p>

      <Show when={recipes.loading}>
        <p class="recipe-list-status" aria-live="polite">
          Loading recipes…
        </p>
      </Show>

      <Show when={recipes.error} keyed>
        {(err: unknown) => (
          <p role="alert" class="recipe-list-error">
            {err instanceof Error ? err.message : String(err)}
          </p>
        )}
      </Show>

      <Show when={!recipes.loading && !recipes.error}>
        <Show
          when={(recipes() ?? []).length > 0}
          fallback={
            <p class="recipe-list-empty">
              No recipes to show yet. Try again later.
            </p>
          }
        >
          <ul class="recipe-grid">
            <For each={recipes()}>
              {(recipe: RecipeSummary) => <RecipeCard {...recipe} />}
            </For>
          </ul>
        </Show>
      </Show>
    </section>
  );
};
