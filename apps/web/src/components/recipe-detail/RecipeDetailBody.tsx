import type { JSX } from 'solid-js';
import type { RecipeDetail } from '@/api';
import { RecipeDetailHeader } from './RecipeDetailHeader';
import { RecipeDetailHero } from './RecipeDetailHero';
import { RecipeDetailIngredients } from './RecipeDetailIngredients';
import { RecipeDetailSteps } from './RecipeDetailSteps';

export const RecipeDetailBody = ({
  title,
  summary,
  prepTimeMinutes,
  bakeTimeMinutes,
  imageUrlLarge,
  ingredients,
  steps,
}: RecipeDetail): JSX.Element => (
  <>
    <RecipeDetailHeader
      title={title}
      summary={summary}
      prepTimeMinutes={prepTimeMinutes}
      bakeTimeMinutes={bakeTimeMinutes}
    />
    <RecipeDetailHero imageUrlLarge={imageUrlLarge} />
    <RecipeDetailIngredients ingredients={ingredients} />
    <RecipeDetailSteps steps={steps} />
  </>
);
