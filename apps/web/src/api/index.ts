import { apiClient } from '@/api/client';
import {
  getRecipeById as getRecipeByIdSdk,
  listRecipes as listRecipesSdk,
  type Options,
} from '@/api/generated/sdk.gen';
import type {
  GetRecipeByIdData,
  ListRecipesData,
} from '@/api/generated/types.gen';

export { apiClient } from '@/api/client';

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

export type * from '@/api/generated/types.gen';
