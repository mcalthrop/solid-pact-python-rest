import type { JSX } from 'solid-js';
import { For } from 'solid-js';
import type { RecipeDetail } from '@/api';
import { RecipeDetailPanel } from './RecipeDetailPanel';

type RecipeDetailIngredientsProps = Pick<RecipeDetail, 'ingredients'>;

export const RecipeDetailIngredients = ({
  ingredients,
}: RecipeDetailIngredientsProps): JSX.Element => (
  <RecipeDetailPanel
    headingId="recipe-ingredients-heading"
    heading="Ingredients"
  >
    <ul class="m-0 list-disc pl-5 leading-relaxed text-foreground marker:text-foreground">
      <For each={ingredients}>
        {(line: string): JSX.Element => <li class="mb-1.5">{line}</li>}
      </For>
    </ul>
  </RecipeDetailPanel>
);
