import type { JSX } from 'solid-js';
import { For } from 'solid-js';
import type { RecipeDetail } from '@/api';
import { RecipeDetailPanel } from './RecipeDetailPanel';

type RecipeDetailStepsProps = Pick<RecipeDetail, 'steps'>;

export const RecipeDetailSteps = ({
  steps,
}: RecipeDetailStepsProps): JSX.Element => (
  <RecipeDetailPanel
    headingId="recipe-steps-heading"
    heading="Steps"
    class="mb-6"
  >
    <ol class="m-0 list-decimal pl-6 leading-relaxed text-foreground marker:font-medium marker:text-primary">
      <For each={steps}>
        {(step: string): JSX.Element => <li class="mb-1.5">{step}</li>}
      </For>
    </ol>
  </RecipeDetailPanel>
);
