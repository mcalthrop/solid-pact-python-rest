import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/utils';

export type SeparatorProps = ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
};

export const Separator = (props: SeparatorProps): JSX.Element => {
  const [local, rest] = splitProps(props, [
    'class',
    'orientation',
    'decorative',
  ]);
  const orientation = local.orientation ?? 'horizontal';
  return (
    <div
      role={local.decorative === false ? 'separator' : undefined}
      class={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        local.class,
      )}
      {...rest}
    />
  );
};
