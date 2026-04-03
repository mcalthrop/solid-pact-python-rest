import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/utils';

export const Skeleton = (props: ComponentProps<'div'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      class={cn(
        'animate-pulse rounded-md bg-border/80 dark:bg-border/60',
        local.class,
      )}
      {...rest}
    />
  );
};
