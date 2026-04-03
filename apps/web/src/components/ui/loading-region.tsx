import type { JSX, ParentProps } from 'solid-js';
import { cn } from '@/lib/utils';

type LoadingRegionProps = ParentProps & {
  /** Announced to assistive technologies (visually hidden). */
  label: string;
  spacing?: 'compact' | 'comfortable';
};

export const LoadingRegion = (props: LoadingRegionProps): JSX.Element => (
  <div
    role="status"
    aria-live="polite"
    aria-busy={true}
    class={cn(props.spacing === 'comfortable' ? 'space-y-4' : 'space-y-3')}
  >
    <span class="sr-only">{props.label}</span>
    {props.children}
  </div>
);
