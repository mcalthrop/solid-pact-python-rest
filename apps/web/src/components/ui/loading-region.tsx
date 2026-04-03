import type { JSX, ParentProps } from 'solid-js';
import { cn } from '@/lib/utils';

type LoadingRegionProps = ParentProps & {
  /** Announced to assistive technologies (visually hidden). */
  label: string;
  spacing?: 'compact' | 'comfortable';
};

export const LoadingRegion = ({
  label,
  spacing,
  children,
}: LoadingRegionProps): JSX.Element => (
  <div
    role="status"
    aria-live="polite"
    aria-busy={true}
    class={cn(spacing === 'comfortable' ? 'space-y-4' : 'space-y-3')}
  >
    <span class="sr-only">{label}</span>
    {children}
  </div>
);
