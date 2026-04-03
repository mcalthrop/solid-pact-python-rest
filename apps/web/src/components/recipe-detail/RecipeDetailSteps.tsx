import type { JSX } from 'solid-js';
import { For } from 'solid-js';
import type { RecipeDetail } from '@/api';

type RecipeDetailStepsProps = Pick<RecipeDetail, 'steps'>;

export const RecipeDetailSteps = ({
  steps,
}: RecipeDetailStepsProps): JSX.Element => (
  <section class="recipe-detail-section" aria-labelledby="recipe-steps-heading">
    <h3 id="recipe-steps-heading" class="recipe-detail-h3">
      Steps
    </h3>
    <ol class="recipe-detail-list recipe-detail-list-steps">
      <For each={steps}>{(step: string): JSX.Element => <li>{step}</li>}</For>
    </ol>
  </section>
);
