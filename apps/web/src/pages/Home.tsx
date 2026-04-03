import { A } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { createResource, For, Show } from 'solid-js';
import type { RecipeSummary } from '@/api';
import { loadRecipes } from '@/lib/loadRecipes';
import '@/pages/Page.css';

export const Home = (): JSX.Element => {
  const [recipes] = createResource(loadRecipes);

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
              {(recipe: RecipeSummary) => (
                <li class="recipe-grid-item">
                  <A
                    href={`/recipes/${recipe.id}`}
                    class="recipe-card"
                    aria-labelledby={`recipe-title-${recipe.id}`}
                  >
                    <div class="recipe-card-media">
                      <img
                        class="recipe-card-image"
                        src={recipe.imageUrl}
                        alt=""
                        width={320}
                        height={240}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div class="recipe-card-body">
                      <h3
                        class="recipe-card-title"
                        id={`recipe-title-${recipe.id}`}
                      >
                        {recipe.title}
                      </h3>
                      <p class="recipe-card-summary">{recipe.summary}</p>
                    </div>
                  </A>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Show>
    </section>
  );
};
