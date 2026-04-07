import { useParams } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { createResource, Show } from 'solid-js';
import type { RecipeDetail } from '@/api';
import { getRecipeById } from '@/api';
import { PageBackLink } from '@/components/layout/PageBackLink';
import { RecipeDetailBody } from '@/components/recipe-detail/RecipeDetailBody';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingRegion } from '@/components/ui/loading-region';
import { Skeleton } from '@/components/ui/skeleton';
import { formatFetchError } from '@/lib/format-fetch-error';

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
    <article class="w-full">
      <PageBackLink href="/">← All recipes</PageBackLink>

      <Show when={recipe.loading}>
        <LoadingRegion label="Loading recipe…" spacing="comfortable">
          <Skeleton class="h-10 w-2/3 max-w-md rounded-md" />
          <Skeleton class="h-24 w-full rounded-xl" />
          <Skeleton class="h-56 w-full rounded-xl" />
        </LoadingRegion>
      </Show>

      <Show when={recipe.error} keyed>
        {(err: unknown) => (
          <Alert variant="destructive">
            <AlertDescription>{formatFetchError(err)}</AlertDescription>
          </Alert>
        )}
      </Show>

      <Show when={!recipe.loading && !recipe.error}>
        <Show when={recipe()} keyed>
          {(detail: RecipeDetail) => (
            <section aria-labelledby="recipe-title">
              <RecipeDetailBody {...detail} />
            </section>
          )}
        </Show>
      </Show>
    </article>
  );
};
