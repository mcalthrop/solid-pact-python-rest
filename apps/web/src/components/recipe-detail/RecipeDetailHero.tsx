import type { JSX } from 'solid-js';
import type { RecipeDetail } from '@/api';

type RecipeDetailHeroProps = Pick<RecipeDetail, 'imageUrlLarge'>;

export const RecipeDetailHero = ({
  imageUrlLarge,
}: RecipeDetailHeroProps): JSX.Element => (
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
);
