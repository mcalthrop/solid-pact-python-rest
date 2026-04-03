import { createClient, createConfig } from './generated/client';
import type { ClientOptions } from './generated/types.gen';

function resolveBaseUrl(): ClientOptions['baseUrl'] {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (fromEnv !== undefined && fromEnv !== '') {
    return fromEnv as ClientOptions['baseUrl'];
  }
  if (import.meta.env.DEV) {
    return 'http://127.0.0.1:8000';
  }
  return '' as ClientOptions['baseUrl'];
}

/** Shared fetch client for generated SDK calls (base URL from `VITE_API_BASE_URL`, or local API in dev). */
export const apiClient = createClient(
  createConfig<ClientOptions>({ baseUrl: resolveBaseUrl() }),
);
