import type { RouteSectionProps } from '@solidjs/router';
import type { JSX } from 'solid-js';
import {
  Shell,
  ShellFooter,
  ShellFooterNote,
  ShellHeader,
  ShellMain,
  SiteBrand,
} from '@/components/layout/shell';

export const AppShell = ({ children }: RouteSectionProps): JSX.Element => (
  <Shell>
    <ShellHeader>
      <SiteBrand />
    </ShellHeader>
    <ShellMain>{children}</ShellMain>
    <ShellFooter>
      <ShellFooterNote>A bread recipes browser</ShellFooterNote>
    </ShellFooter>
  </Shell>
);
