import { A, useParams } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { createResource, For, Show } from 'solid-js';
import type { RecipeDetail } from '@/api';
import { loadRecipeDetail } from '@/lib/loadRecipeDetail';
import '@/pages/Page.css';

export const RecipePage = (): JSX.Element => {
  const params = useParams<{ id: string }>();
  const [recipe] = createResource(
    () => params.id,
    async (id: string | undefined) => {
      if (id === undefined || id === '') {
        throw new Error('Missing recipe id.');
      }
      return loadRecipeDetail(id);
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
          {(r: RecipeDetail) => (
            <>
              <header class="recipe-detail-header">
                <h2 id="recipe-title" class="page-title recipe-detail-title">
                  {r.title}
                </h2>
                <p class="lede recipe-detail-summary">{r.summary}</p>
                <Show
                  when={
                    r.prepTimeMinutes !== undefined ||
                    r.bakeTimeMinutes !== undefined
                  }
                >
                  <p class="recipe-detail-times">
                    <Show when={r.prepTimeMinutes !== undefined}>
                      <span class="recipe-detail-time">
                        Prep: {r.prepTimeMinutes} min
                      </span>
                    </Show>
                    <Show when={r.bakeTimeMinutes !== undefined}>
                      <span class="recipe-detail-time">
                        Bake: {r.bakeTimeMinutes} min
                      </span>
                    </Show>
                  </p>
                </Show>
              </header>

              <div class="recipe-detail-hero">
                <img
                  class="recipe-detail-image"
                  src={r.imageUrlLarge}
                  alt=""
                  width={720}
                  height={480}
                  loading="eager"
                  decoding="async"
                />
              </div>

              <section
                class="recipe-detail-section"
                aria-labelledby="recipe-ingredients-heading"
              >
                <h3 id="recipe-ingredients-heading" class="recipe-detail-h3">
                  Ingredients
                </h3>
                <ul class="recipe-detail-list recipe-detail-list-ingredients">
                  <For each={r.ingredients}>
                    {(line: string) => <li>{line}</li>}
                  </For>
                </ul>
              </section>

              <section
                class="recipe-detail-section"
                aria-labelledby="recipe-steps-heading"
              >
                <h3 id="recipe-steps-heading" class="recipe-detail-h3">
                  Steps
                </h3>
                <ol class="recipe-detail-list recipe-detail-list-steps">
                  <For each={r.steps}>{(step: string) => <li>{step}</li>}</For>
                </ol>
              </section>
            </>
          )}
        </Show>
      </Show>
    </article>
  );
};
