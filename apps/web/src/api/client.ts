import {
  type Client,
  type ClientOptions,
  createClient,
  createConfig,
} from './generated/client';

function resolveBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (fromEnv !== undefined && fromEnv !== '') {
    return fromEnv;
  }
  if (import.meta.env.DEV) {
    return 'http://127.0.0.1:8000';
  }
  return '';
}

/** Shared fetch client for generated SDK calls (base URL from `VITE_API_BASE_URL`, or local API in dev). */
export const apiClient: Client = createClient(
  createConfig<ClientOptions>({ baseUrl: resolveBaseUrl() }),
);
