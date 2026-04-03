import { useParams } from '@solidjs/router';
import './Page.css';

export default function RecipePage() {
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
}
