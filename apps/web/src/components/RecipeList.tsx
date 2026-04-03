import type { JSX, ParentProps } from 'solid-js';

export const RecipeList = (props: ParentProps): JSX.Element => (
  <ul class="m-0 flex list-none flex-col gap-4 p-0">{props.children}</ul>
);
