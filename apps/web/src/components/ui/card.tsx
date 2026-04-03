import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/utils';

export const Card = (props: ComponentProps<'div'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      class={cn(
        'rounded-xl border border-border bg-card text-foreground shadow-bread',
        local.class,
      )}
      {...rest}
    />
  );
};

export const CardHeader = (props: ComponentProps<'div'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return <div class={cn('flex flex-col gap-1.5 p-6', local.class)} {...rest} />;
};

export const CardTitle = (props: ComponentProps<'div'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      class={cn(
        'font-heading font-semibold leading-none tracking-tight text-heading',
        local.class,
      )}
      {...rest}
    />
  );
};

export const CardDescription = (props: ComponentProps<'div'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div class={cn('text-sm text-muted-foreground', local.class)} {...rest} />
  );
};

export const CardContent = (props: ComponentProps<'div'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return <div class={cn('p-6 pt-0', local.class)} {...rest} />;
};

export const CardFooter = (props: ComponentProps<'div'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div class={cn('flex items-center p-6 pt-0', local.class)} {...rest} />
  );
};
