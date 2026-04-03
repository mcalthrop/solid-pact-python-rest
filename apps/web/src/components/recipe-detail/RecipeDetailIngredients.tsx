import type { JSX } from 'solid-js';
import { For } from 'solid-js';
import type { RecipeDetail } from '@/api';

type RecipeDetailIngredientsProps = Pick<RecipeDetail, 'ingredients'>;

export const RecipeDetailIngredients = ({
  ingredients,
}: RecipeDetailIngredientsProps): JSX.Element => (
  <section
    class="recipe-detail-section"
    aria-labelledby="recipe-ingredients-heading"
  >
    <h3 id="recipe-ingredients-heading" class="recipe-detail-h3">
      Ingredients
    </h3>
    <ul class="recipe-detail-list recipe-detail-list-ingredients">
      <For each={ingredients}>
        {(line: string): JSX.Element => <li>{line}</li>}
      </For>
    </ul>
  </section>
);
