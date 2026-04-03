/**
 * shadcn-solid Button — this file *is* the shadcn component (vendored registry source, not an npm import).
 * There is no `from "shadcn-solid"` package for UI: the CLI copies components into `components/ui/`.
 *
 * The upstream registry implementation wraps Kobalte’s primitive — so `@kobalte/core` appears here by design.
 * @see https://shadcn-solid.com/docs/components/button
 *
 * Refresh from registry: `pnpm dlx shadcn-solid@latest add button --overwrite` (after `init`).
 */
import { Button as KobalteButton } from '@kobalte/core/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/utils';

// biome-ignore lint/nursery/useExplicitType: explicit CVA output type is verbose and harms inference
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white shadow hover:bg-primary-hover',
        destructive:
          'bg-red-600 text-white shadow-sm hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800',
        outline:
          'border border-border bg-transparent shadow-sm hover:bg-accent-subtle hover:text-heading',
        secondary:
          'bg-border text-heading shadow-sm hover:bg-muted-foreground/25',
        ghost: 'hover:bg-accent-subtle hover:text-heading',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        link: 'h-auto p-0 text-[0.95rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = ComponentProps<typeof KobalteButton> &
  VariantProps<typeof buttonVariants>;

export const Button = (props: ButtonProps): JSX.Element => {
  const [local, rest] = splitProps(props, ['class', 'variant', 'size']);
  return (
    <KobalteButton
      class={cn(
        buttonVariants({ variant: local.variant, size: local.size }),
        local.class,
      )}
      {...rest}
    />
  );
};
