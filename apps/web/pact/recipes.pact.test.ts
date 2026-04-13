/**
 * @vitest-environment node
 */
import path from 'node:path';
import { Pact, SpecificationVersion } from '@pact-foundation/pact';
import { describe, expect, it } from 'vitest';
import {
  getRecipeById,
  listRecipes,
  type RecipeDetail,
  type RecipeSummary,
} from '@/api';
import {
  type Client,
  createClient,
  createConfig,
} from '@/api/generated/client';

const consumerName = 'Bread Recipes Web';
const providerName = 'Bread Recipes API';

const recipeSummaries: RecipeSummary[] = [
  {
    id: 'country-loaf',
    title: 'Simple country loaf',
    summary:
      'A reliable white loaf with a thin crust—good for sandwiches or toast.',
    imageUrl: 'https://picsum.photos/seed/country-loaf-thumb/400/300',
  },
  {
    id: 'seeded-sourdough',
    title: 'Seeded sourdough',
    summary: 'Tangy sourdough with sunflower and sesame for extra crunch.',
    imageUrl: 'https://picsum.photos/seed/seeded-sourdough-thumb/400/300',
  },
];

const recipeDetail: RecipeDetail = {
  id: 'country-loaf',
  title: 'Simple country loaf',
  summary:
    'A reliable white loaf with a thin crust—good for sandwiches or toast.',
  imageUrl: 'https://picsum.photos/seed/country-loaf-thumb/400/300',
  imageUrlLarge: 'https://picsum.photos/seed/country-loaf-large/1200/800',
  ingredients: [
    '500 g strong white bread flour',
    '10 g fine sea salt',
    '7 g dried yeast',
    '350 ml cool water',
  ],
  steps: [
    'Mix flour, salt, and yeast, then add water and bring together into a rough dough.',
    'Knead until smooth and elastic, then first rise until doubled.',
    'Shape, proof in a tin or banneton, then bake until deep golden.',
    'Cool fully on a rack before slicing.',
  ],
  prepTimeMinutes: 30,
  bakeTimeMinutes: 35,
};

const createPactClient = (baseUrl: string): Client =>
  createClient(createConfig({ baseUrl }));

const pact: Pact = new Pact({
  consumer: consumerName,
  provider: providerName,
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
});

describe('recipes consumer pact', () => {
  it('captures the home page recipe list interaction', async () => {
    await pact
      .addInteraction()
      .uponReceiving(
        'a request for the recipe summaries shown on the home page',
      )
      .withRequest('GET', '/recipes')
      .willRespondWith(200, (builder) => {
        builder.headers({ 'Content-Type': 'application/json' });
        builder.jsonBody(recipeSummaries);
      })
      .executeTest(async (mockserver) => {
        const recipes = await listRecipes({
          client: createPactClient(mockserver.url),
          responseStyle: 'data',
          throwOnError: true,
        });
        expect(recipes).toEqual(recipeSummaries);
      });
  });

  it('captures the recipe detail interaction', async () => {
    await pact
      .addInteraction()
      .uponReceiving('a request for a recipe detail page')
      .withRequest('GET', '/recipes/country-loaf')
      .willRespondWith(200, (builder) => {
        builder.headers({ 'Content-Type': 'application/json' });
        builder.jsonBody(recipeDetail);
      })
      .executeTest(async (mockserver) => {
        const detail = await getRecipeById({
          client: createPactClient(mockserver.url),
          path: { recipe_id: 'country-loaf' },
          responseStyle: 'data',
          throwOnError: true,
        });
        expect(detail).toEqual(recipeDetail);
      });
  });
});
