import { apiClient } from './client';
import {
  getRecipeById as getRecipeByIdSdk,
  listRecipes as listRecipesSdk,
  type Options,
} from './generated/sdk.gen';
import type { GetRecipeByIdData, ListRecipesData } from './generated/types.gen';

export { apiClient } from './client';

export const listRecipes = <ThrowOnError extends boolean = false>(
  options?: Options<ListRecipesData, ThrowOnError>,
): ReturnType<typeof listRecipesSdk<ThrowOnError>> =>
  listRecipesSdk({
    ...options,
    client: options?.client ?? apiClient,
  });

export const getRecipeById = <ThrowOnError extends boolean = false>(
  options: Options<GetRecipeByIdData, ThrowOnError>,
): ReturnType<typeof getRecipeByIdSdk<ThrowOnError>> =>
  getRecipeByIdSdk({
    ...options,
    client: options?.client ?? apiClient,
  });

export type * from './generated/types.gen';
