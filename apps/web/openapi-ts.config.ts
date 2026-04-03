import { defineConfig } from '@hey-api/openapi-ts';

/** Full fetch-based SDK from the repo OpenAPI spec. Run `pnpm openapi:generate` from `apps/web`. */
export default defineConfig({
  input: '../../packages/openapi/openapi.yaml',
  output: 'src/api/generated',
});
