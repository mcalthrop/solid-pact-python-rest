import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/utils';

// biome-ignore lint/nursery/useExplicitType: explicit CVA output type is verbose and harms inference
export const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-heading [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-foreground',
        destructive:
          'border-accent-border bg-accent-subtle text-primary-hover [&>svg]:text-primary-hover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type AlertProps = ComponentProps<'div'> &
  VariantProps<typeof alertVariants>;

export const Alert = (props: AlertProps): JSX.Element => {
  const [local, rest] = splitProps(props, ['class', 'variant']);
  return (
    <div
      role="alert"
      class={cn(alertVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  );
};

export const AlertTitle = (props: ComponentProps<'h5'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <h5
      class={cn(
        'mb-1 font-heading font-medium leading-none tracking-tight',
        local.class,
      )}
      {...rest}
    />
  );
};

export const AlertDescription = (props: ComponentProps<'div'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      class={cn('text-sm leading-relaxed [&_p]:leading-relaxed', local.class)}
      {...rest}
    />
  );
};
