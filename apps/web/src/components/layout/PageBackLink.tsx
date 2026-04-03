import { A } from '@solidjs/router';
import type { JSX, ParentProps } from 'solid-js';
import { buttonVariants } from '@/components/ui/button';

type PageBackLinkProps = ParentProps & {
  href: string;
};

export const PageBackLink = (props: PageBackLinkProps): JSX.Element => (
  <p class="mb-4">
    <A
      class={buttonVariants({ variant: 'link', size: 'link' })}
      href={props.href}
    >
      {props.children}
    </A>
  </p>
);
