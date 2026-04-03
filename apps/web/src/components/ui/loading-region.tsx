import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/utils';

export type LoadingRegionProps = ComponentProps<'div'> & {
  /** Announced to assistive technologies (visually hidden). */
  label: string;
  spacing?: 'compact' | 'comfortable';
};

export const LoadingRegion = (props: LoadingRegionProps): JSX.Element => {
  const [local, rest] = splitProps(props, [
    'label',
    'spacing',
    'class',
    'children',
  ]);
  return (
    <div
      {...rest}
      role="status"
      aria-live="polite"
      aria-busy={true}
      class={cn(
        local.spacing === 'comfortable' ? 'space-y-4' : 'space-y-3',
        local.class,
      )}
    >
      <span class="sr-only">{local.label}</span>
      {local.children}
    </div>
  );
};
