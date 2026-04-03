import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading3Panel } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

export type RecipeDetailPanelProps = ComponentProps<'section'> & {
  headingId: string;
  heading: string;
  children: JSX.Element;
};

export const RecipeDetailPanel = (
  props: RecipeDetailPanelProps,
): JSX.Element => {
  const [local, rest] = splitProps(props, [
    'headingId',
    'heading',
    'children',
    'class',
  ]);
  return (
    <section
      aria-labelledby={local.headingId}
      class={cn(local.class)}
      {...rest}
    >
      <Card class="border-border shadow-none">
        <CardHeader class="pb-2">
          <Heading3Panel id={local.headingId}>{local.heading}</Heading3Panel>
        </CardHeader>
        <CardContent class="pt-0">{local.children}</CardContent>
      </Card>
    </section>
  );
};
