import { A } from '@solidjs/router';
import type { ComponentProps, JSX, ParentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { SiteTitle, TextMutedSmall } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

export const Shell = (props: ParentProps): JSX.Element => (
  <div class="flex min-h-full flex-1 flex-col text-left">{props.children}</div>
);

export const ShellHeader = (props: ParentProps): JSX.Element => (
  <header class="shrink-0 border-b border-border bg-header px-5 py-4 sm:px-6">
    <div class="mx-auto max-w-2xl">{props.children}</div>
  </header>
);

export const ShellMain = (props: ParentProps): JSX.Element => (
  <main class="mx-auto box-border w-full max-w-2xl flex-1 px-5 py-5 pb-10 sm:px-6">
    {props.children}
  </main>
);

export const ShellFooter = (props: ParentProps): JSX.Element => (
  <footer class="shrink-0 border-t border-border bg-footer px-5 py-4 sm:px-6">
    {props.children}
  </footer>
);

export const ShellFooterNote = (props: ComponentProps<'p'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <p
      class={cn(
        'mx-auto max-w-2xl text-center text-xs text-muted-foreground',
        local.class,
      )}
      {...rest}
    />
  );
};

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
