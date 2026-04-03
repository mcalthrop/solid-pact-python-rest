import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/utils';

export type CoverImageProps = ComponentProps<'img'> & {
  /** Classes on the wrapping frame (aspect ratio, radius, max height, etc.). */
  frameClass?: string;
};

export const CoverImage = (props: CoverImageProps): JSX.Element => {
  const [local, rest] = splitProps(props, ['frameClass', 'class', 'alt']);
  return (
    <div class={cn('overflow-hidden bg-border', local.frameClass)}>
      <img
        alt={local.alt ?? ''}
        class={cn('block size-full object-cover', local.class)}
        {...rest}
      />
    </div>
  );
};
