import type { JSX } from 'solid-js';
import { createResource, For, Show } from 'solid-js';
import type { RecipeSummary } from '@/api';
import { listRecipes } from '@/api';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeList } from '@/components/RecipeList';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingRegion } from '@/components/ui/loading-region';
import { Skeleton } from '@/components/ui/skeleton';
import { Heading2, TextLede, TextMuted } from '@/components/ui/typography';

export const Home = (): JSX.Element => {
  const [recipes] = createResource(() =>
    listRecipes({ throwOnError: true }).then(({ data }) => data ?? []),
  );

  return (
    <section class="w-full" aria-labelledby="home-heading">
      <Heading2 id="home-heading" class="mb-3">
        Recipes
      </Heading2>
      <TextLede class="mb-5">
        Browse sourdough and yeasted breads from the API. Select a recipe for
        full ingredients and steps.
      </TextLede>

      <Show when={recipes.loading}>
        <LoadingRegion label="Loading recipes…">
          <Skeleton class="h-9 w-full max-w-md rounded-md" />
          <Skeleton class="h-36 w-full rounded-xl" />
          <Skeleton class="h-36 w-full rounded-xl" />
        </LoadingRegion>
      </Show>

      <Show when={recipes.error} keyed>
        {(err: unknown) => (
          <Alert variant="destructive">
            <AlertDescription>
              {err instanceof Error ? err.message : String(err)}
            </AlertDescription>
          </Alert>
        )}
      </Show>

      <Show when={!recipes.loading && !recipes.error}>
        <Show
          when={(recipes() ?? []).length > 0}
          fallback={
            <TextMuted>No recipes to show yet. Try again later.</TextMuted>
          }
        >
          <RecipeList>
            <For each={recipes()}>
              {(recipe: RecipeSummary) => <RecipeCard {...recipe} />}
            </For>
          </RecipeList>
        </Show>
      </Show>
    </section>
  );
};
