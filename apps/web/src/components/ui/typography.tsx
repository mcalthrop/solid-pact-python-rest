import type { ComponentProps, JSX } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import { cn } from '@/lib/utils';

/** Primary site title (header `<h1>`). */
export const SiteTitle = (props: ComponentProps<'h1'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <h1
      class={cn(
        'm-0 font-heading text-[1.35rem] font-semibold leading-tight tracking-tight text-heading sm:text-2xl',
        local.class,
      )}
      {...rest}
    />
  );
};

/** Page / recipe section titles (`<h2>`). */
export const Heading2 = (props: ComponentProps<'h2'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <h2
      class={cn(
        'font-heading text-[1.35rem] font-medium tracking-tight text-heading sm:text-2xl',
        local.class,
      )}
      {...rest}
    />
  );
};

/** Card panel titles — ingredients, steps (`<h3>`). */
export const Heading3Panel = (props: ComponentProps<'h3'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <h3
      class={cn(
        'm-0 font-heading text-lg font-semibold leading-none tracking-tight text-heading',
        local.class,
      )}
      {...rest}
    />
  );
};

/** Recipe card title (`<h3>`) — accent colour; pair with a `group` ancestor for hover. */
export const RecipeCardTitle = (props: ComponentProps<'h3'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <h3
      class={cn(
        'm-0 font-heading text-[1.05rem] font-medium tracking-tight text-primary group-hover:text-primary-hover',
        local.class,
      )}
      {...rest}
    />
  );
};

export const TextLede = (props: ComponentProps<'p'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <p class={cn('leading-relaxed text-foreground', local.class)} {...rest} />
  );
};

export const TextMuted = (props: ComponentProps<'p'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return <p class={cn('m-0 text-muted-foreground', local.class)} {...rest} />;
};

export const TextMutedSmall = (props: ComponentProps<'p'>): JSX.Element => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <p
      class={cn(
        'mt-1.5 mb-0 text-sm leading-snug text-muted-foreground',
        local.class,
      )}
      {...rest}
    />
  );
};

type RecipeTimesProps = {
  prepTimeMinutes?: number;
  bakeTimeMinutes?: number;
};

export const RecipeTimes = (props: RecipeTimesProps): JSX.Element => (
  <Show
    when={
      props.prepTimeMinutes !== undefined || props.bakeTimeMinutes !== undefined
    }
  >
    <p class="m-0 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
      <Show when={props.prepTimeMinutes !== undefined}>
        <span class="m-0">Prep: {props.prepTimeMinutes} min</span>
      </Show>
      <Show when={props.bakeTimeMinutes !== undefined}>
        <span class="m-0">Bake: {props.bakeTimeMinutes} min</span>
      </Show>
    </p>
  </Show>
);
