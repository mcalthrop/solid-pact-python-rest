import type { JSX } from 'solid-js';
import type { RecipeDetail } from '@/api';
import { Card } from '@/components/ui/card';
import { CoverImage } from '@/components/ui/cover-image';

type RecipeDetailHeroProps = Pick<RecipeDetail, 'imageUrlLarge'>;

export const RecipeDetailHero = ({
  imageUrlLarge,
}: RecipeDetailHeroProps): JSX.Element => (
  <Card class="mb-6 overflow-hidden p-0">
    <CoverImage
      src={imageUrlLarge}
      alt=""
      width={720}
      height={480}
      loading="eager"
      decoding="async"
      frameClass="aspect-[3/2] max-h-[min(60vh,420px)]"
    />
  </Card>
);
