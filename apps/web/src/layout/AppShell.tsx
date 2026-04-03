import type { RouteSectionProps } from '@solidjs/router';
import { A } from '@solidjs/router';
import './AppShell.css';

export default function AppShell(props: RouteSectionProps) {
  return (
    <div class="shell">
      <header class="shell-header">
        <div class="shell-header-inner">
          <h1 class="site-title">
            <A href="/" class="site-title-link" end>
              Bread Recipes
            </A>
          </h1>
          <p class="site-tagline">Simple loaves, clear steps</p>
        </div>
      </header>
      <main class="shell-main">{props.children}</main>
      <footer class="shell-footer">
        <p class="shell-footer-note">A bread recipes browser</p>
      </footer>
    </div>
  );
}
