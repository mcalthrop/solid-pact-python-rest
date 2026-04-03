import { Route, Router } from '@solidjs/router';
import type { JSX } from 'solid-js';
import { AppShell } from './layout/AppShell';
import { Home } from './pages/Home';
import { RecipePage } from './pages/RecipePage';

export const App = (): JSX.Element => (
  <Router root={AppShell}>
    <Route path="/" component={Home} />
    <Route path="/recipes/:id" component={RecipePage} />
  </Router>
);
