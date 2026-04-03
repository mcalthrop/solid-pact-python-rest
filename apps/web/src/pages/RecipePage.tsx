import { A, useParams } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { createResource, For, Show } from 'solid-js';
import type { RecipeDetail } from '@/api';
import { getRecipeById } from '@/api';
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
          {({
            title,
            summary,
            prepTimeMinutes,
            bakeTimeMinutes,
            imageUrlLarge,
            ingredients,
            steps,
          }: RecipeDetail) => (
            <>
              <header class="recipe-detail-header">
                <h2 id="recipe-title" class="page-title recipe-detail-title">
                  {title}
                </h2>
                <p class="lede recipe-detail-summary">{summary}</p>
                <Show
                  when={
                    prepTimeMinutes !== undefined ||
                    bakeTimeMinutes !== undefined
                  }
                >
                  <p class="recipe-detail-times">
                    <Show when={prepTimeMinutes !== undefined}>
                      <span class="recipe-detail-time">
                        Prep: {prepTimeMinutes} min
                      </span>
                    </Show>
                    <Show when={bakeTimeMinutes !== undefined}>
                      <span class="recipe-detail-time">
                        Bake: {bakeTimeMinutes} min
                      </span>
                    </Show>
                  </p>
                </Show>
              </header>

              <div class="recipe-detail-hero">
                <img
                  class="recipe-detail-image"
                  src={imageUrlLarge}
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
                  <For each={ingredients}>
                    {(line) => <li>{line}</li>}
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
                  <For each={steps}>{(step) => <li>{step}</li>}</For>
                </ol>
              </section>
            </>
          )}
        </Show>
      </Show>
    </article>
  );
};
