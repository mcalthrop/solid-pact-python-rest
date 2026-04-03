import type { JSX } from 'solid-js';
import type { RecipeDetail } from '@/api';
import { Heading2, RecipeTimes, TextLede } from '@/components/ui/typography';

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
  <header class="mb-4">
    <Heading2 id="recipe-title" class="mb-2">
      {title}
    </Heading2>
    <TextLede class="mb-3">{summary}</TextLede>
    <RecipeTimes
      prepTimeMinutes={prepTimeMinutes}
      bakeTimeMinutes={bakeTimeMinutes}
    />
  </header>
);
