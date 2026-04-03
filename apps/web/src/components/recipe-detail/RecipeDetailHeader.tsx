import type { JSX } from 'solid-js';
import { Show } from 'solid-js';
import type { RecipeDetail } from '@/api';

type RecipeDetailHeaderProps = Pick<
  RecipeDetail,
  'title' | 'summary' | 'prepTimeMinutes' | 'bakeTimeMinutes'
>;

export const RecipeDetailHeader = ({
  title,
  summary,
  prepTimeMinutes,
  bakeTimeMinutes,
}: RecipeDetailHeaderProps): JSX.Element => (
  <header class="recipe-detail-header">
    <h2 id="recipe-title" class="page-title recipe-detail-title">
      {title}
    </h2>
    <p class="lede recipe-detail-summary">{summary}</p>
    <Show when={prepTimeMinutes !== undefined || bakeTimeMinutes !== undefined}>
      <p class="recipe-detail-times">
        <Show when={prepTimeMinutes !== undefined}>
          <span class="recipe-detail-time">Prep: {prepTimeMinutes} min</span>
        </Show>
        <Show when={bakeTimeMinutes !== undefined}>
          <span class="recipe-detail-time">Bake: {bakeTimeMinutes} min</span>
        </Show>
      </p>
    </Show>
  </header>
);
