import { A } from '@solidjs/router';
import type { JSX } from 'solid-js';
import type { RecipeSummary } from '@/api';

export const RecipeCard = ({
  id,
  imageUrl,
  title,
  summary,
}: RecipeSummary): JSX.Element => (
  <li class="recipe-grid-item">
    <A
      href={`/recipes/${id}`}
      class="recipe-card"
      aria-labelledby={`recipe-title-${id}`}
    >
      <div class="recipe-card-media">
        <img
          class="recipe-card-image"
          src={imageUrl}
          alt=""
          width={320}
          height={240}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="recipe-card-body">
        <h3 class="recipe-card-title" id={`recipe-title-${id}`}>
          {title}
        </h3>
        <p class="recipe-card-summary">{summary}</p>
      </div>
    </A>
  </li>
);
