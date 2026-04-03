import type { JSX } from 'solid-js';
import './Page.css';

export const Home = (): JSX.Element => (
  <section class="page" aria-labelledby="home-intro">
    <p id="home-intro" class="lede">
      Browse sourdough and yeasted recipes from the API. List and detail views
      follow in the next milestones.
    </p>
  </section>
);
