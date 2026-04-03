import { A } from '@solidjs/router';
import type { ComponentProps, JSX, ParentProps } from 'solid-js';
import { SiteTitle, TextMutedSmall } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

export const Shell = ({ children }: ParentProps): JSX.Element => (
  <div class="flex min-h-full flex-1 flex-col text-left">{children}</div>
);

export const ShellHeader = ({ children }: ParentProps): JSX.Element => (
  <header class="shrink-0 border-b border-border bg-header px-5 py-4 sm:px-6">
    <div class="mx-auto max-w-2xl">{children}</div>
  </header>
);

export const ShellMain = ({ children }: ParentProps): JSX.Element => (
  <main class="mx-auto box-border w-full max-w-2xl flex-1 px-5 py-5 pb-10 sm:px-6">
    {children}
  </main>
);

export const ShellFooter = ({ children }: ParentProps): JSX.Element => (
  <footer class="shrink-0 border-t border-border bg-footer px-5 py-4 sm:px-6">
    {children}
  </footer>
);

export const ShellFooterNote = ({
  class: className,
  ...rest
}: ComponentProps<'p'>): JSX.Element => (
  <p
    class={cn(
      'mx-auto max-w-2xl text-center text-xs text-muted-foreground',
      className,
    )}
    {...rest}
  />
);

export const SiteBrand = (): JSX.Element => (
  <>
    <SiteTitle>
      <A
        href="/"
        class="rounded text-heading no-underline outline-offset-[3px] hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        end
      >
        Bread Recipes
      </A>
    </SiteTitle>
    <TextMutedSmall>Simple loaves, clear steps</TextMutedSmall>
  </>
);
