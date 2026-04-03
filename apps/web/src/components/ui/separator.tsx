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
  const isSeparator = local.decorative === false;
  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: role="separator" supports aria-orientation; Biome does not infer conditional role.
    <div
      role={isSeparator ? 'separator' : undefined}
      aria-orientation={
        isSeparator
          ? orientation === 'vertical'
            ? 'vertical'
            : 'horizontal'
          : undefined
      }
      class={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        local.class,
      )}
      {...rest}
    />
  );
};
