import { Route, Router } from '@solidjs/router';
import AppShell from './layout/AppShell';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';

export default function App() {
  return (
    <Router root={AppShell}>
      <Route path="/" component={Home} />
      <Route path="/recipes/:id" component={RecipePage} />
    </Router>
  );
}
