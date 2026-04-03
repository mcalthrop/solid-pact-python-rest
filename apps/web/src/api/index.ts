import { apiClient } from './client';
import {
  getRecipeById as getRecipeByIdSdk,
  listRecipes as listRecipesSdk,
  type Options,
} from './generated/sdk.gen';
import type { GetRecipeByIdData, ListRecipesData } from './generated/types.gen';

export { apiClient } from './client';

export function listRecipes<ThrowOnError extends boolean = false>(
  options?: Options<ListRecipesData, ThrowOnError>,
) {
  return listRecipesSdk({
    ...options,
    client: options?.client ?? apiClient,
  });
}

export function getRecipeById<ThrowOnError extends boolean = false>(
  options: Options<GetRecipeByIdData, ThrowOnError>,
) {
  return getRecipeByIdSdk({
    ...options,
    client: options?.client ?? apiClient,
  });
}

export type * from './generated/types.gen';
