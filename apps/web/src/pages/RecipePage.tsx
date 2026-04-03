import { useParams } from '@solidjs/router';
import type { JSX } from 'solid-js';
import './Page.css';

export const RecipePage = (): JSX.Element => {
  const params = useParams<{ id: string }>();

  return (
    <section class="page" aria-labelledby="recipe-heading">
      <h2 id="recipe-heading" class="page-title">
        Recipe
      </h2>
      <p class="lede">
        Full ingredients, steps, and imagery for recipe{' '}
        <code class="inline-code">{params.id}</code> arrive in PLAN §4.5.
      </p>
    </section>
  );
};
