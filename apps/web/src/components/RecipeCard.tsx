import { A } from '@solidjs/router';
import type { JSX } from 'solid-js';
import type { RecipeSummary } from '@/api';
import { Card, CardContent } from '@/components/ui/card';
import { CoverImage } from '@/components/ui/cover-image';
import { RecipeCardTitle, TextMuted } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

const recipeCardLinkClass: string = cn(
  'group block rounded-xl text-inherit no-underline outline-offset-2',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
);

const recipeCardSurfaceClass: string = cn(
  'overflow-hidden p-0 transition-[border-color,box-shadow] duration-150',
  'hover:border-accent-border',
  'hover:shadow-[rgba(45,70,85,0.1)_0_12px_28px_-8px,rgba(40,55,65,0.06)_0_4px_10px_-4px]',
  'dark:hover:shadow-[rgba(0,0,0,0.35)_0_12px_28px_-8px,rgba(0,0,0,0.2)_0_4px_10px_-4px]',
);

export const RecipeCard = ({
  id,
  imageUrl,
  title,
  summary,
}: RecipeSummary): JSX.Element => (
  <li class="m-0 list-none">
    <A
      href={`/recipes/${id}`}
      class={recipeCardLinkClass}
      aria-labelledby={`recipe-title-${id}`}
    >
      <Card class={recipeCardSurfaceClass}>
        <CardContent class="grid grid-cols-[minmax(0,120px)_minmax(0,1fr)] gap-3.5 p-2.5 sm:grid-cols-[minmax(0,140px)_minmax(0,1fr)] sm:gap-4 sm:p-3">
          <CoverImage
            alt=""
            src={imageUrl}
            width={320}
            height={240}
            loading="lazy"
            decoding="async"
            frameClass="aspect-[4/3] min-h-0 rounded-md"
          />
          <div class="flex min-w-0 flex-col justify-center gap-1.5">
            <RecipeCardTitle id={`recipe-title-${id}`}>{title}</RecipeCardTitle>
            <TextMuted class="line-clamp-3 text-[0.92rem] leading-snug">
              {summary}
            </TextMuted>
          </div>
        </CardContent>
      </Card>
    </A>
  </li>
);
