import type { RouteSectionProps } from '@solidjs/router';
import { A } from '@solidjs/router';
import type { JSX } from 'solid-js';
import '@/layout/AppShell.css';

export const AppShell = ({ children }: RouteSectionProps): JSX.Element => (
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
    <main class="shell-main">{children}</main>
    <footer class="shell-footer">
      <p class="shell-footer-note">A bread recipes browser</p>
    </footer>
  </div>
);
